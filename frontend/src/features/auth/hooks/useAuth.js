import {useContext} from "react"
import {AuthContext} from "../auth.context"
import {login, register, logout, getMe} from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({email, password})=>{
        setLoading(true);
        try {
            const userData = await login({email, password});
            setUser(userData);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({username, email, password})=>{
        setLoading(true);
        try {
            const userData = await register({username, email, password});
            setUser(userData);
        } catch (error) {
            console.error("Register failed:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async ()=>{
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    }

    

    return { user, handleLogin, handleRegister, handleLogout, loading };
};