import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsername, updateEmail, updateAddress, getAddress, updatePassword, userSignin } from '../../actions/userActions';
import { RootStore } from '../../store';
import cookie from 'js-cookie'
import './ProfileScreenStyle.css';

const ProfileScreen: React.FC = () => {

    const { address, error: addressError } = useSelector((state: RootStore) => state.address)
    const { user, error } = useSelector((state: RootStore) => state.userSignin)

    // Password
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    // Username
    const [usernamePassword, setUsernamePassword] = useState("")
    const [userName, setUserName] = useState(user ? user.name : "")

    // Email
    const [emailPassword, setEmailPassword] = useState("")
    const [email, setEmail] = useState(user ? user.email : "")

    // Address
    const [addressPassword, setAddressPassword] = useState("")
    const [street, setStreet] = useState(address ? address.street : "")
    const [city, setCity] = useState(address ? address.city : "")
    const [state, setState] = useState(address ? address.state : "")
    const [zipcode, setZipcode] = useState(address ? address.zipcode : "")
    const [country, setCountry] = useState(address ? address.country : "")

    const dispatch = useDispatch()

    // Username
    const changeUsername = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(updateUsername(userName, usernamePassword))
        setUsernamePassword("")
    }
    // Email
    const changeEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(updateEmail(email, emailPassword))
        setEmailPassword("")
    }

    // Password
    const changePassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(updatePassword(newPassword, password))
        setNewPassword("")
        setPassword("")
    }

    // Address
    const changeAddess = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(updateAddress(street, city, state, zipcode, country, addressPassword))
        setAddressPassword("")
    }

    useEffect(() => {
        dispatch(getAddress())
    }, [])

    useEffect(() => {
        if (address) {
            setStreet(address.street)
            setCity(address.city)
            setState(address.state)
            setZipcode(address.zipcode)
            setCountry(address.country)
        }
    }, [address])

    //flah messages
    const [usernameStatus, setUsernameStatus] = useState<any>("")
    const [emailStatus, setEmailStatus] = useState<any>("")
    const [passwordStatus, setPasswordStatus] = useState<any>("")
    const [addressStatus, setAddressStatus] = useState<any>("")
    useEffect(() => {
        setUsernameStatus(cookie.get('updated_username'))
        setEmailStatus(cookie.get('updated_email'))
        setPasswordStatus(cookie.get('updated_password'))
        setAddressStatus(cookie.get('updated_address'))
        setTimeout(() => {
            setUsernameStatus("")
            setEmailStatus("")
            setPasswordStatus("")
            setAddressStatus("")
        }, 5000)
    }, [cookie.get('updated_username'), cookie.get('updated_email'), cookie.get('updated_password'), cookie.get('updated_address')])


    return (
        <div className="profile">

            <div className="change">
                <form onSubmit={changeUsername} className="change-form">
                    <ul className="change-list">
                        <h2>Username</h2>
                        <li>
                            <input required maxLength={10} placeholder="Username" type="text" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                        </li>
                        <li>
                            <input required type="password" placeholder="Password" value={usernamePassword} onChange={(e) => setUsernamePassword(e.target.value)}></input>
                        </li>
                        <li>
                            <div>{usernameStatus}</div>
                            <div className="error">{error ? error.updateUsername : ""}</div>
                        </li>
                        <button className="button" type="submit">Update</button>
                    </ul>
                </form>
            </div>

            <div className="change">
                <form onSubmit={changeEmail} className="change-form">
                    <ul className="change-list">
                        <h2>Email</h2>
                        <li>
                            <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        </li>
                        <li>
                            <input required type="password" placeholder="Password" value={emailPassword} onChange={(e) => setEmailPassword(e.target.value)}></input>
                        </li>
                        <li>
                            <div>{emailStatus}</div>
                            <div className="error">{error ? error.updateEmail : ""}</div>
                        </li>
                        <button className="button" type="submit">Update</button>
                    </ul>
                </form>
            </div>

            <div className="change">
                <form onSubmit={changePassword} className="change-form">
                    <ul className="change-list">
                        <h2>Password</h2>
                        <li>
                            <input required type="password" placeholder="Old Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        </li>
                        <li>
                            <input required type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                        </li>
                        <li>
                            <div>{passwordStatus}</div>
                            <div className="error">{error ? error.updatePassword : ""}</div>
                        </li>
                        <button className="button" type="submit">Update</button>
                    </ul>
                </form>
            </div>

            <div className="change">
                <form onSubmit={changeAddess} className="change-form">
                    <ul className="change-list">
                        <h2>Address</h2>
                        <li>
                            <input required placeholder="Street" type="text" value={street} onChange={(e) => setStreet(e.target.value)}></input>
                        </li>
                        <li>
                            <input required placeholder="City" type="text" value={city} onChange={(e) => setCity(e.target.value)}></input>
                        </li>
                        <li>
                            <input required placeholder="State" type="text" value={state} onChange={(e) => setState(e.target.value)}></input>
                        </li>
                        <li>
                            <input required placeholder="Zipcode" type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)}></input>
                        </li>
                        <li>
                            <input required placeholder="Country" type="text" value={country} onChange={(e) => setCountry(e.target.value)}></input>
                        </li>
                        <li>
                            <input required placeholder="Password" type="password" value={addressPassword} onChange={(e) => setAddressPassword(e.target.value)}></input>
                        </li>
                        <li>
                            <div>{addressStatus}</div>
                            <div className="error">{addressError ? addressError.updateAddress : ""}</div>
                        </li>
                        <button className="button" type="submit">Update</button>
                    </ul>
                </form>
            </div>

        </div>
    )
}

export default ProfileScreen
