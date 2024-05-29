import { LoginPage } from "./auth/pages/LoginPage"
import { useLogin } from "./auth/hooks/useLogin"
import { Navigate, Route, Routes } from "react-router-dom"
import { UserRoutes } from "./routes/UserRoutes"

export const UsersApp = () => {

    const {
        login,
        handlerLogin,
        handlerLogout,
    } = useLogin();

    return(
        <Routes>
        { 
            login.isAuth
                ? (
                    <Route  path="/*" 
                            element={ <UserRoutes login={ login } handlerLogout={ handlerLogout }/> }/>
                )                
                : <>
                    <Route  path='/login' 
                            element={ <LoginPage handlerLogin={ handlerLogin }/> }/>
                    
                    <Route  path='/*'     
                            element={ <Navigate to='/login'/> } />                
                  </>
        }
        </Routes>
    )
}