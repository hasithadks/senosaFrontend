import React, {Component} from "react";
import axios from "axios";
import * as configs from "../../Config/config";
import ProductImage from "../Images/tshirt.jpg";
import StarRating from "./StarRating";
import {FaStar} from "react-icons/fa";
import StarRatingComponent from "react-star-rating-component";
import {Link} from "react-router-dom";
import {iconSuccessLine} from "react-bootstrap-sweetalert/dist/styles/SweetAlertStyles";
import swal from "sweetalert";


export default class ProductRatings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            broughtItem: [],
            rating: 0,
            hover: 0,
            userRating: 0,
            userID: null,
            isItemClick: false,
            item_name: '',
            item_description: '',
            item_from: '',
            item_brand: '',
            productID: '',
            comments: '',
            userName: '',
            item_size: '',
            item_color: '',
            alreadyRate: false,
            RateProductID : '',
            userEmail : '',
            selectedImage : '',

        };

        this.handleRating = this.handleRating.bind(this);
        this.onClickRatingValue = this.onClickRatingValue.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onClickRateNow = this.onClickRateNow.bind(this);
        this.submitRating = this.submitRating.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.updateRating = this.updateRating.bind(this);
    }

    componentDidMount() {

       console.log();
        if(localStorage.length > 0) {


            let userID = localStorage.getItem('user_id');


            axios.get(configs.BASE_URL + '/soldProducts/' + userID)
                .then(response => {
                    this.setState({
                        broughtItem: response.data,
                        userID: userID
                    });
                    console.log(this.state.broughtItem);
                });
//+ this.state.userID
            let userEmail = localStorage.getItem('user_username');
            axios.get(configs.BASE_URL + '/users/username/' + userEmail)
                .then(response => {
                    console.log("UserAccount responce :");
                    console.log(response.data[0].user_username);
                    // if(response.data[0] > 0 || response.data[0] !== null){

                    this.setState({
                        userName: response.data[0].user_username
                    });
                    // }

                });
        }
        else {

          // window.location = "/login";
            swal("Error!", "Please Log to the system first!", "warning");
        }
    }

    submitRating() {
        console.log(this.state.broughtItem);
        let {productID, userID, rating, comments, userName, item_size, item_color} = this.state;

        let payload = {productID, userID, rating, comments, userName, item_size, item_color};
        console.log("payload");
        console.log(payload);
        axios.post(configs.BASE_URL + '/rateProducts/add', payload)
            .then(response => {


            });

    }

    updateRating(){
        let {productID, userID, rating, comments, userName, item_size, item_color} = this.state;

        let payload = {productID, userID, rating, comments, userName, item_size, item_color};

        console.log("Update Payload:");
        console.log(payload);
        axios.post('https://senosaonlineshoppingwebsite.herokuapp.com/rateProducts/update/' + this.state.RateProductID, payload)
            .then(res => console.log(res.data));

    }

    onClickRatingValue(e) {
        console.log(e.target.value);
        this.setState({
            rating: e.target.value
        })
    }

    onMouseEnter(e) {
        console.log(e);
        this.setState({
            hover: e
        })
    }

    onChangeComment(e) {
        this.setState({
            comments: e.target.value
        })
    }

    onMouseOut() {

        this.setState({
            hover: 0
        })
    }

    onClickRateNow(e) {
        console.log(e.target.name);
        let selectedindex = Number(e.target.name);


        let temarray = this.state.broughtItem;
        temarray.forEach((td, index) => {
            let indexs = Number(index);
            console.log(index);

            if (indexs === selectedindex) {
                // console.log("Temp array");
                // console.log(temarray[index].item_size);

                this.setState({
                    item_size: temarray[index].item_size,
                    item_color: temarray[index].item_color,
                });
                let pID = td.productID;
                let uID = this.state.userID;

                axios.get(configs.BASE_URL + '/rateProducts/uid/' + uID + '/pid/' + pID)
                    .then(response => {
                        if (response.data.length > 0) {

                            this.setState({
                                comments: response.data[0].comments,
                                rating: response.data[0].rating,
                                alreadyRate: true,
                                RateProductID : response.data[0]._id
                            })
                        }

                    });
                console.log("product ID before get product: " + td.productID)
                axios.get('https://senosaonlineshoppingwebsite.herokuapp.com/products/itemId/' + td.productID)
                    .then(response => {
                        //console.log(response.data);
                        if (response.data.length > 0) {
                            this.setState({
                                item_name: response.data[0].item_name,
                                item_description: response.data[0].item_description,
                                item_from: response.data[0].item_from,
                                item_brand: response.data[0].item_brand,
                                productID: td.productID,
                                isItemClick: true
                            })
                        }


                    });

            }
        })

    }


    handleRating(rating) {

        this.setState({
            userRating: rating
        })

    }

    render() {
        return (
            <div>
                <div className="container" style={{backgroundColor: '#ECECEC', padding: '20px', marginBottom: '10px'}}>
                    <div className="row"
                         style={{backgroundColor: "white", padding: '20px', marginLeft: '20px', marginRight: '20px'}}>
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <h3>Rate to Products</h3>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col">
                                    <h5>Your Brought Items</h5>
                                </div>
                            </div>
                            <hr/>
                            {this.state.broughtItem.map((data, index) => {
                                return (
                                    <div className="row">
                                        <div className="col-7" style={{marginLeft: '0px'}}>
                                            <div className="row">
                                                <div className="col-3">
                                                    <img src={ProductImage} width="90" height="100" alt="Product Image"
                                                         style={{float: 'left'}}/>
                                                </div>
                                                <div className="col-9">
                                                    <div className="row">
                                                        <span>Product name</span>
                                                    </div>
                                                    <div className="row">
                                                        <span style={{fontSize: '12px'}}>Size : {data.item_size}</span>
                                                    </div>
                                                    <div className="row">
                                                        <span
                                                            style={{fontSize: '12px'}}>Color : {data.item_color}</span>
                                                    </div>
                                                    <div className="row">
                                                        <span
                                                            style={{fontSize: '12px'}}>Qty : {data.requested_qty}</span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="row">
                                            <span style={{
                                                fontSize: '25px',
                                                color: 'orange'
                                            }}><b>Rs. {data.discounted_price}</b></span>
                                                {data.item_discount > 0 ?
                                                    <div>
                                                        <label style={{
                                                            fontSize: '14px',
                                                            textDecoration: 'line-through'
                                                        }}><span>Rs. {data.item_price}</span></label>
                                                        <span style={{
                                                            marginLeft: '20px',
                                                            fontSize: '18px',
                                                            color: "red"
                                                        }}><b>{data.item_discount}%</b></span>
                                                    </div> :
                                                    <div>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                        <div className="col-2">

                                            <input type="button" value="Rate Now" onClick={this.onClickRateNow}
                                                   name={index} className="btn-primary btn"/>

                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>


                </div>
                <br/>
                {this.state.isItemClick === true ?
                    <div className="container">
                        <hr/>
                        <div className="row">
                            <div className="col-2">
                                <img src={ProductImage} width="120" height="140" alt="Product Image"
                                     style={{float: 'left', marginLeft: '20px'}}/>
                            </div>
                            <div className="col-8">
                                <div className="row" style={{marginTop: '20px'}}>
                                    <span>Product : {this.state.item_name}</span>
                                </div>
                                <div className="row" style={{marginTop: '20px'}}>
                                    <span>Description : {this.state.item_description}</span>
                                </div>
                                <div className="row">
                                    <span>Brand : {this.state.item_brand}</span>
                                </div>
                                <div className="row">
                                    <span>From : {this.state.item_from}</span>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="row" style={{marginTop: '20px'}}>
                            <h5 style={{marginLeft: '20px'}}>Give Stars for the Product</h5>
                        </div>
                        <div className="row" style={{marginTop: '20px'}}>

                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;

                                return <label style={{marginLeft: '20px'}}>
                                    <input type="radio" name="rating" style={{display: "none", cursor: "pointer"}}
                                           value={ratingValue}
                                           onClick={this.onClickRatingValue}/>
                                    <FaStar size={40}
                                            color={ratingValue <= (this.state.rating || this.state.hover) ? "#ffc107" : "#e4e5e9"}
                                            onMouseEnter={() => this.onMouseEnter(i + 1)}
                                            style={{cursor: "pointer"}}/>
                                </label>
                            })}


                        </div>
                        <div className="row">
                            <span
                                style={{marginLeft: '20px'}}>You Rate [{this.state.rating}] stars for the product.</span>
                        </div>
                        <div className="row" style={{marginTop: '20px'}}>
                            <h5 style={{marginLeft: '20px'}}>Give Your Idea about this product</h5>
                        </div>
                        <div className="row" style={{marginTop: '20px'}}>
                            <textarea style={{width: '50%', marginLeft: '20px'}} value={this.state.comments}
                                      onChange={this.onChangeComment}/>
                        </div>
                        <div className="row" style={{marginTop: '20px', marginBottom: '20px'}}>
                            {/*<Link className="btn btn-primary" onClick={this.submitRating} to={"#"} style={{*/}
                            {/*    backgroundColor: 'orange',*/}
                            {/*    borderColor: 'orange',*/}
                            {/*    marginTop: '20px',*/}
                            {/*    float: 'left',*/}
                            {/*    marginLeft: '20px',*/}
                            {/*    marginBottom: '20px',*/}
                            {/*    width: '25%'*/}
                            {/*}}>Add Comment</Link>*/}
                            {this.state.alreadyRate === false ?
                                <a href="/ProductRatings" type="submit" onClick={this.submitRating}
                                   className="profile-edit-btn nav-link  btn btn-primary stop-color-final"
                                   name="btnAddMore"
                                   style={{
                                       float: 'left', marginLeft: '20px', marginTop: '00px', marginBottom: '20px',
                                       backgroundColor: 'orange', borderColor: 'orange', fontSize: '20px', width: '25%'
                                   }}>
                                    Add Comment
                                </a>
                                :
                                <a href="/ProductRatings" type="submit" onClick={this.updateRating}
                                   className="profile-edit-btn nav-link  btn btn-primary stop-color-final"
                                   name="btnAddMore"
                                   style={{
                                       float: 'left', marginLeft: '20px', marginTop: '00px', marginBottom: '20px',
                                       backgroundColor: 'orange', borderColor: 'orange', fontSize: '20px', width: '25%'
                                   }}>
                                    Update Comment
                                </a>
                            }

                        </div>
                    </div>
                    :
                    <div></div>
                }
            </div>
        );
    }

}
