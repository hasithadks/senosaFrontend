import React, {Component} from "react";
import axios from "axios";

const  User = props =>(
    localStorage.clear(),
    localStorage.setItem('user_id',props.user._id),
    localStorage.setItem('user_username',props.user.user_username),
    localStorage.setItem('user_password',props.user.user_password),
    <span style={{color:"black"}}> </span>
);

export default class Login extends Component{
     constructor(props) {
         super(props);
         this.onChangeUserName = this.onChangeUserName.bind(this);
         this.onChangePassword = this.onChangePassword.bind(this);
         this.onSubmit = this.onSubmit.bind(this);

         this.state ={
             user_id:'',
             user_password:'',
             user_username : '',
             user:[],
         }
    }

    onChangeUserName(e){
        this.setState({
            user_username :e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            user_password :e.target.value
        });
    }

    usertList(){
        return this.state.user.map(currentTodo => {
            return <User user ={currentTodo} key={currentTodo._id}/>
        });
    }

    onSubmit(e){
        e.preventDefault(e);

        this.usertList();
        const detail = {
            user_username: this.state.user_email,
            user_password: this.state.user_password,
        }

            axios.post('https://senosaonlineshoppingwebsite.herokuapp.com/userAccounts/username/'+ this.state.user_username,detail)
                .then(response =>{
                    window.location='/home';
                    this.setState({
                        user: response.data
                    });
                })
                .catch(function (error) {
                    console.log(error);
                    alert("Login fail");
                    window.location='/login';
                });
    }

    render(){
        return (
            <div className="container">
                {this.usertList()}
                <div style={{width:'50%',marginLeft:'25%',marginTop:'6%',marginBottom:'83px'}}>
                <div style={{width:'70%',marginLeft:'9%'}}>
                    <hr/>
                    <h3>Login</h3>
                    <hr/>
                </div>
                <table style={{ marginLeft:'17%', marginTop:'10px'}}>
                    <tbody>
                        <tr>
                            <div className="form-group">
                                <label style={{float: 'left',  marginTop: '20px'}}>Email</label>
                                <input required className="form-control"
                                       type="text"
                                       placeholder="User Name"
                                       value = {this.state.user_username}
                                       onChange={this.onChangeUserName}
                                />
                            </div>
                        </tr>
                        <tr>
                            <div className="form-group">
                                <label style={{float: 'left',  marginTop: '8px'}}>Password</label>
                                <input required className="form-control"
                                       type="password"
                                       placeholder="Password"
                                       value = {this.state.user_password}
                                       onChange={this.onChangePassword}
                                />
                                <a href="/register" style={{fontSize:'12px', color:'blue',float: 'left'}}>Register</a>
                                <a href="/forgotpassword" style={{fontSize:'12px', color:'blue',float: 'right'}}>Forgot password?</a>
                            </div>
                        </tr>
                        <tr>
                            <button href="/home" className="btn btn-primary" onClick={this.onSubmit} style={{marginTop:'10px',marginBottom:'10px',float: 'right',width:'auto',alignContent:"center"}}>
                                Login
                            </button>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        )

    }
}
