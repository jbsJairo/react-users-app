import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

export const UserForm = ({ userSelected, handlerCloseForm }) =>{

    const { initialUserForm, handlerAddUser } = useContext(UserContext);

    const [ userForm, setUserForm ] = useState(initialUserForm);

    const { id, username, password, email } = userForm;


    useEffect(() => {
        setUserForm({ 
            ...userSelected,
            password: '',
        });
    }, [ userSelected ])


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value,
        }) 
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if( !username || (!password && id === 0 ) || !email ){
            Swal.fire({
                title: "Error de validacion",
                text: "Debe completar los campos del formulario!",
                icon: "error"
              });
            return;
        }

        if(!email.includes('@')){
            Swal.fire({
                title: "Error de validacion email",
                text: "El email debe ser valido, incluir un @!",
                icon: "error"
              });
              return;
        }

        handlerAddUser(userForm);
        setUserForm(initialUserForm);
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm)
    }

    return(
        <>
            <form onSubmit={ onSubmit }>
                <input
                    className="form-control my-3 w-75"
                    placeholder="Username"
                    name="username"
                    value={ username }
                    onChange={ onInputChange }/>
                    { id > 0 || <input
                                    className="form-control my-3 w-75"
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    value={ password }
                                    onChange={ onInputChange }/>
                    }
                
                <input
                    className="form-control my-3 w-75"
                    placeholder="Email"
                    name="email"
                    value={ email }
                    onChange={ onInputChange }/> 
                <input 
                    type="hidden"
                    name="id"
                    value={ id } />
                <button 
                    type="submit"
                    className="btn btn-primary"
                    >
                    { id > 0? 'Editar':'Crear' }
                </button> 

                { !handlerCloseForm || 

                    <button 
                        className="btn btn-primary mx-2"
                        type="button"
                        onClick={ () => onCloseForm() }>
                            Cerrar
                    </button>    
                }
            </form>
        </>
    )

}