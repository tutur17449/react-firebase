import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'

toast.configure()

const Register = () => {

    const { register, authentification } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const  [formValue, setFormValue]  = useState({
        email: '',
        password: ''
    })

    const onHandleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        register(formValue.email, formValue.password)
        .catch(error => {
            toast.error(error.message)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    if(authentification.isLogin){
        return <Redirect to='/' />
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    value={formValue.email}
                    onChange={onHandleChange}
                    placeholder="Email"
                ></input>
                <input
                    name="password"
                    value={formValue.password}
                    onChange={onHandleChange}
                    placeholder="Password"
                ></input>
                <button
                    disabled={isLoading}
                >Register</button>
            </form>
        </div>
    )
}

export default Register