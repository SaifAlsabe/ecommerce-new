import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { userSignup } from '../../actions/userActions';
import { RootStore } from '../../store';
import './SignupScreenStyle.css'

const SignupScreen: React.FC<RouteComponentProps> = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [repasswordError, setRepasswordError] = useState("")
    const userSignupState = useSelector((state: RootStore) => state.userSignup)
    const userSigninState = useSelector((state: RootStore) => state.userSignin)

    // redirect to home if user is logged in 
    useEffect(() => {
        if (!userSigninState.loading && userSigninState.user?.name) {
            props.history.push('/')
        }
    }, [userSigninState.user])

    const dispatch = useDispatch();

    //user signup request
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        //reset error
        setRepasswordError("")

        e.preventDefault();
        if (password === rePassword) {
            dispatch(userSignup({ name, email, password }))
        } else {
            setRepasswordError("Passwords do Not match.")
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={submitHandler} className="signin-form">
                <ul className="form-list">

                    <li>
                        <h2>Create Account</h2>
                    </li>

                    <li>
                        <input required autoComplete="off" placeholder="Username" type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                        <div className="error">{userSignupState.error && userSignupState.error.name}</div>
                    </li>

                    <li>
                        <input required autoComplete="off" placeholder="Email" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                        <div className="error">{userSignupState.error && userSignupState.error.email}</div>
                    </li>

                    <li>
                        <input required placeholder="Password" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                        <div className="error">{userSignupState.error && userSignupState.error.password}</div>
                    </li>

                    <li>
                        <input required placeholder="Confirm Password" type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)}></input>
                        <div className="error">{repasswordError}</div>
                    </li>

                    <li>
                        <button type="submit" className="button">
                            <b>Create Account</b>
                        </button>
                    </li>

                    <li className="create-account">
                        <p>Already have an account?</p>
                        <Link to="/signin">Signin</Link>
                    </li>


                </ul>
            </form>

        </div>
    )
}

export default SignupScreen;