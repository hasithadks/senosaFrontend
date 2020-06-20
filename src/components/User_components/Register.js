import React, { Component } from 'react'
import axios from 'axios';

export default class Register extends Component {
constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeBYear = this.onChangeBYear.bind(this);
    this.onChangeBMonth = this.onChangeBMonth.bind(this);
    this.onChangeBDay = this.onChangeBDay.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        user_email:'',
        user_username:'',
        user_password:'',
        user_phone:'',
        user_gender:'',
        user_image:'',
        user_b_year:'',
        user_b_month:'',
        user_b_day:'',

        user_role:'',
        users:[],
    }
}

    onChangeEmail(e){
        this.setState({
            user_email: e.target.value
        });
    }

    onChangeUsername(e){
        this.setState({
            user_username: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            user_password: e.target.value
        });
    }

    onChangePhone(e){
        this.setState({
            user_phone: e.target.value
        });
    }

    onChangeGender(e){
        this.setState({
            user_gender: e.target.value
        });
    }

    onChangeImage(e){
        this.setState({
            user_image: e.target.value
        });
    }

    onChangeBYear(){
        this.setState({
            user_b_year: null
        });
    }

    onChangeBMonth(){
        this.setState({
            user_b_month: null
        });
    }

    onChangeBDay(){
        this.setState({
            user_b_day: null
        });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            user_email: this.state.user_email,
            user_username: this.state.user_username,
            user_phone: this.state.user_phone,
            user_gender: this.state.user_gender,
            user_image: this.state.user_image,
            user_b_year: this.state.user_b_year,
            user_b_month: this.state.user_b_month,
            user_b_day: this.state.user_b_day
        }

        const account = {
            user_username: this.state.user_email,
            user_password: this.state.user_password,
            user_role: 'Customer'
        }

        if (this.state.user_phone.length >= 9 && this.state.user_phone.length <= 10  ){
            if (this.state.user_username.length > 5){
                if (this.state.user_password.length>5){

                    axios.post('https://senosaonlineshoppingwebsite.herokuapp.com/users/add',user)
                        .then(response =>{
                            this.setState({
                                users: response.data,
                            });
                        });

                    axios.post('https://senosaonlineshoppingwebsite.herokuapp.com/userAccounts/add',account)
                        .then(response =>{
                            this.setState({
                                users: response.data,
                            });
                            window.location='/login';
                        })
                        .catch(function (error) {
                            console.log(error);
                            alert("Email already use");
                            window.location='/register';
                        });
                }else{
                    alert("Password should at least 6 characters")
                }
            }else{
                alert("User name should be at least 6 characters");
            }
        }else{
            alert("Phone number is invalid");
        }

    }

    render() {
        return (

            <div className="container">
                <div style={{width:'75%', marginLeft:'12%',marginTop:'4%',marginBottom:'75px'}}>
                <hr/>
                <h1>Register</h1>
                <hr/>

            <form onSubmit={this.onSubmit}>
                <table style={{width:'100%'}}>
                    <tbody>
                        <tr>
                            <td style={{width:'40%'}}>
                                <div className="form-group">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" style={{float: 'left'}}>Phone</label>
                                    <div className="col-sm-12">
                                        <input type="numbers" className="form-control" id="input" required placeholder="Phone"
                                               value={this.state.user_phone}
                                               onChange={this.onChangePhone}
                                        />
                                    </div>
                                </div>
                            </td>
                            <td style={{width:'60%'}}>
                                <div className="form-group">
                                    <label htmlFor="inputUserName" className="col-sm-2 col-form-label" style={{float: 'left'}}>Name</label>
                                    <div className="col-sm-12">
                                        <input type="Text" className="form-control" id="inputUserName" required placeholder="User Name"
                                               value={this.state.user_username}
                                               onChange={this.onChangeUsername}
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td style={{width:'40%'}}>
                                <div className="form-group">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" style={{float: 'left'}}>Password</label>
                                    <div className="col-sm-12">
                                        <input type="password" className="form-control" id="inputPassword3" required placeholder="Password"
                                               value={this.state.user_password}
                                               onChange={this.onChangePassword}
                                        />
                                    </div>
                                </div>
                            </td>

                            <td style={{width:'60%'}}>
                                <div className="form-group">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" style={{float: 'left'}}>Email</label>
                                    <div className="col-sm-12">
                                        <input type="email" className="form-control" id="inputEmail3" required placeholder="Email"
                                               value={this.state.user_email}
                                               onChange={this.onChangeEmail}
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td style={{width:'40%'}}>
                                <div className="form-group">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" style={{float: 'left'}}>Gender</label>
                                    <div className="col-sm-12">
                                    <select className="browser-default custom-select" style={{height:'32px'}}
                                            value={this.state.user_gender}
                                            onChange={this.onChangeGender}>
                                        <option value="" disabled selected>Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    </div>
                                </div>
                            </td>

                            <td style={{width:'60%'}}>
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <div className="checkbox">
                                            <label style={{float: 'left',fontSize:'12px',marginTop:'10px'}}><input type="checkbox" name="remember" required/>By clicking "SIGN UP" I agree to Privacy Policy</label>
                                        </div>
                                        <button type="submit" className="btn-primary" style={{width:'100%',textAlign:"center",borderRadius:"10px",height:'30px'}}>Sign Up</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            </div>
            </div>
        )

    }

}
