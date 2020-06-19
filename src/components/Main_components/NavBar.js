import React, { Component } from 'react'
import '../CSS/navbar.css'

export default class NavBar extends Component {
    render() {
        return (

            <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link active" href="/home">Home <span className="sr-only">(current)</span></a>
                        <a className="nav-item nav-link" href="/product">Products</a>
                        <a className="nav-item nav-link" href="/">Category</a>

                        <a className="nav-item nav-link log"  href="/login">Login</a>
                        <a className="nav-item nav-link "  href="/register">Register</a>
                        <a className="nav-item nav-link "  href="/profile">Profile</a>

                    </div>
                </div>
            </nav>


        )
    }
}