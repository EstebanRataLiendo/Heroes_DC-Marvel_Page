import { useReducer } from "react"
import { AuthContext, authReducer } from "./"
import { types } from "../types/types"


const initialState = {
    logged: false,
}

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return{
        logged: !!user,
        user:user 
    }
}

export const AuthProvider = ({children}) => {

    const [authState, dispatch] = useReducer(authReducer, {/*initialState*/}, init)

    const login = async(name = '') => {

        const user = {id: 'ABC', name}

        const action ={type: types.login, payload: user}

        localStorage.setItem('user', JSON.stringify(user))

        dispatch(action)
    }

    const logout = () => {
        localStorage.removeItem('user')

        const action = {type: types.logout}
    }

    return (
    <AuthContext.Provider value={{
        ...authState,

        //Metodos
        login: login,
        logout:logout
    }}>
        {children}
    </AuthContext.Provider>
  )
}
