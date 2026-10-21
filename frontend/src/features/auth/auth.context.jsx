import {createContext, useEffect, useState} from "react";
import {getMe} from "./services/auth.api"
export const AuthContext = createContext({});

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        let isMounted = true

        const getAndSetUser = async()=>{
            try {
                const data = await getMe()
                if (isMounted) {
                    setUser(data.user)
                }
            } catch (error) {
                if (isMounted) {
                    setUser(null)
                    if (error.response?.status !== 401) {
                        console.error("Failed to restore authenticated user:", error)
                    }
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        getAndSetUser()

        return () => {
            isMounted = false
        }
    }, [])
    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
