import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { userSignin } from '../../actions/userActions';
import { RootStore } from '../../store';
import './SigninScreenStyle.css';


const SigninScreen: React.FC<RouteComponentProps> = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading, user, error } = useSelector((state: RootStore) => state.userSignin)


    // redirect to home if user is logged in 
    useEffect(() => {
        if (!loading && user?.name) {
            props.history.push('/')
        }
    }, [user])


    const dispatch = useDispatch();

    // user signin request
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userSignin({ email, password }))
    }

    return (
        <div className="signin">

            <div className="welcome">
                <h1 className="signin-welcome-big">Carbon</h1>
                <p className="signin-welcome-small">Shopping from the comfort of your home.</p>
            </div>

            <div className="form-container">
                <form onSubmit={submitHandler} className="signin-form">
                    <ul className="form-list">

                        <li>
                            <h2>Sign-In</h2>
                        </li>

                        <li>
                            <input required placeholder="Email" type="email" name="email" id="email" autoComplete="off" onChange={(e) => setEmail(e.target.value)}></input>
                            <div className="error">{error && error.email}</div>
                        </li>

                        <li>
                            <input required placeholder="Password" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                            <div className="error">{error && error.password}</div>
                        </li>

                        <li>
                            <button type="submit" className="button">
                                <b>Signin</b>
                            </button>
                        </li>

                        <li className="create-account">
                            <p>New to CARBON?</p>
                            <Link to="/signup">Create Account</Link>
                        </li>


                    </ul>
                </form>

            </div>

        </div>

    )
}

export default SigninScreen;