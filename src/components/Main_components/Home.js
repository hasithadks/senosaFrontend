import React, { Component } from 'react'
import '../CSS/home.css'
import axios from 'axios';
import {Link} from "react-router-dom";

const  Product = props =>(

    <div className="row">
        <br/><br/>
        <table style={{width:'auto',marginLeft:'46px'}}>
            <tr className="col-12">
                <td className="" style={{marginTop:'30px'}}>
                    <tr><br/>
                        <div className="card" style={{width: "17rem"}}>
                            <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{props.product.item_name}</h5>
                                <p className="card-text">{props.product.item_description}</p>
                                <p className="card-text" style={{color:'orange' , fontSize:'20px'}}>Rs.{props.product.item_price}.00</p>
                                <Link className="btn btn-primary" to={"/productDetails/"+props.product.item_id}>View Details</Link>
                            </div>
                        </div>
                        {/*<img style={{width:'255px'}}  src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Card image cap" />*/}
                        {/*<h4 >{props.product.item_name}</h4>*/}
                        {/*<h4 >{props.product.item_brand}</h4>*/}
                        {/*<h4 >{props.product.item_size}</h4>*/}
                        {/*<h4 >{props.product.item_colour}</h4>*/}
                        {/*/!*<a style={{width:'150px'}} href="#" className="btn btn-primary">Add to cart</a>*!/*/}
                        {/*<Link className="btn btn-primary" to={"/productDetails/"+props.product.item_id}>View Details</Link>*/}
                    </tr>
                </td>
                <td style={{width:'80px'}}>
                </td>
            </tr>
        </table>
        <br/><br/><br/>
    </div>


);

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state ={
            item_name:'',
            products: []};

        this.productsList = this.productsList.bind(this);

    }
    componentDidMount() {
        axios.get('http://localhost:5000/products/')
            .then(response =>{
                this.setState({products:response.data});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    productsList(){
        return this.state.products.map(function (currentpro,i) {
            return <Product product = {currentpro} key={i}/>
        });
    }

    render() {
        return (

            <div className="container">

                <div>


                    <div id="carousel-example-2" className="carousel slide carousel-fade" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carousel-example-2" data-slide-to="0" className="active"></li>
                            <li data-target="#carousel-example-2" data-slide-to="1"></li>
                            <li data-target="#carousel-example-2" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                                <div className="view" style={{width:'100%',height:'500px'}}>
                                    <img className="d-block w-100"
                                         // src="https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg"
                                        src={require('../Images/slide1.jpg')}
                                         alt="First slide"/>
                                    <div className="mask rgba-black-light"></div>
                                </div>
                                {/*<div className="carousel-caption">*/}
                                {/*    <h3 className="h3-responsive">Light mask</h3>*/}
                                {/*    <p>First text</p>*/}
                                {/*</div>*/}
                            </div>
                            <div className="carousel-item">
                                <div className="view">
                                    <img className="d-block w-100"
                                         // src="https://mdbootstrap.com/img/Photos/Slides/img%20(6).jpg"
                                        src={require('../Images/slide2.jpg')}
                                         alt="Second slide"/>
                                    <div className="mask rgba-black-strong"></div>
                                </div>
                                {/*<div className="carousel-caption">*/}
                                {/*    <h3 className="h3-responsive">Strong mask</h3>*/}
                                {/*    <p>Secondary text</p>*/}
                                {/*</div>*/}
                            </div>
                            <div className="carousel-item">
                                <div className="view">
                                    <img className="d-block w-100"
                                         // src="https://mdbootstrap.com/img/Photos/Slides/img%20(9).jpg"
                                        src={require('../Images/slide3.jpg')}
                                         alt="Third slide"/>
                                    <div className="mask rgba-black-slight"></div>
                                </div>
                                {/*<div className="carousel-caption">*/}
                                {/*    <h3 className="h3-responsive">Slight mask</h3>*/}
                                {/*    <p>Third text</p>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carousel-example-2" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carousel-example-2" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>


                        <div className="row">
                            {this.productsList()}
                        </div>

                </div>


                {/*<h1>HOME</h1>*/}

                {/*<div className="row">*/}
                {/*    <div className="col-sm-3">*/}
                {/*        <div className="card">*/}
                {/*            /!* Card image *!/*/}
                {/*            <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Card image cap" />*/}
                {/*            /!* Card content *!/*/}
                {/*            <div className="card-body">*/}
                {/*                /!* Title *!/*/}
                {/*                <h4 className="card-title"><a>Title</a></h4>*/}
                {/*                /!* Text *!/*/}
                {/*                <p className="card-text">*/}
                {/*                    PRICE*/}
                {/*                </p>*/}
                {/*                /!* Button *!/*/}
                {/*                <a href="#" className="btn btn-primary">Add to cart</a>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<table>*/}
                {/*    <tbody>*/}
                {/*    {this.productsList()}*/}
                {/*    </tbody>*/}
                {/*</table>*/}
                <br/><br/><br/>
            </div>


        )
    }
}
