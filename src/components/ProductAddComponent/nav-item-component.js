import React, {Component} from 'react';
// import {Link} from "react-router-dom";
import logo from "../Images/shenosa-white.png";
// import advertisement from "../Images/advertisement.png";
import axios from "axios";
import * as configs from "../../Config/config";
import roundTo from "round-to";

export default class ItemNav extends Component{

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            totalPrice : 0,
            noOfItem : 0,
            cartList : [],
            user_email:'',
            user:[],
        };

    }

    componentDidMount() {

        let userID = localStorage.getItem('user_id');
        console.log(userID);
        if(userID != null || userID != ''){
            axios.get(configs.BASE_URL + '/cart/' + userID)
                .then(response => {
                    this.setState({
                        cartList: response.data
                    },() => {

                       // console.log("inside then :")
                        // console.log(response.data);
                        let temcartList = response.data;
                        let temTotal = 0;
                        let temCount = response.data.length
                        temcartList.map((data,index)=> {
                            temTotal = roundTo(Number(temTotal + (data.discounted_price * data.requested_qty)),2);
                        })

                        this.setState({
                            totalPrice : temTotal,
                            noOfItem : temCount
                        })
                    })
                });

        }

    }
    onSubmit(e) {
        e.preventDefault();

        this.setState({
            user_email: localStorage.getItem('user_email'),
        });

        const user = {
            user_email: this.state.user_email,
        };

        axios.post('http://localhost:5000/userAccounts/logout/' + localStorage.getItem('user_email'), user)
            .then(response => {
                this.setState({
                    user: response.data
                });
                window.location = '/login';
                localStorage.clear();
            }).catch(function (error) {
            console.log(error);
            alert("Logout fail");
        });
    }
    // var loginButton;
    // if (loggedIn) {
    //     loginButton =  <a href="/login" className="btn btn-link text-color-default font-weight-bold order-3 d-none d-sm-block ml-auto mr-2 pt-1 text-1">Login</a>;
    // } else {
    //     loginButton =  <a href="#" className="btn btn-link text-color-default font-weight-bold order-3 d-none d-sm-block ml-auto mr-2 pt-1 text-1">Logout</a>;
    // }

    render(){
        return(
            // <div style={{backgroundColor:"#ececec"}}>
            //     <div className="navbar navbar-expand-sm align-items-center justify-content-center">
            //     <div className="collpase nav-collapse">
            //         <ul className="navbar-nav mr-sm-5 p-0">
            //             <li>
            //                 <Link style={{color:"#f26f36"}} to ="/" className="nav-link">SAVE MORE ON APP</Link>
            //             </li>
            //             <li>
            //                 <Link style={{color:"#f26f36"}} to ="/edit/:id" className="nav-link"> CORPORATE & BULK PURCHASING</Link>
            //             </li>
            //             <li>
            //                 <Link style={{color:"#f26f36"}}  to ="/add" className="nav-link">SELL ON DARAZ</Link>
            //             </li>
            //             <li>
            //                 <Link style={{color:"#f26f36"}} to ="/edit/:id" className="nav-link"> CUSTOMER CARE</Link>
            //             </li>
            //             <li>
            //                 <Link style={{color:"#f26f36"}} to ="/add" className="nav-link">TRACK MY ORDER</Link>
            //             </li>
            //             <li>
            //                 <Link style={{color:"#f26f36"}} to ="/login" className="nav-link"> LOGIN</Link>
            //             </li>
            //             <li>
            //                 <Link style={{color:"#f26f36"}} to ="/register" className="nav-link">SIGNUP</Link>
            //             </li>
            //         </ul>
            //     </div>
            // </div>
            //
            //     <div className="container-fluid bg-white">
            //         <div className="row">
            //             <div className="mb-2"></div>
            //         </div>
            //         <div className="row">
            //             <div className="col">
            //                 <Link style={{color:"white"}}  to ="/" className="navbar-brand"><img src={logo} width="auto" height="550px" alt="google.com"/></Link>
            //             </div>
            //             <div className="col-sm-5">
            //                 <div className="input-group mb-1 mt-4">
            //                     <input type="text" className="form-control" placeholder="Search in Daraz"
            //                            aria-label="Search in Daraz" aria-describedby="basic-addon2"/>
            //                     <div className="input-group-append">
            //                         <button className="btn btn-block btn-warning" id="basic-addon2" >Search</button>
            //                     </div>
            //                 </div>
            //             </div>
            //             <div className="col">
            //                 <img className="float-md-right" src={advertisement} width="auto" height="90px" alt="google.com"/>
            //             </div>
            //         </div>
            //         <div className="row">
            //             <div className="mb-2"></div>
            //         </div>
            //     </div>
            // </div>

            <div>
                <header id="header" className="header-effect-shrink" data-plugin-options="{'stickyEnabled': true, 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': true, 'stickyStartAt': 120, 'stickyChangeLogo': false}">
                    <div className="header-body">
                        <div className="header-top">
                            <div className="header-top-container container">
                                <div className="header-row">
                                    <div className="header-column justify-content-start">
                                        <span className="d-none d-sm-flex align-items-center"><i className="fas fa-map-marker-alt mr-1" />40 D. S. Senanayake Mawatha, Colombo 008</span>
                                        <span className="d-none d-sm-flex align-items-center ml-4"><i className="fas fa-phone mr-1" /><a href="tel:0112 672 689">0112 672 689</a></span>
                                    </div>
                                    <div className="header-column justify-content-end">
                                        <ul className="header-top-social-icons social-icons social-icons-transparent d-none d-md-block">
                                            <li className="social-icons-facebook">
                                                <a href="http://www.facebook.com/" target="_blank" title="Facebook"><i className="fab fa-facebook-f" /></a>
                                            </li>
                                            <li className="social-icons-twitter">
                                                <a href="http://www.twitter.com/" target="_blank" title="Twitter"><i className="fab fa-twitter" /></a>
                                            </li>
                                            <li className="social-icons-instagram">
                                                <a href="http://www.instagram.com/" target="_blank" title="Instragram"><i className="fab fa-instagram" /></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header-container container">
                            <div className="header-row">
                                <div className="header-column justify-content-start">
                                    <div className="header-logo">
                                        <a href="/home">
                                            <img alt="SHENOSA" width={230} height={62} src={logo} />
                                        </a>
                                    </div>
                                </div>
                                <div className="header-column justify-content-end">
                                    <div className="header-nav justify-content-start">
                                        <div className="header-nav-main header-nav-main-effect-1 header-nav-main-sub-effect-1">
                                            <nav className="collapse">
                                                <ul className="nav flex-column flex-lg-row" id="mainNav">
                                                    <li className="dropdown dropdown-mega">
                                                        <a className="dropdown-item dropdown-toggle" href="/home">Home</a>
                                                    </li>
                                                    <li className="dropdown">
                                                        <a className="dropdown-item dropdown-toggle" href="#">Profile</a>
                                                        <ul className="dropdown-menu">
                                                            <li><a className="dropdown-item" href="/profile">My Profile</a></li>
                                                            <li><a className="dropdown-item" href="/FavouriteList">Wish List</a></li>
                                                            <li><a className="dropdown-item" href="/ProductRatings">Purchased History</a></li>
                                                            <li><a className="dropdown-item" onClick={this.onSubmit}>Logout</a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>

                                        <a href="/login" className="btn btn-link text-color-default font-weight-bold order-3 d-none d-sm-block ml-auto mr-2 pt-1 text-1" >Login</a>
                                        {/*<a href="#" className="btn btn-link text-color-default font-weight-bold" style={{marginLeft:"500px"}}>Logout</a>*/}

                                        <div className="mini-cart order-4">
                                            <span className="font-weight-bold font-primary">Cart / <span className="cart-total">Rs. {this.state.totalPrice}</span></span>
                                            <div className="mini-cart-icon">
                                                <img src={require('../Images/cart-bag.svg')} className="img-fluid" alt="" />
                                                <span className="badge badge-primary rounded-circle" style={{fontSize:'12px'}}>{this.state.noOfItem}</span>
                                            </div>
                                            <div className="mini-cart-content">
                                                <div className="inner-wrapper bg-light rounded">
                                                    <div className="mini-cart-product">
                                                        <div className="row">
                                                            <div className="col-7">
                                                                {/*<h2 className="text-color-default font-secondary text-1 mt-3 mb-0">Blue Hoodies</h2>*/}
                                                                {/*<strong className="text-color-dark">*/}
                                                                {/*    <span className="qty">1x</span>*/}
                                                                {/*    <span className="product-price">$12.00</span>*/}
                                                                {/*</strong>*/}
                                                            </div>
                                                            <div className="col-5">
                                                                <div className="product-image">
                                                                    <a href="#" className="btn btn-light btn-rounded justify-content-center align-items-center"><i className="fas fa-times" /></a>
                                                                    <img src="web-assets/img/products/product-2.jpg" className="img-fluid rounded" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mini-cart-total">
                                                        <div className="row">
                                                            <div className="col">
                                                                <strong className="text-color-dark">TOTAL:</strong>
                                                            </div>
                                                            <div className="col text-right">
                                                                <strong className="total-value text-color-dark">Rs. {this.state.totalPrice}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mini-cart-actions">
                                                        <div className="row">
                                                            <div className="col pr-1">
                                                                <a href="/shoppingCartProcess" className="btn btn-dark font-weight-bold rounded text-0">VIEW CART</a>
                                                            </div>
                                                            <div className="col pl-1">
                                                                <a href="/shoppingCartProcess" className="btn btn-primary font-weight-bold rounded text-0">CHECKOUT</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="header-btn-collapse-nav order-4 ml-3" data-toggle="collapse" data-target=".header-nav-main nav">
                                          <span className="hamburguer">
                                            <span />
                                            <span />
                                            <span />
                                          </span>
                                            <span className="close">
                                            <span />
                                            <span />
                                          </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>

        )
    }
}
