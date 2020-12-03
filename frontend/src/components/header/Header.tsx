import React, { useEffect, useState } from 'react';
import './HeaderStyle.css';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { userSignout } from '../../actions/userActions';

const Header: React.FC = () => {

    const { loading, user, error } = useSelector((state: RootStore) => state.userSignin)

    const dispatch = useDispatch()

    const signout = () => {
        dispatch(userSignout())
        document.location.href = '/signin'
    }

    // open sidebar 
    const openMenu = () => {
        document.querySelector(".sidebar")?.classList.add("open")
    }

    //close sidebar 
    const closeMenu = () => {
        document.querySelector(".sidebar")?.classList.remove("open")
    }


    // hide navbar on scroll
    useEffect(() => {
        let prevScrollpos = window.pageYOffset;

        window.addEventListener('scroll', () => {
            let currentScrollPos = window.pageYOffset;
            let header: any = document.querySelector(".header");
            if (prevScrollpos > currentScrollPos) {
                header.style.top = "0";
            } else {
                header.style.top = "-4rem";
            }
            prevScrollpos = currentScrollPos;
        })

    }, [])


    return (
        <div className="header">

            <div className="logo">
                <i onClick={openMenu} className="fas fa-bars"></i>
                <Link to="/" className="brand"><h3 >CARBON</h3></Link>
            </div>

            <div className="header-links">
                <Link to="/cart"><i className="fas fa-shopping-cart"></i>Cart</Link>
                {
                    loading || !user?.name ?
                        <Link to="/signin">Sign In</Link> : (
                            <div className="navigation-dropdown">
                                <button className="navigation-button">{user.name}</button>
                                <ul>
                                    <li><Link to="/profile">My Profile</Link></li>
                                    <li><button onClick={signout} className="signout-button">Sign out</button></li>
                                </ul>
                            </div>

                        )


                }
            </div>

            <aside className="sidebar">
                <h3 id="Shopping-Categories">Shopping Categories</h3>
                <button className="sidebar-close-button" onClick={closeMenu}><i className="fas fa-times"></i></button>
                <ul className="shopping-category-list">
                    <li>
                        <Link to='/shop/pants'>Pants</Link>
                    </li>
                    <li>
                        <Link to='/shop/shirts'>Shirts</Link>
                    </li>
                    <li>
                        <Link to='/shop/shoes'>Shoes</Link>
                    </li>
                    <li>
                        <Link to='/shop/jackets'>Jackets</Link>
                    </li>
                </ul>
            </aside>

        </div>
    )

}

export default Header;