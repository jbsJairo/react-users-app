import { useReducer, useState } from "react"
import { UserForm } from "./components/UserForm"
import { UsersList } from "./components/UsersList"
import { usersReducer } from "./reducers/usersReducer"

const initialUsers = [
    {
        id:1,
        username: 'jairo',
        password: '12345',
        email: 'jbsegura1990@gmail.com'
    }
]
const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
}

export const UsersApp = () => {

    const [ users, dispatch ] = useReducer(usersReducer, initialUsers);
    const [ userSelected, setUserSelected ] = useState(initialUserForm);

    const handlerAddUser = (user) => {
        dispatch({
            type: 'addUser',
            payload: user,
        })
    }

    const handlerRemoveUser = (id) => {
        dispatch({
            type: 'removeUser',
            payload: id,
        })
    }

    const handlerUserSelectedForm = (user) =>{
        setUserSelected({ ...user });
    }

    return(
        <>
        <div className="container my-4">
            <h2>User App </h2>
            <div className="row">
                <div className="col">
                    <UserForm
                        initialUserForm={ initialUserForm }
                        userSelected={ userSelected }
                        handlerAddUser={ handlerAddUser }/>
                </div>
                <div className="col">
                    { users.length === 0
                        ?<div className="alert alert-warning">No hay usuarios en el sistema!</div> 
                        : <UsersList 
                        users={ users }
                        handlerRemoveUser={ handlerRemoveUser }
                        handlerUserSelectedForm={ handlerUserSelectedForm }/>
                    }                   
                </div>
            </div>
        </div>
        </>
    )

}