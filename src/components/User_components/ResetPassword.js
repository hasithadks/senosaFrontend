import React, { Component } from 'react'
import axios from "axios";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            user_id: '',
            user_email : '',
            user_Newpassword:'',
            user_confirmPassword:'',
        };
    }

    onChangeEmail(e){
        this.setState({
            user_email: e.target.value
        });
    }
    onChangeNewPassword(e){
        this.setState({
            user_Newpassword: e.target.value
        });
    }
    onChangeConfirmPassword(e){
        this.setState({
            user_confirmPassword : e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();

        const user = {
            user_Newpassword: this.state.user_Newpassword,
        };

        if(this.state.user_Newpassword === this.state.user_confirmPassword){
            if (this.state.user_Newpassword > 5){
                axios.put('http://localhost:5000/userAccounts/reset/' + this.state.user_email,user)
                    .then(res => console.log((res.data)));

                alert("Check your email");
                window.location='/login';
            }else{
                alert("Password should at least 6 characters");
            }
        }else{
            alert("Not match");
        }
    }


    render() {
        return (

            <div className="container">
                <div style={{width:'70%', marginLeft:'15%'}}>
                    <hr/>
                    <h2>Reset Password</h2>
                    <hr/>
                </div>

                <form onSubmit={this.onSubmit}>
                    <table style={{width:'100%', marginLeft:'30%'}} className="col-12">
                        <tr>
                            <td style={{width:'auto'}}>
                                <div className="form-group">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" style={{float: 'left',marginLeft:'-5%'}}>Email</label>
                                    <div className="col-sm-5">
                                        <input type="email" className="form-control" id="inputEmail3" required placeholder="Email"
                                               value={this.state.user_email}
                                               onChange={this.onChangeEmail}/>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{width:'auto'}}>
                                <div className="form-group">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" style={{float: 'left',marginLeft:'-3%'}}>New Password</label>
                                    <div className="col-sm-5">
                                        <input type="password" className="form-control" id="inputPassword3" required placeholder="New Password"
                                               value={this.state.user_Newpassword}
                                               onChange={this.onChangeNewPassword}/>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{width:'auto'}}>
                                <div className="form-group">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" style={{float: 'left',marginLeft:'-2%'}}>Confirm password</label>
                                    <div className="col-sm-5">
                                        <input type="password" className="form-control" id="inputPassword3" required placeholder="Confirm password"
                                               value={this.state.user_confirmPassword}
                                               onChange={this.onChangeConfirmPassword}/>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <div className="form-group" style={{marginTop:'15px',marginLeft:'-30%'}}>
                                <div className="col-sm-12">
                                    <button type="submit" className="btn btn-primary">Send Request</button>
                                </div>
                            </div>
                        </tr>
                    </table>
                </form>
            </div>

        )
    }
}