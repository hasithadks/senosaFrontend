import React, { Component } from 'react'
import axios from "axios";

export default class PasswordChange extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            user_id: '',
            user_email : '',
            user_confirmPassword:'',
            user_password: '',
            user_Newpassword:'',
        };
    }

    componentDidMount() {
        if(localStorage.getItem('user_email') != null){
            axios.get('http://localhost:5000/userAccounts/username/'+ localStorage.getItem('user_email'))
                .then(response =>{
                    this.setState({
                        user_id : localStorage.getItem('user_id'),
                        user_email : localStorage.getItem('user_email'),
                        user_password : localStorage.getItem('user_password'),
                    })
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
        this.setState ({
            user_email : localStorage.getItem('user_email'),
            user_username : localStorage.getItem('user_username'),
        });
    }

    onChangeEmail(e){
        this.setState({
            user_email: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            user_password: e.target.value
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
                user_email: this.state.user_email,
                user_password: this.state.user_password,
                user_Newpassword: this.state.user_Newpassword,
            };

            if(this.state.user_Newpassword === this.state.user_confirmPassword){
                if (this.state.user_Newpassword.length > 5){
                    localStorage.setItem('user_email', this.state.user_email);
                    localStorage.setItem('user_password', this.state.user_Newpassword);

                    axios.put('http://localhost:5000/userAccounts/update/account/'+ this.state.user_email,user)
                        .then(res => {
                            window.location='/login';

                            axios.post('http://localhost:5000/userAccounts/logout/'+ localStorage.getItem('user_email'),user)
                                .then(response =>{
                                    this.setState({
                                        user: response.data
                                    });
                                });

                            localStorage.clear();
                        })
                        .catch(function (error) {
                            alert("Wrong Password");
                            window.location='/passwordchange';
                        });
                }else{
                    alert("Password should at least 6 characters");
                }
            }else{
                alert("Password not match");
            }

    }


    render() {
        return (

            <div className="container">
                <div style={{width:'70%', marginLeft:'15%'}}>
                    <hr/>
                    <h2>Password change</h2>
                    <hr/>
                </div>

                <form onSubmit={this.onSubmit}>
                    <table style={{width:'100%', marginLeft:'30%'}} className="col-12">
                        <tr>
                            <td style={{width:'auto'}}>
                                <div className="form-group">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" style={{float: 'left',marginLeft:'-5%'}}>Email</label>
                                    <div className="col-sm-5">
                                        <input type="email" className="form-control" id="inputEmail3" required placeholder="Email" disabled
                                               value={this.state.user_email}
                                               onChange={this.onChangeEmail}/>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{width:'auto'}}>
                                <div className="form-group">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" style={{float: 'left',marginLeft:'-4%'}}>Password</label>
                                    <div className="col-sm-5">
                                        <input type="password" className="form-control" id="inputPassword3" required placeholder="Password"
                                               value={this.state.user_password}
                                               onChange={this.onChangePassword}/>
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
                            <div className="form-group" style={{marginTop:'15px',marginLeft:'-31%'}}>
                                <div className="col-sm-12">
                                    <button type="submit" className="btn btn-primary">Password change</button>
                                </div>
                            </div>
                        </tr>
                    </table>
                </form>
            </div>

        )
    }
}