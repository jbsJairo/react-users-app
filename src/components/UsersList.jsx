import { UserRow } from "./UserRow"

export const UsersList = ({ users, handlerRemoveUser, handlerUserSelectedForm }) => {
    
    return(
        <>
            <p>Listado de de usuarios</p>
            <table className="table table-over table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>username</th>
                        <th>email</th>
                        <th>update</th>
                        <th>remove</th>
                    </tr>
                </thead>
                <tbody>
                    {  users.map( ({ id, username, email, password }) => (
                       <UserRow  
                            key={ id } 
                            id={ id }
                            username={ username }
                            email={ email } 
                            password={ password }
                            handlerRemoveUser={ handlerRemoveUser }
                            handlerUserSelectedForm= { handlerUserSelectedForm }/>
                    ) ) }
                </tbody>
            </table>
        </>
    )
}