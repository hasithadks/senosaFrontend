import React, {Component} from "react";
import Cash_icon from "../Images/cash_icon.png";
import card_icon from "../Images/credit_card.png";
import master_card from "../Images/master_card.png";
import visa_card from "../Images/visa_card.png";


export default class OrderSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalAmount: 1750.,
            isCash: false,
            isCard: false,
        }

        this.onChangeCash = this.onChangeCash.bind(this);
        this.onChangeCard = this.onChangeCard.bind(this);
        this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
    }

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

    onChangeCardNumber(e){
        console.log("Card No : " + e.target.value)
        this.setState({
            cardNumber : e.target.value
        })
    }

    render() {
        return (
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
                                <h4>{this.state.totalAmount}</h4>
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
                                        <img className="img-thumbnail" src={visa_card} width="60" height="60"
                                             alt="Visa Card"
                                             style={{float: 'left', marginLeft: '20px', marginTop: '20px'}}/>


                                        <img className="img-thumbnail" src={master_card} width="60" height="60"
                                             alt="Master Card"
                                             style={{float: 'left', marginLeft: '20px', marginTop: '20px'}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label style={{marginLeft: '20px', marginTop: '20px', float: 'left'}}><span
                                            style={{color: 'red'}}>*</span>Card Number</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" className="form-control" required onChange={this.onChangeCardNumber}
                                               pattern="[]"
                                               style={{marginLeft: '20px', float: 'left', width:'95%'}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label style={{marginLeft: '20px', marginTop: '20px', float: 'left'}}><span
                                            style={{color: 'red'}}>*</span>Name on Card</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" className="form-control" required
                                               style={{marginLeft: '20px', float: 'left', width:'95%'}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label style={{marginLeft: '20px', marginTop: '20px', float: 'left'}}><span
                                            style={{color: 'red'}}>*</span>Expiration date</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="date" className="form-control" required
                                               style={{marginLeft: '20px', float: 'left', width:'95%'}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label style={{marginLeft: '20px', marginTop: '20px', float: 'left'}}><span
                                            style={{color: 'red'}}>*</span>cvv</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" className="form-control" required
                                               style={{marginLeft: '20px', float: 'left', width:'95%'}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="submit" className="btn" value="Pay Now" style={{
                                            backgroundColor: 'orange',
                                            marginTop: '20px',
                                            float: 'left',
                                            marginLeft: '20px',
                                            marginBottom: '20px',
                                            width:'95%'

                                        }}/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </form> :

                        <table style={{background: '#EDE7E7', padding: '20px', width: '85.2%'}}>
                            <tbody>
                            <tr>
                                <td>
                                    <p style={{padding: '20px', float: 'left'}}>You can pay in cash to our courier when
                                        you
                                        receive the goods at your doorstep.</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="submit" className="btn" value="Confirm Order"
                                           style={{backgroundColor: 'orange', margin: '20px', float: 'left'}}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    }
                </div>

            </div>
        );
    }
}
