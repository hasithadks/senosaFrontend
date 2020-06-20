import React, { Component } from 'react'
import axios from "axios";


export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            user_username : '',
        }
    }

    onChangeUserName(e){
        this.setState({
            user_username :e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault(e);

        const user = {
            user_username: this.state.user_username,
        };

        if (this.state.user_username.length > 5){
            axios.get('https://senosaonlineshoppingwebsite.herokuapp.com/userAccounts/forgot/'+ this.state.user_username)
                .then(res => console.log((res.data)));

            alert("check your email");
        }else{
            alert("Invalid Email");
        }
    }


    render() {
        return (

            <div className="container">
                <div style={{width:'70%', marginLeft:'15%'}}>
                    <hr/>
                    <h2>Password Reset Request</h2>
                    <hr/>
                </div>

                <form onSubmit={this.onSubmit}>
                    <table style={{width:'100%', marginLeft:'30%'}} className="col-12">
                        <tr>
                            <td style={{width:'auto'}}>
                                <div className="form-group">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" style={{float: 'left',marginLeft:'-2%'}}>Enter your Email</label>
                                    <div className="col-sm-5">
                                        <input type="email" className="form-control" id="inputEmail3" required placeholder="Email"
                                               value = {this.state.user_username}
                                               onChange={this.onChangeUserName}
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <div className="form-group" style={{marginTop:'1px', float:'left'}}>
                                <div className="col-sm-5">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </tr>
                    </table>
                </form>
            </div>

        )
    }
}
