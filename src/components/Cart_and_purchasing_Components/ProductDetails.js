import React, {Component} from "react";
import ProductImage from "../Images/tshirt.jpg";
import FavouriteImageGray from "../Images/favorite_grey.png";
import FavouriteImageRed from "../Images/favorite_red.png";
import {Link} from "react-router-dom";
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';
import pluseImage from '../Images/pluse.png';
import minusImage from '../Images/minus.png';
import arrowImage from '../Images/arrowdown2.png';
import {resolveToLocation} from "react-router-dom/modules/utils/locationUtils";
import * as configs from "../../Config/config";
import {FaStar} from "react-icons/fa";
import Toast from "react-bootstrap/Toast";
import defaultImage from "../Images/productdefaultimage.jpg";
import {useState} from "react";
import swal from "sweetalert";
import roundTo from "round-to";

export default class ProductDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productName: 'Men T-Shirt',
            productDiscription: "",
            item_category: "",
            manufacture: "",
            item_brand: "",
            shirtSize: ['S', 'M', 'L', 'XL', 'XXL'],
            itemColor: [],
            productPrice: 0,
            discountedPrice: 0,
            isLike: false,
            isDiscounted: false,
            likeImage: '',
            quantity: 0,
            discount: 0,
            productId: 0,
            userID: null,
            favo_ID: "",
            allProduct: [],
            productQuantities: [],
            availablecount: 0,
            selectedSize: '',
            selectedColor: '',
            quantitiesTableID: '',
            overRollRating: 0,
            hover: 0,
            ratingCount: 0,
            ratingFive: 0,
            ratingFour: 0,
            ratingThree: 0,
            ratingTwo: 0,
            ratingOne: 0,
            isViewDetais: false,
            SoldProducts : [],
            isViewComment : true,
            userEmail : null,
            productImage :[],
            selectedImage : ''


        };

        this.onChangeIsLike = this.onChangeIsLike.bind(this);
        this.onclickShoppingCart = this.onclickShoppingCart.bind(this);
        this.onClickMinesLeft = this.onClickMinesLeft.bind(this);
        this.onClickPlusRight = this.onClickPlusRight.bind(this);
        this.onAvailableItemCount = this.onAvailableItemCount.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onClickRatingValue = this.onClickRatingValue.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onClickMore = this.onClickMore.bind(this);
    }

    componentDidMount() {
        let pID = 0;
        let uID = 0;
        if (this.props.match.params.id != null) {
            axios.get('https://senosaonlineshoppingwebsite.herokuapp.com/products/itemId/' + this.props.match.params.id)
                .then(response => {
                    let userEmail = localStorage.getItem('user_username');
                    console.log("User Email : " + userEmail);
                    pID = this.props.match.params.id;
                    uID = localStorage.getItem('user_id');
                    console.log("User id : " + uID);
                    console.log("Response Data :");
                    console.log(response.data);
                    this.setState({
                        productId: response.data[0].item_id,
                        productName: response.data[0].item_name,
                        productDiscription: response.data[0].item_description,
                        item_category: response.data[0].item_category,
                        discount: response.data[0].item_discount,
                        manufacture: response.data[0].item_from,
                        item_brand: response.data[0].item_brand,
                        productPrice : response.data[0].item_price,
                        userID : uID,
                        userEmail : userEmail

                    }, () => {

                        let tempDiscount = this.state.discount;
                        let temProductPrice = this.state.productPrice;
                        let temDiscountedPrice = this.state.discountedPrice;

                        if(tempDiscount > 0){

                            temDiscountedPrice = roundTo(Number(temProductPrice - (temProductPrice * tempDiscount)/100),2);
                            this.setState({
                                isDiscounted : true,
                                discountedPrice : temDiscountedPrice
                            })


                        }
                        else {
                            this.setState({
                                isDiscounted : false,
                                discountedPrice : temProductPrice
                            })
                        }


                        //let ids = {pID, uID}
                        pID = this.state.productId;
                        //console.log("Product ID : " + pID)
                        axios.get(configs.BASE_URL + '/favouriteProduct/uid/' + uID + '/pid/' + pID)
                            .then(response => {
                                // console.log("Product ID :"+this.state.productId);
                                // console.log(JSON.stringify(response.data) );

                                if (response.data.length > 0) {
                                    console.log(response.data);
                                    console.log("Is Like : " + response.data[0].isLiked);
                                    // const selectedItem = response.data.filter((dt) => {
                                    //     return dt.userID === this.state.userID
                                    //console.log("Selected Item:" + selectedItem);

                                    let data = response.data;
                                    if (data[0].isLiked === true) {
                                        this.setState({
                                            isLike: true,
                                            favo_ID: data[0]._id
                                        });
                                    }
                                    console.log("Favo ID : " + this.state.favo_ID);
                                }
                            });


                    })
                })
                .catch(function (error) {
                    console.log(error)
                })


        }
        // + this.props.match.params.id
        if (this.props.match.params.id != null) {
            console.log("find qty ID: " + this.props.match.params.id)
            axios.get('https://senosaonlineshoppingwebsite.herokuapp.com/quantity/' + this.props.match.params.id)
                .then(response => {
                    this.setState({productQuantities: response.data});
                    let sizeList = [];
                    let colorList = [];
                    let imageList = [];
                    for (let i = 0; i < response.data.length; i++) {

                        sizeList.push(response.data[i].item_size);
                        colorList.push(response.data[i].item_colour);
                        imageList.push(response.data[i].item_productImage);
                    }

                    const distinct = (value, index, self) => {
                        return self.indexOf(value) === index;
                    };

                    const distinctSize = sizeList.filter(distinct);
                    distinctSize.sort(function(a, b) {
                    });

                    const distinctcolor = colorList.filter(distinct);
                    distinctcolor.sort(function(a, b) {
                    });

                    this.setState({
                        shirtSize: distinctSize,
                        itemColor: distinctcolor,
                        productImage : imageList
                    }, () => {

                        let pID = this.state.productId;
                        // let uID = this.state.userID;
                        console.log("IN SOLD ITEM CALL Product ID : " + pID);
                        // console.log("IN SOLD ITEM CALL User ID : " + uID);
                        axios.get(configs.BASE_URL + '/rateProducts/' + pID)
                            .then(response => {
                                console.log("Sold All products");
                                console.log(response.data);
                                this.setState({
                                    SoldProducts: response.data
                                }, () =>{
                                    console.log("In Call Back Function")
                                    let temArray = this.state.SoldProducts;
                                    let rating5 = this.state.ratingFive;
                                    let rating4 = this.state.ratingFour;
                                    let rating3 = this.state.ratingThree;
                                    let rating2 = this.state.ratingTwo;
                                    let rating1 = this.state.ratingOne;
                                    let totalRating = this.state.overRollRating;
                                    let avgRating = 0;

                                    console.log("Sold Products");
                                    console.log(temArray)
                                    temArray.map((data, index) => {

                                        console.log(data.rating);
                                        if (data.rating === 5) {
                                            rating5 = Number(rating5 + 1);
                                        } else if (data.rating === 4) {
                                            rating4 = Number(rating4 + 1);
                                        } else if (data.rating === 3) {
                                            rating3 = Number(rating3 + 1);
                                        } else if (data.rating === 2) {
                                            rating2 = Number(rating2 + 1);
                                        } else if (data.rating === 1) {
                                            rating1 = Number(rating1 + 1);
                                        }

                                        totalRating = Number(totalRating + data.rating);
                                    });

                                    if(temArray.length > 0) {
                                        avgRating = roundTo(Number(totalRating / temArray.length), 2);
                                    }
                                    this.setState({
                                        ratingCount: temArray.length,
                                        ratingFive: rating5,
                                        ratingFour: rating4,
                                        ratingThree: rating3,
                                        ratingTwo: rating2,
                                        ratingOne: rating1,
                                        overRollRating: avgRating
                                    });
                                });

                            });
                    })
                    //  console.log(response.data);
                    //   console.log(this.state.itemColor);
                    // console.log(this.state.shirtSize);
                })
                .catch(function (error) {
                    console.log(error);
                });




        } else {
            this.setState({quantity: []});
        }


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

    onClickMore(e) {
        this.setState({
            isViewComment : false
        });
        if (this.state.isViewDetais === false) {
            this.setState({
                isViewDetais: true
            })
        } else {
            this.setState({
                isViewDetais: false
            })

        }
    }

    onChangeIsLike() {

        if (this.state.isLike === false) {
            this.setState({
                    isLike: true

                },
                () => {

                if(this.state.userID != null){
                    let {productId, userID, isLike} = this.state;
                    let payload = {productId, userID, isLike};
                    //console.log(payload);
                    axios.post(configs.BASE_URL + '/favouriteProduct/add', payload)
                        .then(() => this.componentDidMount());

                }
                else{
                    this.setState({
                        isLike: false
                    },()=>{
                        swal("Can Like This Product", "Please Logged to the system!!!", "warning");
                    });


                }

                    let {productId, userID, isLike} = this.state;
                    let payload = {productId, userID, isLike};
                    //console.log(payload);
                    axios.post(configs.BASE_URL + '/favouriteProduct/add', payload)
                        .then(() => this.componentDidMount());
                }
            )

        } else {
            this.setState({
                    isLike: false

                },
                () => {
                    axios.delete(configs.BASE_URL + '/favouriteProduct/delete/' + this.state.favo_ID)
                        .then(() =>  swal("Success!", "Remove from WishList", "success"));
                }
            )
        }


    }

    onclickShoppingCart() {


        if(this.state.userID != null) {


            if (this.state.shirtSize !== "" && this.state.itemColor !== "" && this.state.quantity > 0) {
                //  let {productId, userID, productPrice, discount, discountedPrice, selectedSize, selectedColor, quantity} = this.state;
                console.log("add To Cart ");
                console.log(this.state.selectedImage);

                let productID = this.state.productId;
                let userID = this.state.userID;
                let item_price = this.state.productPrice;
                let item_discount = this.state.discount;
                let discounted_price = this.state.discountedPrice;
                let item_size = this.state.selectedSize;
                let item_color = this.state.selectedColor;
                let requested_qty = this.state.quantity;
                let quantities_id = this.state.quantitiesTableID;
                let selectedImage = this.state.selectedImage;

                let payload = {
                    productID,
                    userID,
                    item_price,
                    item_discount,
                    discounted_price,
                    item_size,
                    item_color,
                    requested_qty,
                    quantities_id,
                    selectedImage
                };


                axios.post(configs.BASE_URL + '/cart/add', payload)
                    .then(() => {
                        swal("Success!", "Add to Cart!!!", "success");
                        window.location.reload();
                    });
            } else {
                swal("Error!", "Please Select Size , Color and Quantity Correctly!", "warning");
            }
        }else {
            swal("Can not Add to Cart!", "Please Logged to the system!!!", "warning");
        }

    }

    async onAvailableItemCount(size, color) {
        try {
            if (size != null) {
                //console.log("size is not null");
                await this.setState({
                        selectedSize: size
                    }, () => {
                        console.log("In Method 2" + this.state.selectedSize);
                    }
                );
            }
            if (color != null) {
                //console.log("Color is not null");
                await this.setState({
                    selectedColor: color
                }, () => {
                    console.log("In Method 1" + this.state.selectedColor);
                });
            }

            let allQunttityArray = this.state.productQuantities;
            const {selectedSize, selectedColor} = this.state;
            if (selectedSize !== '' && selectedColor !== '') {
                const selectedItem = allQunttityArray.filter((data) => {
                    return data.item_size === selectedSize && data.item_colour === selectedColor
                });
                if (typeof selectedItem[0] !== "undefined") {

                    this.setState({
                        availablecount: selectedItem[0].item_quantity,
                        quantitiesTableID: selectedItem[0]._id,
                        selectedImage :selectedItem[0].item_productImage
                    });

                    console.log("Selected Item Id: " + JSON.stringify(selectedItem[0]._id));
                    console.log("Selected Image: " + JSON.stringify(selectedItem[0].item_productImage));
                } else {
                    this.setState({
                        availablecount: 0,
                        quantitiesTableID: ''
                    });
                }
            }
        } catch (exception) {
            console.log(exception);
        }

    }

    onChangeSize(e) {
        let selectedSize = e.target.value;

        this.onAvailableItemCount(selectedSize, null);
    }

    onChangeColor(e) {
        let selectedColor = e.target.value;

        this.onAvailableItemCount(null, selectedColor);
    }

    onClickMinesLeft() {
        let temQty = this.state.quantity;
        if (temQty > 0) {
            temQty = temQty - 1;
            this.setState({quantity: temQty});
        }
    }

    onClickPlusRight() {
        let temQty = this.state.quantity;
        if (temQty < this.state.availablecount) {
            temQty = temQty + 1;
            this.setState({quantity: temQty});
        }
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }


    render() {
        return (
            <div className="container" style={{width: '100%'}}>
                {/*<div>*/}
                {/*   <Example/>*/}
                {/*</div>*/}
                <div className="row" style={{width: '100%'}}>
                    <div className="row-cols-1">
                        {/*{this.state.productQuantities.map((data,index)=>{*/}
                        {/* // return  <img src={require('../uploads/'+data.item_productImage)} width="30" height="30" alt="Product Image"/>*/}
                        {/*    return  <img height="100" src={require('../uploads/'+data.item_productImage)} alt="" width="100"/>*/}
                        {/*})}*/}
                        {this.state.selectedImage === '' ?
                            <img className="" height="320" src={defaultImage} alt=""
                                 width="300"/>
                            :
                            <img height="320" src={require('../uploads/' + this.state.selectedImage)} alt=""
                                 width="300"/>
                        }

                    </div>
                    <div className="row-cols-1" style={{width: '50%', height: 'auto'}}>
                        <div>
                            {this.state.isLike === false ?
                                <img className="img-thumbnail" src={FavouriteImageGray} width="50" height="50"
                                     alt="Add Favourite Image" onClick={this.onChangeIsLike}
                                     style={{float: 'Right', cursor: "pointer"}}/> :
                                <img className="img-thumbnail" src={FavouriteImageRed} width="50" height="50"
                                     alt="Add Favourite Image" onClick={this.onChangeIsLike} style={{float: 'Right', cursor: "pointer"}}/>}
                            <h4>{this.state.productName}</h4>
                            {/*<span style={{fontSize: '14px'}}>Ratings</span>*/}
                            <div className="row" style={{float: 'center', paddingBottom: '0px'}}>
                                <div className="col">
                                {[...Array(5)].map((star, i) => {
                                    const ratingValue = i + 1;

                                    return <label style={{marginLeft: '5px', faloat: 'center'}}>
                                        <input type="radio" name="rating"
                                               style={{display: "none", cursor: "pointer"}}
                                               value={ratingValue}
                                            //onClick={this.onClickRatingValue}
                                        />
                                        <FaStar size={15}
                                                color={ratingValue <= (this.state.overRollRating) ? "#ffc107" : "#e4e5e9"}
                                            //onMouseEnter={() => this.onMouseEnter(i + 1)}
                                                style={{cursor: "pointer"}}/>
                                    </label>
                                })}
                                </div>
                            </div>

                        </div>
                        <hr style={{marginTop: '2px'}}/>
                        <div className="row">
                            <div className="col-7">
                                <h2 style={{color: 'orange', float: "right"}}> Rs. {this.state.discountedPrice}</h2>
                            </div>

                            {this.state.isDiscounted !== false ?
                                <div className="col" style={{
                                    float: 'right',
                                    width: '80px', marginRight: '70px', marginTop: '0px'
                                }}>
                                    <h5 style={{color: 'red'}}>{this.state.discount}% Off</h5>
                                    <span style={{textDecoration: 'line-through'}}>Rs. {this.state.productPrice}</span>
                                </div> :
                                <div className="justify-content-lg-between" style={{
                                    float: 'right',
                                    width: '80px', marginRight: '70px', marginTop: '-40px'
                                }}>

                                </div>
                            }

                        </div>
                        <hr/>
                        <div className="row" style={{padding: '5px'}}>
                            <div className="col-4" style={{padding: '0px'}}>
                                <label>Size :</label>
                            </div>
                            <div className="col-3" style={{padding: '0px'}}>
                                <select style={{width: '100%'}} className="browser-default custom-select"
                                        onChange={(e) => this.onChangeSize(e)}>
                                    <option defaultValue="Select Size" disabled selected>Select Size</option>
                                    {this.state.shirtSize.map((size) => <option key={size}
                                                                                value={size}>{size}</option>)}


                                </select>
                            </div>
                        </div>
                        <div className="row" style={{padding: '5px'}}>
                            <div className="col-4" style={{padding: '0px'}}>
                                <label>Color : </label>
                            </div>
                            <div className="col-3" style={{padding: '0px'}}>
                                <select style={{width: '100%'}} className="browser-default custom-select"
                                        onChange={(e) => this.onChangeColor(e)}>
                                    <option value="" disabled selected>Select Color</option>
                                    {this.state.itemColor.map((color) => <option key={color}
                                                                                 value={color}>{color}</option>)}
                                </select>
                            </div>


                        </div>

                        <div>
                            <hr/>
                            <div className="row" style={{
                                float: 'left',
                                width: '100%',
                                margin: '0px',
                                padding: '10px',
                                marginTop: '-20px'
                            }}>
                                <div className="col-1" style={{padding: '0px'}}>
                                </div>
                                <div className="col-3" style={{padding: '0px', float: 'left', marginRight: '-50px'}}>
                                    <br/>
                                    <span style={{marginLeft: '-50px'}}>Quantity : </span>
                                </div>
                                <div className="col-2" style={{padding: '0px'}}>
                                    <br/>
                                    <img src={minusImage} width="25" height="25" style={{cursor: "pointer"}}
                                         alt="Add Favourite Image" onClick={this.onClickMinesLeft}/>
                                </div>
                                <div className="col-1" style={{padding: '0px'}}>
                                    <br/>
                                    <input type="text" className="form-control" style={{width: '100%'}} id="quetity"
                                           value={this.state.quantity}/>
                                </div>
                                <div className="col-2" style={{padding: '0px', marginLeft: '-0px'}}>
                                    <br/>
                                    <img src={pluseImage} width="25" height="25" style={{cursor: "pointer"}}
                                         alt="Add Favourite Image" onClick={this.onClickPlusRight}/>
                                </div>
                                <div className="col-2" style={{padding: '0px'}}>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-11">

                                    <span>Only {this.state.availablecount} Items Left </span>
                                </div>
                            </div>
                        </div>

                        <div className="row" style={{marginLeft: '0px'}}>
                            <div className="col-12">


                                <a href="#" type="submit" onClick={this.onclickShoppingCart}
                                   className="profile-edit-btn nav-link  btn btn-primary stop-color-final"
                                   name="btnAddMore"
                                   style={{
                                       float: 'center', marginLeft: '5px', marginTop: '30px', marginBottom: '20px',
                                       backgroundColor: 'orange', borderColor: 'orange', fontSize: '20px'
                                   }}>
                                    Add to Cart
                                </a>
                            </div>
                            {/* <button className=" btn btn-primary" style={{padding: 5, marginLeft: '5px'}}>Buy Now*/}
                            {/*<Link to={`/shoppingcart`}></Link>*/}
                            {/* </button>*/}
                        </div>


                    </div>
                </div>
                <div className="row">
                    <div className="col" style={{padding:'20px',marginBottom:'20px'}}>
                        {/*<img src={arrowImage} width="50" height="50" alt="Product Image"*/}
                        {/*    //onClick={this.onClickMore}*/}
                        {/*     style={{float: 'center'}}/>*/}
                             <a style={{cursor: "pointer", color:'#AEAEAE'}} onClick={this.onClickMore}>More Details >>></a>
                    </div>
                </div>

                {this.state.isViewDetais === true ?
                    <div className="container">
                        <div className="row" style={{backgroundColor: "#F3F3F3", padding: '15px'}}>
                            <h4 style={{marginLeft: '15px'}}>Product Details of <span>{this.state.productName}</span>
                            </h4>
                        </div>
                        <div className="row" style={{padding: '15px'}}>
                            <span style={{marginLeft: '15px'}}>{this.state.productDiscription}</span>
                        </div>
                        <hr/>
                        <div className="row" style={{padding: '10px'}}>
                            <span style={{marginLeft: '15px'}}>Brand : {this.state.item_brand}</span>
                        </div>
                        <div className="row" style={{padding: '10px'}}>
                            <span style={{marginLeft: '15px'}}>From : {this.state.manufacture}</span>
                        </div>
                        <br/>
                        <div className="row" style={{backgroundColor: "#F3F3F3", padding: '15px'}}>
                            <h4 style={{marginLeft: '15px'}}>Ratings & Reviews of <span>{this.state.productName}</span>
                            </h4>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div className="row" style={{padding: '15px'}}>
                                    <h2 style={{marginLeft: '15px'}}><span style={{color: 'gray'}}><b
                                        style={{fontSize: '40px', color: "black"}}>{this.state.overRollRating}</b>/5</span></h2>
                                </div>
                                <div className="row">
                                    {[...Array(5)].map((star, i) => {
                                        const ratingValue = i + 1;

                                        return <label style={{marginLeft: '20px', float: 'left'}}>
                                            <input type="radio" name="rating"
                                                   style={{display: "none", cursor: "pointer"}}
                                                   value={ratingValue}
                                                   //onClick={this.onClickRatingValue}
                                            />
                                            <FaStar size={40}
                                                    color={ratingValue <= (this.state.overRollRating) ? "#ffc107" : "#e4e5e9"}
                                                    //onMouseEnter={() => this.onMouseEnter(i + 1)}
                                                    style={{cursor: "pointer"}}/>
                                        </label>
                                    })}
                                </div>
                                <div className="row" style={{padding: '15px'}}>
                                    <span style={{marginLeft: '15px'}}>{this.state.ratingCount} Ratings</span>
                                </div>

                            </div>
                            <div className="col-6">
                                <div className="row" style={{padding: '5px'}}>
                                    <div className="col-6">
                                        {[...Array(5)].map((star, i) => {
                                            const ratingValue = i + 1;

                                            return <label style={{marginLeft: '15px', float: 'left'}}>
                                                <input type="radio" name="rating"
                                                       style={{display: "none", cursor: "pointer"}}
                                                       value={ratingValue}
                                                />
                                                <FaStar size={20}
                                                        color={ratingValue <= 5 ? "#ffc107" : "#e4e5e9"}
                                                        style={{cursor: "pointer"}}/>
                                            </label>
                                        })}

                                    </div>
                                    <div className="col-1">
                                        <span>{this.state.ratingFive}</span>
                                    </div>

                                </div>
                                <div className="row" style={{padding: '5px'}}>
                                    <div className="col-6">
                                        {[...Array(5)].map((star, i) => {
                                            const ratingValue = i + 1;

                                            return <label style={{marginLeft: '15px', float: 'left'}}>
                                                <input type="radio" name="rating"
                                                       style={{display: "none", cursor: "pointer"}}
                                                       value={ratingValue}
                                                />
                                                <FaStar size={20}
                                                        color={ratingValue <= 4 ? "#ffc107" : "#e4e5e9"}
                                                        style={{cursor: "pointer"}}/>
                                            </label>
                                        })}

                                    </div>
                                    <div className="col-1">
                                        <span>{this.state.ratingFour}</span>
                                    </div>

                                </div>
                                <div className="row" style={{padding: '5px'}}>
                                    <div className="col-6">
                                        {[...Array(5)].map((star, i) => {
                                            const ratingValue = i + 1;

                                            return <label style={{marginLeft: '15px', float: 'left'}}>
                                                <input type="radio" name="rating"
                                                       style={{display: "none", cursor: "pointer"}}
                                                       value={ratingValue}
                                                />
                                                <FaStar size={20}
                                                        color={ratingValue <= 3 ? "#ffc107" : "#e4e5e9"}
                                                        style={{cursor: "pointer"}}/>
                                            </label>
                                        })}

                                    </div>
                                    <div className="col-1">
                                        <span>{this.state.ratingThree}</span>
                                    </div>

                                </div>
                                <div className="row" style={{padding: '5px'}}>
                                    <div className="col-6">
                                        {[...Array(5)].map((star, i) => {
                                            const ratingValue = i + 1;

                                            return <label style={{marginLeft: '15px', float: 'left'}}>
                                                <input type="radio" name="rating"
                                                       style={{display: "none", cursor: "pointer"}}
                                                       value={ratingValue}
                                                />
                                                <FaStar size={20}
                                                        color={ratingValue <= 2 ? "#ffc107" : "#e4e5e9"}
                                                        style={{cursor: "pointer"}}/>
                                            </label>
                                        })}

                                    </div>
                                    <div className="col-1">
                                        <span>{this.state.ratingTwo}</span>
                                    </div>

                                </div>
                                <div className="row" style={{padding: '5px'}}>
                                    <div className="col-6">
                                        {[...Array(5)].map((star, i) => {
                                            const ratingValue = i + 1;

                                            return <label style={{marginLeft: '15px', float: 'left'}}>
                                                <input type="radio" name="rating"
                                                       style={{display: "none", cursor: "pointer"}}
                                                       value={ratingValue}
                                                />
                                                <FaStar size={20}
                                                        color={ratingValue <= 1 ? "#ffc107" : "#e4e5e9"}
                                                        style={{cursor: "pointer"}}/>
                                            </label>
                                        })}

                                    </div>
                                    <div className="col-1">
                                        <span>{this.state.ratingOne}</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row" style={{backgroundColor: "#F3F3F3", padding: '15px'}}>

                            <h4 style={{marginLeft: '15px'}}><span>Product Reviews</span></h4>

                        </div>
                        {this.state.SoldProducts.map((item, index) => {
                            return(
                                <div className="row" style={{paddingLeft: '25px',paddingBottom:'10px', paddingTop:'10px', backgroundColor:"#F8F8F8"}}>
                                    <div className="col">
                                        <div className="row" style={{padding: '0px'}}>

                                            {[...Array(5)].map((star, i) => {
                                                const ratingValue = i + 1;

                                                return <label style={{marginLeft: '2px', float: 'left'}}>
                                                    <input type="radio" name="rating"
                                                           style={{display: "none", cursor: "pointer"}}
                                                           value={ratingValue}
                                                    />
                                                    <FaStar size={18}
                                                            color={ratingValue <= (item.rating) ? "#ffc107" : "#e4e5e9"}
                                                            style={{margin: '0px'}}/>
                                                </label>
                                            })}



                                        </div>
                                        <div className="row" style={{padding: '0px', marginTop:'-5px'}}>
                                    <span>
                                    <span>{item.userName} </span>
                                    <label style={{color: 'green', fontSize:'12px', marginLeft:'5px'}}>Verified Purchase</label>
                                        </span>
                                        </div>
                                        <div className="row" style={{padding: '0px'}}>
                                            <label style={{fontSize:'20px'}}>{item.comments}</label>
                                        </div>
                                        <div className="row" style={{padding: '0px',fontSize:'12px',color: '#AEAEAE'}}>
                                            <span>Size: {item.item_size}  Color : {item.item_color} </span>
                                        </div>
                                        <hr style={{marginLeft:'-15px'}}/>
                                    </div>

                                </div>
                            )
                        })}

                    </div>
                    :
                    <div></div>
                }
            </div>

        );
    }
}
