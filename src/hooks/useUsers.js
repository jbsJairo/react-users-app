import { useReducer, useState } from "react"
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { apiCreateUser, apiDeleteUser, apiUpdateUser, apiUsers } from "../services/userService";



const initialUsers = []

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
}

export const useUsers = () => {

    const [ users, dispatch ] = useReducer(usersReducer, initialUsers);
    const [ userSelected, setUserSelected ] = useState(initialUserForm);
    const [ visibleForm, setVisibleForm ] = useState(false);
    const navigate = useNavigate();
    
    const getUsers = async() => {
        const result = await apiUsers();
        dispatch({
            type: 'loadingUsers',
            payload: result.data,
        });
    }

    const handlerAddUser = async (user) => {

        let response;

        if( user.id === 0 ){
            response = await apiCreateUser(user);
        }else{
            response = await apiUpdateUser(user)
        }

        dispatch({
            type: (user.id === 0)? 'addUser': 'updateUser',
            payload: response.data,
        })

        Swal.fire(
            (user.id === 0)? 
                'Usuario Creado' : 
                'Usuario Actualizado',
            (user.id === 0)? 
                'El usuario ha sido creado con exito!' : 
                'El usuario ha sido actualizado con exito!',
            'success',
        );

        handlerCloseForm();
        navigate('/users');
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

                apiDeleteUser(id);
                
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
        setVisibleForm(true);
    }

    const handlerOpenForm = () => {
        setVisibleForm(true);
    }

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setUserSelected(initialUserForm);
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,
    }
}