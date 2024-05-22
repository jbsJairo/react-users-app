import { LoginPage } from "./auth/pages/LoginPage"
import { UsersPage } from "./pages/UsersPage"
import { Navbar } from "./components/layout/Navbar"
import { useLogin } from "./auth/hooks/useLogin"

export const UsersApp = () => {

    const {
        login,
        handlerLogin,
        handlerLogout,
    } = useLogin();

    return(
        <>
        { 
            login.isAuth
                ? (
                    <>
                        <Navbar login={ login } handlerLogout={ handlerLogout }/>
                        <UsersPage />
                    </>
                )                
                : <LoginPage handlerLogin={ handlerLogin }/>
        }
        </>
    )
}