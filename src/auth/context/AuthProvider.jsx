import { useLogin } from "../hooks/useLogin";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) =>{


    const {
        login,
        handlerLogin,
        handlerLogout,
    } = useLogin();

    return(
        <AuthContext.Provider value={
            {
                login,
                handlerLogin,
                handlerLogout,
            }
        }>
            { children }
        </AuthContext.Provider>
    );
}