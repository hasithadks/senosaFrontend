import React, {Component} from "react";
import deleteIcon from "../Images/delete_icon.png";
import axios from "axios";
import * as configs from "../../Config/config";
import ProductImage from "../Images/tshirt.jpg";
import {forEach} from "react-bootstrap/cjs/ElementChildren";
import {Link} from "react-router-dom";


export default class ShoppingCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            delivery: 220,
            total: 0,
            userID: "4787",
            cartList: [],
            selectedItem: 0,
            is_item_checkbox: false,
            subTotal: 0,
            itemCount: 0,
            isDiscount: false,
            selectedItems: []

        };
        // this.calculateTotal = this.calculateTotal.bind(this);
        this.onSelectItem = this.onSelectItem.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickProceedOrder = this.onClickProceedOrder.bind(this);
    }

    componentDidMount() {
        axios.get(configs.BASE_URL + '/cart/' + this.state.userID)
            .then(response => {
                this.setState({
                    cartList: response.data
                })

            });

    }

    onSelectItem(e) {

        let data =JSON.parse(e.target.id);
        let isChecked = e.target.checked;
        let value = Number(e.target.value);
        let qty = Number(e.target.name);
        //  console.log("Selected Name :" + selectedName);
      //  console.log("Index :" + selecteID);
      //  console.log("Qty :" + qty);
        console.log(data);
        let table_id = data._id;
        console.log("Table ID :" + table_id);

        let itemCount = this.state.itemCount;
        let Total = this.state.total;
        let Delivery = this.state.delivery;
        let qtyPrice = Number(value * qty);
        let subTotal = Number(this.state.subTotal);

        if (isChecked === true) {

            subTotal = Number(subTotal + qtyPrice);
            Total = Number(subTotal + Delivery);
            itemCount = Number(itemCount + 1);

            let temarr = this.state.selectedItems;
            temarr.push(data);

            this.setState({
                subTotal: subTotal,
                total: Total,
                itemCount: itemCount,
                selectedItems: temarr,

            })
            console.log("After foreach Add: " + temarr);
        } else {
            // let subTotal = this.state.subTotal;
            subTotal = Number(subTotal - qtyPrice);
            Total = Number(subTotal + Delivery);
            itemCount = Number(itemCount - 1);
            let temarr = this.state.selectedItems;
            temarr.forEach((td, index) => {
                if (td._id === data._id) {
                    temarr.splice(index, 1);
                }
            })
            console.log( temarr);

            this.setState({
                subTotal: subTotal,
                total: Total,
                itemCount: itemCount,
                selectedItems: temarr,
            })

        }

    }

    onClickProceedOrder() {

        let tempArray = this.state.selectedItems;
        console.log("tempArray : Item :");
        console.log(tempArray);
        if(tempArray.length > 0 ){
            tempArray.forEach(item => {

                axios.post(configs.BASE_URL + '/soldProduct/add', item)
                    .then(console.log("Add to DB!!!"));

                axios.delete(configs.BASE_URL + '/cart/delete/' + item._id)
                    .then(response => {
                        console.log("Delete From DB!!!")
                    });

                axios.get('http://localhost:5000/quantity/qty/' + item.quantities_id)
                    .then(response => {
                        console.log("Quantities id send and get Data");
                        console.log(response.data);
                        console.log(response.data.item_quantity);
                        let item_quantity = response.data.item_quantity;
                        console.log("Item qty : " + item_quantity);
                        item_quantity = item_quantity - item.requested_qty;
                        console.log("Updated qty : " + item_quantity);
                        let payload = {
                            item_quantity : item_quantity
                        }

                         axios.put('http://localhost:5000/quantity/update/itemQuantity/'+item.quantities_id,payload)
                             .then(res => console.log(res.data));
                    });
                this.componentDidMount();
            })


        }

    }

    onClickDelete(e) {
        let Id = e.target.id;
        console.log("index :" + Id);

        axios.delete(configs.BASE_URL + '/cart/delete/' + Id)
            .then(response => {
                alert(response.data);
                this.componentDidMount();

            });
    }

    render() {
        return (

            <div className="container" style={{backgroundColor: '#ECECEC', padding: '20px', marginBottom: '10px'}}>
                <div className="row">
                    <div className="col-7" style={{backgroundColor: "white", padding: '20px', marginLeft: '30px'}}>
                        <hr/>
                        <div className="row">
                            <div className="col">
                                <h3>Shopping Cart</h3>
                            </div>
                        </div>

                        <hr/>
                        {this.state.cartList.map((data, index) => {
                            return (
                                <div className="row">
                                    <div className="col-1">
                                        <input type="checkbox" className="form-check" value={data.discounted_price}
                                               name={data.requested_qty} id={JSON.stringify(data) }
                                               style={{float: 'left', marginTop: '25px'}}
                                               onClick={this.onSelectItem}/>
                                    </div>
                                    <div className="col-8" style={{marginLeft: '-5px'}}>
                                        <div className="row">
                                            <div className="col-3">
                                                <img src={ProductImage} width="80" height="90" alt="Product Image"
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
                                                    <span style={{fontSize: '12px'}}>Color : {data.item_color}</span>
                                                </div>
                                                <div className="row">
                                                    <span style={{fontSize: '12px'}}>Qty : {data.requested_qty}</span>
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
                                    <div className="col-1">
                                        <span className="mx-1 text-danger fas fa-trash text-black-50" id={data._id}
                                              style={{marginTop: '10px'}} onClick={this.onClickDelete}> </span>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className="col-4" style={{backgroundColor: "white", padding: '20px', marginLeft: '30px'}}>
                        <div className="row">
                            <h3 style={{float: "left", marginLeft: '15px'}}>Order Summary</h3>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span style={{
                                    float: "left",
                                    marginLeft: '0px'
                                }}>SubTotal ({this.state.itemCount} item/s)</span>
                            </div>
                            <div className="col">
                                <span style={{float: "right", marginRight: '5px'}}>Rs. {this.state.subTotal}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span style={{float: "left", marginLeft: '0px'}}>Delivery Fee</span>
                            </div>
                            <div className="col">
                                <span style={{float: "right", marginRight: '5px'}}>Rs. {this.state.delivery}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span style={{float: "left", marginLeft: '0px'}}>Total</span>
                            </div>
                            <div className="col">
                                <span style={{
                                    float: "right",
                                    marginRight: '5px'
                                }}>Rs.{this.state.subTotal === 0 ? 0 : this.state.total} </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {/*<a href="#" type="submit"*/}
                                {/*   className="profile-edit-btn nav-link  btn btn-primary" name="btnAddMore"*/}
                                {/*   value="Proceed to Pay" style={{*/}
                                {/*    float: 'Right',*/}
                                {/*    marginRight: '0px',*/}
                                {/*    marginTop: '20px',*/}
                                {/*    marginBottom: '20px'*/}
                                {/*}}>*/}
                                {/*    Proceed Order*/}
                                {/*</a>*/}

                                <Link className="btn btn-primary"
                                      style={{float: 'Right', marginTop: '20px', marginBottom: '20px'}}
                                      onClick={this.onClickProceedOrder}
                                      // to={"/deliveryDetails/" + this.state.total}
                                > Proceed Order</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}
