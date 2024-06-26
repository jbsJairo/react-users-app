import { UserRow } from "./UserRow"

export const UsersList = ({ users, handlerRemoveUser, handlerUserSelectedForm }) => {
    
    return(
        <>
            <table className="table table-over table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>username</th>
                        <th>email</th>
                        <th>update</th>
                        <th>update route</th>
                        <th>remove</th>
                    </tr>
                </thead>
                <tbody>
                    {  users.map( ({ id, username, email }) => (
                       <UserRow  
                            key={ id } 
                            id={ id }
                            username={ username }
                            email={ email }
                            handlerRemoveUser={ handlerRemoveUser }
                            handlerUserSelectedForm= { handlerUserSelectedForm }/>
                    ) ) }
                </tbody>
            </table>
        </>
    )
}