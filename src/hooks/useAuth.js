import { useState, useEffect, useContext, createContext } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from '../lib/firebase'
import firestore from '../lib/firestore'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

    const history = useHistory()
    const [authentification, setAuthentification] = useState({
        isLogin: false,
        user: {}
    })

    const register = (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                history.push('/login')
            })
    }

    const login = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log(response)
                setAuthentification({
                    isLogin: true,
                    user: response.user
                })
            })
    }

    const logout = () => {
        return firebase.auth().signOut()
            .then(() => {
                setAuthentification({
                    isLogin: false,
                    user: {}
                })
                history.push('/')
            })
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                setAuthentification({
                    isLogin: true,
                    user: user
                })
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{ 
            authentification, 
            register, 
            login,
            logout
        }} >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

export default useAuth