import React, { Component } from 'react'
import axios from "axios";

const  User = props =>(
        localStorage.clear(),
        localStorage.setItem('user_id',props.user._id),
        localStorage.setItem('user_username',props.user.user_username),
        localStorage.setItem('user_email',props.user.user_email),
        localStorage.setItem('user_password',props.user.user_password),
        localStorage.setItem('user_phone', props.user.user_phone),
        localStorage.setItem('user_gender', props.user.user_gender),
        localStorage.setItem('user_b_year', props.user.user_b_year),
        localStorage.setItem('user_b_month', props.user.user_b_month),
        localStorage.setItem('user_b_day', props.user.user_b_day),

        <span style={{color:"black"}}> </span>
);

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            user_email : '',
            user_password: '',
            user_username : '',
            user_phone : '',
            user_gender :'',
            user_image : '',
            user_b_year: '',
            user_b_month: '',
            user_b_day: '',

            user:[],
        };
    }

    componentDidMount() {
        this.userList();
        axios.get('http://localhost:5000/users/username/'+ localStorage.getItem('user_username'))
            .then(response =>{
                this.setState({user: response.data});

                this.setState ({
                    user_email : localStorage.getItem('user_email'),
                    user_password: localStorage.getItem('user_password'),
                    user_username : localStorage.getItem('user_username'),
                    user_phone : localStorage.getItem('user_phone'),
                    user_gender :localStorage.getItem('user_gender'),
                    user_image : localStorage.getItem('user_image'),
                    user_b_year: localStorage.getItem('user_b_year'),
                    user_b_month: localStorage.getItem('user_b_month'),
                    user_b_day: localStorage.getItem('user_b_day'),
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState ({
            user_email : localStorage.getItem('user_email'),
            user_password: localStorage.getItem('user_password'),
            user_username : localStorage.getItem('user_username'),
            user_phone : localStorage.getItem('user_phone'),
            user_gender :localStorage.getItem('user_gender'),
            user_image : localStorage.getItem('user_image'),
            user_b_year: localStorage.getItem('user_b_year'),
            user_b_month: localStorage.getItem('user_b_month'),
            user_b_day: localStorage.getItem('user_b_day'),
        });
    }

    userList(){
        return this.state.user.map(currentTodo => {
            return <User user ={currentTodo} key={currentTodo._id}/>
        });
    }

    onSubmit(e){
        e.preventDefault();
        const detail = {
            user_email : localStorage.getItem('user_email'),
        }

        axios.delete('http://localhost:5000/users/delete/' + this.state.user_email)
            .then(response =>{
                this.setState({
                    users: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.delete('http://localhost:5000/userAccounts/delete/' + this.state.user_email)
            .then(response =>{
                this.setState({
                    users: response.data
                });

                localStorage.clear();
                window.location = '/register';
            })
            .catch(function (error) {
                console.log(error);

                alert("Something wrong!")
            });

    }


    render() {
        return (

            <div style={{width:'100%',height:'100%'}}>
                <div>{this.userList()}</div>
            <div className="container">
                <form style={{width:'100%', marginTop:'30px', marginBottom:'32px'}}>
                    <hr/>
                    <table style={{width:'75%', marginLeft:'15%'}}>
                        <tbody>
                            <tr>
                                <td>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <div className="profile-head" style={{float:'left', marginLeft:'14px'}}>
                                                    <h4>

                                                    </h4>
                                                </div>
                                            </td>

                                            <td>

                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="col-md-4">
                                                    <div className="profile-img">
                                                        <img
                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                                                        />
                                                    </div>
                                                </div>
                                            </td>

                                            <td>

                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="col-md-12 ">
                                                    <a href="/edit" type="submit" className="btn-primary nav-link" name="edit" value="Edit Profile">
                                                        Edit Profile
                                                    </a>
                                                </div>
                                                <div className="col-md-12 " style={{marginTop:'1px'}}>
                                                    <a href="/passwordchange" type="submit" className="btn-primary nav-link" name="edit" value="password change">
                                                        Change password
                                                    </a>
                                                </div>
                                                <div className="col-md-12 " style={{marginTop:'1px'}}>
                                                    <button onClick={this.onSubmit} style={{width:'275px'}} type="button" className="btn-danger nav-link" name="delete" value="account delete" data-toggle="modal" data-target="#exampleModal">
                                                        Delete account
                                                    </button>
                                                </div>
                                            </td>

                                            <td>

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>

                                <td>
                                    <table className="table" style={{marginTop:'60px'}}>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Name</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p style={{float:'left'}}>{this.state.user_username}</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Email</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p style={{float:'left'}}>{this.state.user_email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Phone</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p style={{float:'left'}}>{this.state.user_phone}</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Gender</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p style={{float:'left'}}>{this.state.user_gender}</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Birthday</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p style={{float:'left'}}>{this.state.user_b_year}/{this.state.user_b_month}/{this.state.user_b_day}</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr/>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Profile Details Update</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure to delete your account!
                                </div>
                                <div className="modal-footer">
                                    <button type="close" className="btn btn-secondary" data-dismiss="modal">Close
                                    </button>
                                    <button type="submit" href='/register' className="btn btn-primary">Delete account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
            </div>
    )
    }
}
