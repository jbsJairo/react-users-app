import { useReducer, useState } from "react"
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";


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

export const useUsers = () => {

    const [ users, dispatch ] = useReducer(usersReducer, initialUsers);
    const [ userSelected, setUserSelected ] = useState(initialUserForm);

    const handlerAddUser = (user) => {
        let type;

        if(user.id === 0){
            type = 'addUser';
        }else{
            type = 'updateUser';
        }

        dispatch({
            type,
            payload: user,
        })

        Swal.fire(
            (user.id === 0)? 'Usuario Creado' : 'Usuario Actualizado',
            (user.id === 0)? 'El usuario ha sido creado con exito!' : 'El usuario ha sido actualizado con exito!',
            'success',
        )
    }

    const handlerRemoveUser = (id) => {
        Swal.fire({
            title: "Esta seguro que desea eliminar?",
            text: "Cuidado el usuario sera eliminado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: 'removeUser',
                    payload: id,
                });
        
              Swal.fire({
                title: "Usuario Eliminado!",
                text: "El usuario ha sido eliminado con exito!",
                icon: "success"
              });
            }
          });
    }

    const handlerUserSelectedForm = (user) =>{
        setUserSelected({ ...user });
    }

    return{
        users,
        userSelected,
        initialUserForm,

        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
    }
}