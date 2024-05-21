import { useReducer } from "react"
import { LoginPage } from "./auth/pages/LoginPage"
import { loginReducer } from "./auth/reducers/loginReducer"
import Swal from "sweetalert2"
import { UsersPage } from "./pages/UsersPage"


const initialLogin = {
    isAuth: false,
    user: undefined,
}

export const UsersApp = () => {

    const [ login, dispach ] = useReducer(loginReducer, initialLogin);

    const handlerLogin = ( { username, password } ) => {
        if(username === 'admin' && password === '12345'){
            const user = { username: 'admin' };
            dispach({
                type: 'login',
                payload: user,
            });
        }else{
            Swal.fire('Error Login', 'Username o password invalidos', 'error');
        }
    }

    return(
        <>
        { 
            login.isAuth
                ? <UsersPage />
                : <LoginPage handlerLogin={ handlerLogin }/>
        }
        </>
    )
}