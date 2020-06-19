import React, {Component} from "react";
import ProductImage from "../Images/tshirt.jpg";
import deleteIcon from "../Images/delete_icon.png";
import shoppinCart from "../Images/shopingcart.png"

export default class FavouriteList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productName: 'Men T-Shirt',
            size: 'M',
            color: 'White',
            price: 1450,
            discountedPrise: 1200,
            discount: 20,
            array: [{
                pName: 'Men T-Shirt 01',
                pSize: 'XXL',
                pColor: 'Blue',
                pPrice: 1500,
                pDisPrice: 1200,
                pDiscount: 20
            },
                {
                    pName: 'Men T-Shirt 02',
                    pSize: 'L',
                    pColor: 'Blue',
                    pPrice: 2000,
                    pDisPrice: 1500,
                    pDiscount: 25
                }
            ]

        }
    }


    render() {
        return (
            <div className="container">
                <h2>Favourite List</h2>
                <hr/>
                {this.state.array.map((data, index) => {
                    return (
                        <div>
                            <hr/>
                            <div className="row">

                                <div className="col">
                                    <img src={ProductImage} width="160" height="180" alt="Product Image"/>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <h3>{data.pName}</h3>
                                    </div>
                                    <div className="row">
                                        <div className="col-" style={{marginLeft: '0px', float: 'left'}}>
                                            <label>Size:<span>{data.pSize}</span></label>
                                        </div>
                                        <div className="col-2" style={{marginLeft: '10px', float: 'left'}}>
                                            <label>Color:<span>{data.pColor}</span></label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <img src={deleteIcon} width="30" height="30" alt="Delete Icon"
                                             style={{float: "right"}}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <h4 style={{color: "orange"}}>Rs. <span>{data.pDisPrice}</span></h4>
                                    </div>
                                    <div className="row">
                            <span style={{textDecoration: 'line-through'}}>Rs.
                                <span> {data.pPrice}</span></span>
                                        <span style={{
                                            fontSize: '16px',
                                            marginLeft: '10px'
                                        }}><b>-{data.pDiscount}%</b></span>
                                    </div>
                                </div>
                                <div className="col">
                                    <div style={{
                                        backgroundColor: 'orange',
                                        width: '80px',
                                        height: '50px',
                                        borderRadius: '6px',
                                        float: 'right',
                                        marginRight: '40px',
                                        cursor:"pointer"
                                    }}>
                                        <img src={shoppinCart} width="40" height="35" alt="ShoppingCart Icon"
                                             style={{float: "right", marginRight: '20px', marginTop: '10px'}}/>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    )
                })}


            </div>
        )
    }

}
