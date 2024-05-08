import { useEffect, useState } from "react";

export const UserForm = ({ handlerAddUser, initialUserForm, userSelected }) =>{


    const [ userForm, setUserForm ] = useState(initialUserForm);

    const { id, username, password, email } = userForm;


    useEffect(() => {
        setUserForm({ 
            ...userSelected,
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
        if( !username || !password || !email ){
            alert('Debe completar los campos del formulario!');
            return;
        }
        handlerAddUser(userForm);
        setUserForm(initialUserForm);
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
                <input
                    className="form-control my-3 w-75"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={ password }
                    onChange={ onInputChange }/>
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
                    Crear
                </button>     
            </form>
        </>
    )

}