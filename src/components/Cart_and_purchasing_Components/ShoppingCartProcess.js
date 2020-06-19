import React, {Component} from "react";
import * as configs from "../../Config/config";
import {Link} from "react-router-dom";
import ProductImage from "../Images/tshirt.jpg";
import axios from "axios";
import Cash_icon from "../Images/cash_icon.png";
import card_icon from "../Images/credit_card.png";
import visa_card from "../Images/visa_card.png";
import master_card from "../Images/master_card.png";
import roundTo from "round-to";
import swal from "sweetalert";

export default class ShoppingCartProcess extends Component {

    constructor(props) {
        super(props);

        this.state = {
            delivery: 220,
            total: 0,
            userID: null,
            cartList: [],
            selectedItem: 0,
            is_item_checkbox: false,
            subTotal: 0,
            itemCount: 0,
            isDiscount: false,
            selectedItems: [],
            isSelectProcessOrder: false, //Delivery Details states
            provinces: [
                'Northern', 'North_Western', 'Western', 'North_Central',
                'Central', 'Sabaragamuwa', 'Eastern', 'Uva', 'Southern'
            ],
            Northern: ['Jaffna', 'Kilinochchi', 'Mannar', 'Mulativu', 'Vavuniya'],
            North_Western: ['Kurunegala', 'Puttalam'],
            Western: ['Colombo (1 - 15)', 'Colombo - Greater', 'Gampaha', 'Kalutara'],
            North_Central: ['Anuradhapura', 'Polonnaruwa'],
            Central: ['Kandy', 'Matale', 'Nuwara Eliya'],
            Sabaragamuwa: ['Kegalle', 'Rathnapura'],
            Eastern: ['Ampara', 'Batticaloa', 'Trincomalee'],
            Uva: ['Badulla', 'Monaragala'],
            Southern: ['Galle', 'Matara', 'Hambantota'],
            isProvinceSelected: false,
            districtsList: [],
            userId: '147',
            fullName: '',
            phoneNo: null,
            province: '',
            updateProvince: '',
            district: '',
            city: '',
            address: '',
            isOldClient: false,
            userDeliveryAddress: [],
            isSelectAddress: false,
            SelectAddressKey: 0,
            inputfields: false,
            detailsID: '',
            isFilledDeliveryDetails: false,  //Order Summery State
            isCash: false,
            isCard: false,
            isFinneshedProcess: false,
            cardNumber: 0,
            cardName: '',
            expiredate: '',
            cvv: 0,
            selectedImage : '',

        };
        //Shopping Cart Functions
        this.onSelectItem = this.onSelectItem.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickProceedOrder = this.onClickProceedOrder.bind(this);

        //Delivery Details Fuctions
        this.FindDistrict = this.FindDistrict.bind(this);
        this.SaveDeliveryDetails = this.SaveDeliveryDetails.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeDistrict = this.onChangeDistrict.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeProvince = this.onChangeProvince.bind(this);
        this.updateDeliveryDetails = this.updateDeliveryDetails.bind(this);

        //Order Summery Functions
        this.onChangeCash = this.onChangeCash.bind(this);
        this.onChangeCard = this.onChangeCard.bind(this);
        this.OnClickPayNow = this.OnClickPayNow.bind(this);
        this.OnClickConfirmOrder = this.OnClickConfirmOrder.bind(this);
        this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
        this.onChangeNameOnCard = this.onChangeNameOnCard.bind(this);
        this.onChangeExpireDate = this.onChangeExpireDate.bind(this);
        this.onChangeCVV = this.onChangeCVV.bind(this);

    }


    componentDidMount() {
        let userID = localStorage.getItem('user_id');

        if (userID != null) {
            axios.get(configs.BASE_URL + '/cart/' + userID)
                .then(response => {
                    this.setState({
                        cartList: response.data,
                        userID : userID
                    })

                });

            axios.get(configs.BASE_URL + '/deliveryDetails/' + userID)
                .then(response => {
                    if (response.data.length > 0) {
                        // console.log(JSON.stringify(response.data[0].province));

                        this.setState({
                                isOldClient: true,
                                userDeliveryAddress: response.data,
                                fullName: response.data[0].fullName,
                                updateProvince: response.data[0].province,
                                phoneNo: response.data[0].phoneNo,
                                district: response.data[0].district,
                                city: response.data[0].city,
                                address: response.data[0].address,
                                detailsID: response.data[0]._id
                            },
                            () => {

                            });

                    }
                })
        }

    }

    //=======================================Shopping Cart Functions====================================================

    onSelectItem(e) {

        let data = JSON.parse(e.target.id);
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
            Total = roundTo(Number(subTotal + Delivery), 2);
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
            console.log(temarr);

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

        if (tempArray.length > 0) {
            this.setState({
                isSelectProcessOrder: true
            })
        } else {
            //alert("Please Select Item !!!")
            swal("Empty!!!", "Please Select Item !!!", "warning");
        }


    }

    onClickDelete(e) {
        let Id = e.target.id;
        console.log("index :" + Id);

        axios.delete(configs.BASE_URL + '/cart/delete/' + Id)
            .then(response => {
                swal("Success!", "Item Remove from cart", "success");
                //alert(response.data);
                this.componentDidMount();

            });
    }

//=============================================================Delivery Details Functions===============================================//

    SaveDeliveryDetails(e) {

        e.preventDefault();

        console.log("user ID Delivery Details : " + this.state.userID );
        console.log("Phone No Delivery Details : " + this.state.phoneNo );
        console.log("Full Name Delivery Details : " + this.state.fullName );
        console.log("District Delivery Details : " + this.state.district );
        console.log("city Delivery Details : " + this.state.city );
        console.log("address Delivery Details : " + this.state.address );

        if(this.state.phoneNo !== null && this.state.fullName !== '' && this.state.city !== '' && this.state.city !== '' && this.state.address !== ''){

            let {userID, fullName, phoneNo, province, district, city, address} = this.state;

            let payload = {userID, fullName, phoneNo, province, district, city, address};

            axios.post(configs.BASE_URL + '/deliveryDetails/add', payload)
                .then(() => swal("Success!", "Delivery Details Saved", "success"));

            this.setState({
                isFilledDeliveryDetails: true
            })

        }
        else {
            swal("Empty!!!", "Please fill All Fields", "warning");
        }
    }

    FindDistrict(value) {

        this.setState({
                isProvinceSelected: true,
                province: value

            }, () => {
                let Northern = this.state[value]
                this.setState({
                        districtsList: Northern
                    },
                    () => {
                        console.log(this.state.districtsList)
                    });
            }
        )

    }

    updateDeliveryDetails() {
        //alert("Update Method call");
        let {userID, fullName, phoneNo, updateProvince, district, city, address} = this.state;
        let payload = {userID, fullName, phoneNo, updateProvince, district, city, address};

        axios.post('http://localhost:5000/deliveryDetails/update/' + this.state.detailsID, payload)
            .then(res => console.log(res.data));

        this.setState({
            isFilledDeliveryDetails: true
        })
    }

    onChangeName(e) {
        this.setState({
            fullName: e.target.value
        });
    }

    onChangeProvince(e) {
        this.setState({
            updateProvince: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangePhoneNumber(e) {
        this.setState({
            phoneNo: e.target.value
        });
    }

    onChangeDistrict(e) {
        this.setState({
            district: e.target.value
        });
    }

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }

    //======================================Order Summeru Fuctions======================================================

    onChangeCash() {
        this.setState({
            isCash: true,
            isCard: false,
        })
    }

    onChangeCard() {
        this.setState({
            isCash: false,
            isCard: true,
        })
    }

    OnClickPayNow() {

        if (!(this.state.cardNumber > 0 || this.state.cardNumber === '' || this.state.cardName === '' || this.state.expiredate === '' || this.state.cvv === '')) {


            let tempArray = this.state.selectedItems;
            console.log("tempArray : Item :");
            console.log(tempArray);
            if (tempArray.length > 0) {
                tempArray.forEach(item => {

                    axios.post(configs.BASE_URL + '/soldProducts/add', item)
                        .then();

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
                                item_quantity: item_quantity
                            };

                            axios.put('http://localhost:5000/quantity/update/itemQuantity/' + item.quantities_id, payload)
                                .then(res => console.log(res.data));
                        });
                    this.componentDidMount();
                    window.location.reload()
                })


            }
        }
        else {
            swal("Empty!!!", "Please fill All Fields", "warning");
        }

    }

    OnClickConfirmOrder() {

        let tempArray = this.state.selectedItems;
        console.log("tempArray : Item :");
        console.log(tempArray);
        if (tempArray.length > 0) {
            tempArray.forEach(item => {

                axios.post(configs.BASE_URL + '/soldProducts/add', item)
                    .then();

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
                            item_quantity: item_quantity
                        };

                        axios.put('http://localhost:5000/quantity/update/itemQuantity/' + item.quantities_id, payload)
                            .then(res => console.log(res.data));
                    });
                this.componentDidMount();
            })
        }
    }

    onChangeCardNumber(e) {
        console.log("Card No : " + e.target.value)
        this.setState({
            cardNumber: e.target.value
        })
    }

    onChangeNameOnCard(e) {
        this.setState({
            cardName: e.target.value
        })
    }

    onChangeExpireDate(e) {
        this.setState({
            expiredate: e.target.value
        })
    }

    onChangeCVV(e) {
        this.setState({
            cvv: e.target.value
        })
    }

    render() {
        return (
            //=============== Shopping Cart ====================
            <div>
                {this.state.isSelectProcessOrder === false ?
                    <div className="container"
                         style={{backgroundColor: '#ECECEC', padding: '20px', marginBottom: '10px'}}>
                        <div className="row">
                            <div className="col-7"
                                 style={{backgroundColor: "white", padding: '20px', marginLeft: '30px'}}>
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
                                                <input type="checkbox" className="form-check"
                                                       value={data.discounted_price}
                                                       name={data.requested_qty} id={JSON.stringify(data)}
                                                       style={{float: 'left', marginTop: '25px'}}
                                                       onClick={this.onSelectItem}/>
                                            </div>
                                            <div className="col-7" style={{marginLeft: '-5px'}}>
                                                <div className="row">
                                                    <div className="col-3">
                                                        <img src={require('../uploads/' + data.selectedImage)} width="80" height="90"
                                                             alt="Product Image"
                                                             style={{float: 'left'}}/>
                                                    </div>
                                                    <div className="col-9">
                                                        <div className="row" style={{marginLeft:'10px'}}>
                                                            <span>Product name</span>
                                                        </div>
                                                        <div className="row" style={{marginLeft:'10px'}}>
                                                            <span
                                                                style={{fontSize: '12px'}}>Size : {data.item_size}</span>
                                                        </div>
                                                        <div className="row" style={{marginLeft:'10px'}}>
                                                        <span
                                                            style={{fontSize: '12px'}}>Color : {data.item_color}</span>
                                                        </div>
                                                        <div className="row" style={{marginLeft:'10px'}}>
                                                        <span
                                                            style={{fontSize: '12px'}}>Qty : {data.requested_qty}</span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="row">
                                            <span style={{
                                                fontSize: '20px',
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
                            <div className="col-4"
                                 style={{backgroundColor: "white", padding: '20px', marginLeft: '30px'}}>
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
                                        <span style={{
                                            float: "right",
                                            marginRight: '5px'
                                        }}>Rs. {this.state.subTotal}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <span style={{float: "left", marginLeft: '0px'}}>Delivery Fee</span>
                                    </div>
                                    <div className="col">
                                        <span style={{
                                            float: "right",
                                            marginRight: '5px'
                                        }}>Rs. {this.state.delivery}</span>
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
                    :   //============ Delivery Details ===================
                    <div>
                        {this.state.isSelectProcessOrder === true && this.state.isFilledDeliveryDetails === false ?
                            <div className="container">
                                <hr/>
                                <h3>Delivery Information</h3>
                                <hr/>

                                {this.state.isOldClient === false ?
                                    //======================================= First Time============================================================
                                    <form>
                                        <table style={{width: '80%', marginLeft: '10%'}}>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <label
                                                        style={{marginLeft: '20px', float: 'left', marginTop: '20px'}}>Full
                                                        Name</label>
                                                    <br/>
                                                    <input type="text" onChange={this.onChangeName}
                                                           style={{marginLeft: '20px', float: 'left',width:'90%'}}
                                                           placeholder="Enter your first and last name"
                                                           className="form-control"/>
                                                </td>
                                                <td>
                                                    <label
                                                        style={{
                                                            marginLeft: '20px',
                                                            float: 'left',
                                                            marginTop: '20px'
                                                        }}>Provinces</label>
                                                    <br/>
                                                    <select className="form-control"
                                                            style={{
                                                                marginLeft: '20px',
                                                                float: 'left',
                                                                fontColor: 'black',
                                                                width:'90%'
                                                            }}
                                                            onChange={e => this.FindDistrict(e.target.value)}>
                                                        <option value="" disabled selected>Please select your Provinces
                                                        </option>
                                                        {this.state.provinces.map((prov) => <option key={prov}
                                                                                                    value={prov}>{prov}</option>)}

                                                    </select>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label
                                                        style={{marginLeft: '20px', float: 'left', marginTop: '20px'}}>Phone
                                                        Number</label>
                                                    <br/>
                                                    <input type="text" style={{marginLeft: '20px', float: 'left',width:'90%'}}
                                                           onChange={this.onChangePhoneNumber}
                                                           placeholder="Enter your phone number "
                                                           className="form-control"/>
                                                </td>
                                                <td>
                                                    <label
                                                        style={{
                                                            marginLeft: '20px',
                                                            float: 'left',
                                                            marginTop: '20px'
                                                        }}>District</label>
                                                    <br/>
                                                    <select className="form-control" onChange={this.onChangeDistrict}
                                                            style={{
                                                                marginLeft: '20px',
                                                                float: 'left',
                                                                fontColor: 'black',width:'90%'
                                                            }}
                                                            disabled={!this.state.isProvinceSelected}>
                                                        <option value="" disabled selected>Please select your District
                                                        </option>
                                                        {this.state.districtsList && this.state.districtsList.map((prov) =>
                                                            <option
                                                                key={prov} value={prov}>{prov}</option>)}

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label style={{
                                                        marginLeft: '20px',
                                                        float: 'left',
                                                        marginTop: '20px'
                                                    }}>City</label>
                                                    <br/>
                                                    <input type="text" required style={{marginLeft: '20px', float: 'left',width:'90%'}}
                                                           onChange={this.onChangeCity}
                                                           placeholder="Enter your City" className="form-control" />
                                                </td>
                                                <td>
                                                    <label
                                                        style={{
                                                            marginLeft: '20px',
                                                            float: 'left',
                                                            marginTop: '20px'
                                                        }}>Address</label>
                                                    <br/>
                                                    <input type="text" style={{marginLeft: '20px', float: 'left',width:'90%'}}
                                                           onChange={this.onChangeAddress}
                                                           placeholder="Ex: Home#, street Name, Main road"
                                                           className="form-control" required/>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>
                                                    <a type="submit" onClick={this.SaveDeliveryDetails}
                                                       className="profile-edit-btn nav-link  btn btn-primary"
                                                       name="btnAddMore"
                                                       value="Proceed to Pay" style={{
                                                        float: 'Right',
                                                        marginRight: '27px',
                                                        marginTop: '30px',
                                                        marginBottom: '20px',
                                                        width: 'auto',

                                                    }}>
                                                        Save & Proceed Order
                                                    </a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </form> :
                                    // ===========================================if registerd Custormer=========================================================
                                    <form>
                                        <table style={{width: '80%', marginLeft: '10%'}}>
                                            <thead>

                                            <a type="submit"
                                               className="profile-edit-btn nav-link" name="btnAddMore"
                                               value="diferent Details" style={{
                                                float: 'left',
                                                marginLeft: '5px'
                                            }}>
                                                Change Details
                                            </a>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <label
                                                        style={{marginLeft: '20px', float: 'left', marginTop: '20px'}}>Full
                                                        Name</label>
                                                    <br/>
                                                    <input type="text"
                                                           onChange={this.onChangeName}
                                                           value={this.state.fullName}
                                                           style={{marginLeft: '20px', float: 'left',width:'90%'}}
                                                           className="form-control"/>
                                                </td>
                                                <td>
                                                    <label
                                                        style={{
                                                            marginLeft: '20px',
                                                            float: 'left',
                                                            marginTop: '20px'
                                                        }}>Provinces</label>
                                                    <br/>

                                                    <input type="text" type="text"
                                                           onChange={this.onChangeProvince}
                                                           value={this.state.updateProvince}
                                                           style={{marginLeft: '20px', float: 'left',width:'90%'}}
                                                           className="form-control"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label
                                                        style={{marginLeft: '20px', float: 'left', marginTop: '20px'}}>Phone
                                                        Number</label>
                                                    <br/>
                                                    <input type="text" style={{marginLeft: '20px', float: 'left',width:'90%'}}
                                                           onChange={this.onChangePhoneNumber}
                                                           value={this.state.phoneNo}
                                                           type="text"
                                                           className="form-control"/>
                                                </td>
                                                <td>
                                                    <label
                                                        style={{
                                                            marginLeft: '20px',
                                                            float: 'left',
                                                            marginTop: '20px'
                                                        }}>District</label>
                                                    <br/>


                                                    <input type="text" type="text"
                                                           onChange={this.onChangeDistrict}
                                                           value={this.state.district}
                                                           style={{marginLeft: '20px', float: 'left',width:'90%'}}
                                                           className="form-control"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label style={{
                                                        marginLeft: '20px',
                                                        float: 'left',
                                                        marginTop: '20px'
                                                    }}>City</label>
                                                    <br/>
                                                    <input type="text" style={{marginLeft: '20px', float: 'left',width:'90%'}}
                                                           onChange={this.onChangeCity}
                                                           value={this.state.city}
                                                           type="text"
                                                           className="form-control"/>
                                                </td>
                                                <td>
                                                    <label
                                                        style={{
                                                            marginLeft: '20px',
                                                            float: 'left',
                                                            marginTop: '20px'
                                                        }}>Address</label>
                                                    <br/>
                                                    <input type="text" style={{marginLeft: '20px', float: 'left',width:'90%'}}
                                                           id="addressID"
                                                           onChange={this.onChangeAddress}
                                                           value={this.state.address}
                                                           className="form-control"/>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>
                                                    <a href="#" type="submit" onClick={this.updateDeliveryDetails}
                                                       className="profile-edit-btn nav-link  btn btn-primary"
                                                       name="btnAddMore"
                                                       value="Proceed to Pay" style={{
                                                        float: 'Right',
                                                        marginRight: '25px',
                                                        marginTop: '30px',
                                                        marginBottom: '20px'
                                                    }}>
                                                        Proceed Order
                                                    </a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                    </form>

                                }
                            </div>
                            : //==================================================Order Summery ========================================
                            <div>

                                <div className="container">
                                    <div className="row">
                                        <div className="col-2">
                                            <img className="img-thumbnail" src={Cash_icon} width="100" height="100"
                                                 alt="Cash on Delivery" onClick={this.onChangeCash}/>
                                            <label>Cash On Delivery</label>
                                        </div>
                                        <div className="col-2">
                                            <img className="img-thumbnail" src={card_icon} width="100" height="100"
                                                 alt="Cash on Delivery" onClick={this.onChangeCard}/>
                                            <label>Credit Cards</label>
                                        </div>
                                        <div className="col-6" style={{background: '#EDE7E7', padding: '20px'}}>
                                            <h3>Order Summary</h3>
                                            <hr/>
                                            <div className="row">
                                                <div className="col">
                                                    <h4 style={{float: 'left'}}>Total Amount :</h4>
                                                </div>
                                                <div className="col">
                                                    <h4 style={{float: 'left', marginLeft: '20px'}}>
                                                        <span>Rs. {this.state.total}</span></h4>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="container">
                                        {this.state.isCard === true ?
                                            <form>
                                                <table style={{background: '#EDE7E7', padding: '20px', width: '85.2%'}}>
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <img className="img-thumbnail" src={visa_card} width="60"
                                                                 height="60"
                                                                 alt="Visa Card"
                                                                 style={{
                                                                     float: 'left',
                                                                     marginLeft: '20px',
                                                                     marginTop: '20px'
                                                                 }}/>


                                                            <img className="img-thumbnail" src={master_card} width="60"
                                                                 height="60"
                                                                 alt="Master Card"
                                                                 style={{
                                                                     float: 'left',
                                                                     marginLeft: '20px',
                                                                     marginTop: '20px'
                                                                 }}/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label style={{
                                                                marginLeft: '20px',
                                                                marginTop: '20px',
                                                                float: 'left'
                                                            }}><span
                                                                style={{color: 'red'}}>*</span>Card Number</label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="text" className="form-control" required
                                                                   onChange={this.onChangeCardNumber}
                                                                   style={{
                                                                       marginLeft: '20px',
                                                                       float: 'left',
                                                                       width: '95%'
                                                                   }}/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label style={{
                                                                marginLeft: '20px',
                                                                marginTop: '20px',
                                                                float: 'left'
                                                            }}><span
                                                                style={{color: 'red'}}>*</span>Name on Card</label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="text" className="form-control" required
                                                                   onChange={this.onChangeNameOnCard}
                                                                   style={{
                                                                       marginLeft: '20px',
                                                                       float: 'left',
                                                                       width: '95%'
                                                                   }}/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label style={{
                                                                marginLeft: '20px',
                                                                marginTop: '20px',
                                                                float: 'left'
                                                            }}><span
                                                                style={{color: 'red'}}>*</span>Expiration date</label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="date" className="form-control" required
                                                                   onChange={this.onChangeExpireDate}
                                                                   style={{
                                                                       marginLeft: '20px',
                                                                       float: 'left',
                                                                       width: '95%'
                                                                   }}/>

                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label style={{
                                                                marginLeft: '20px',
                                                                marginTop: '20px',
                                                                float: 'left'
                                                            }}><span
                                                                style={{color: 'red'}}>*</span>cvv</label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="text" className="form-control" required
                                                                   onChange={this.onChangeCVV}
                                                                   style={{
                                                                       marginLeft: '20px',
                                                                       float: 'left',
                                                                       width: '95%'
                                                                   }}/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {/*<input type="submit" className="btn" value="Pay Now" onClick={this.OnClickPayNow}*/}
                                                            {/*       style={{*/}
                                                            {/*           backgroundColor: 'orange',*/}
                                                            {/*           marginTop: '20px',*/}
                                                            {/*           float: 'left',*/}
                                                            {/*           marginLeft: '20px',*/}
                                                            {/*           marginBottom: '20px',*/}
                                                            {/*           width: '95%'*/}

                                                            {/*       }}/>*/}

                                                            <Link className="btn btn-primary"
                                                                  style={{
                                                                      backgroundColor: 'orange',
                                                                      marginTop: '20px',
                                                                      float: 'left',
                                                                      marginLeft: '20px',
                                                                      marginBottom: '20px',
                                                                      width: '95%'
                                                                  }} onClick={this.OnClickPayNow}>Pay Now</Link>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </form> :

                                            <table style={{background: '#EDE7E7', padding: '20px', width: '85.2%'}}>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <p style={{padding: '20px', float: 'left'}}>You can pay in cash
                                                            to our courier when
                                                            you
                                                            receive the goods at your doorstep.</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        {/*<input type="submit" className="btn" value="Confirm Order" onClick={this.OnClickConfirmOrder}*/}
                                                        {/*       style={{*/}
                                                        {/*           backgroundColor: 'orange',*/}
                                                        {/*           margin: '20px',*/}
                                                        {/*           float: 'left'*/}
                                                        {/*       }}/>*/}

                                                        <Link className="btn btn-primary" to={"/SuccessMessage/"}
                                                              style={{
                                                                  backgroundColor: 'orange',
                                                                  margin: '20px',
                                                                  float: 'left',
                                                                  borderColor: 'orange'
                                                              }} onClick={this.OnClickConfirmOrder}>Confirm Order</Link>

                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        }
                                    </div>

                                </div>

                            </div>

                        }

                    </div>
                }
            </div>

        );
    }


}
