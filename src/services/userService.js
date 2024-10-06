import axios from "axios"

const BASE_URL = 'http://localhost:8090/v1/security/user'

export const apiUsers = async () => {
    try{
        const response = await axios.get(BASE_URL);
        return response;
    }catch( error ) {
        console.log(error)
    }
    return null;
}

export const apiCreateUser = async ({ username, password, email }) => {
    try{
        const response = await axios.post(BASE_URL, 
            {
                username,
                password,
                email,
            });
        return response;
    }catch( error ) {
        console.log(error)
    }
    return undefined;
}

export const apiUpdateUser = async ({ id, username, email }) => {
    try{
        const response = await axios.put(`${BASE_URL}/${id}`, 
            {
                username,
                email,
            });
        return response;
    }catch( error ) {
        console.log(error)
    }
    return undefined;
}

export const apiDeleteUser = async ( id ) => {
    try{
        await axios.delete(`${BASE_URL}/${id}`);
    }catch( error ) {
        console.log(error)
    }
}