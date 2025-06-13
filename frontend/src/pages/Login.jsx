import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import { AuthContext } from '../auth/AuthProvider'
export default function Login() {
    const { user } = useContext(AuthContext)

    let navigate = useNavigate()

    const returnToHome = (event) => {
        event.preventDefault()
        navigate("/")
    }
    // If user is logged in, show "You are already logged in"
    if(user) {
        return (
            <div>You are already logged in.</div>
        )
    }
    return (
        <div>
            <div>Login</div>
            <NavLink to="/">Go back</NavLink>
            <Link to="/register">Register</Link>
            <button onClick={returnToHome}>Button Click</button>
            <button onClick={
                (event) => {
                    returnToHome(event)
                }
            }>Button Click Callback</button>
            
            
            <div>
                <LoginForm/>
            </div>
        </div>
    )
}
