import React, {Component} from "react";
import logo from "../Images/fashionstorelogo.png";


export default class SuccessMessage extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="container" style={{backgroundColor:"#ECECEC", padding:'20px',marginBottom: '20px'}}>
                <div className="row" style={{backgroundColor:"white", margin:'20px'}}>
                    <div className="col" style={{ margin:'30px'}}>
                        <span>Your Order is Submitted!!! </span>
                        <br/>
                        <span>Your Oder reference is email to you and please check the mails and your order will deliver within 3 days</span>
                        <br/>
                        <span>Thanks,</span>
                        <br/>
                        <span>Online Fashion Store Team</span>
                        <br/>
                        <img className="img-thumbnail" src={logo} width="200" height="50"
                             alt="logo" />
                    </div>
                </div>
            </div>
        );
    }

}
