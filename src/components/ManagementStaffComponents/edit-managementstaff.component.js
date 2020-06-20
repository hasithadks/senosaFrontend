import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default class EditManagementStaff extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username : '',
            password : '',
            fname : '',
            lname : '',
            role : '',
            email : '',
            profilePic : 'default-img.jpg'
        }
    }

    componentDidMount() {
        axios.get('https://senosaonlineshoppingwebsite.herokuapp.com/mstaff/'+this.props.match.params.id)
            .then(response =>{
                this.setState({
                    username: response.data.username,
                    password : response.data.password,
                    fname : response.data.fname,
                    lname : response.data.lname,
                    role : response.data.role,
                    email : response.data.email,
                    profilePic : response.data.profilePic.toString()
                },()=>{
                    // console.log("Profile Pic");
                    // console.log(this.state.profilePic);
                })
                console.log(response.data);
                // console.log("Profile Pic");
                // console.log(response.data.profilePic);

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    fileUploadHandler = e => {
        this.setState({
            profilePic: e.target.files[0]
        })
    }

    onSubmitHandler = e => {
        e.preventDefault();

        const managementstaff = new FormData();

        managementstaff.set("fname",this.state.fname);
        managementstaff.set("lname",this.state.lname);
        managementstaff.set("username",this.state.username);
        managementstaff.set("password",this.state.password);
        managementstaff.set("email",this.state.email);
        managementstaff.set("role",this.state.role);
        managementstaff.append('profilePic',this.state.profilePic);

        console.log(managementstaff);

        axios({
            method: 'post',
            url: 'https://senosaonlineshoppingwebsite.herokuapp.com/mstaff/update/'+this.props.match.params.id,
            headers: {},
            data: managementstaff,
        }).then(res => console.log(res.data));

        window.location = '/admin/mstaff';
    }

    render() {
        return(
            <div className="container">
                <div className="container card">
                    <div className="container" style={{marginBottom:"30px",marginTop:"30px"}}>
                        <h3 className="text-monospace">Edit Management Staff</h3>
                    </div>

                    <form onSubmit={this.onSubmitHandler}>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-2">
                                    <label>First Name</label>
                                </div>
                                <div className="col-md-10">
                                    <input type="text" className="form-control" name="fname" value={this.state.fname} onChange={this.onChangeHandler} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-2">
                                    <label>Last Name</label>
                                </div>
                                <div className="col-md-10">
                                    <input type="text" className="form-control" name="lname" value={this.state.lname} onChange={this.onChangeHandler} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-2">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-10">
                                    <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.onChangeHandler} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-2">
                                    <label>User Name</label>
                                </div>
                                <div className="col-md-10">
                                    <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.onChangeHandler} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-2">
                                    <label>Password</label>
                                </div>
                                <div className="col-md-10">
                                    <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onChangeHandler} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-2">
                                    <label>Role</label>
                                </div>
                                <div className="col-md-10">
                                    <select className="form-control" name="role" value={this.state.role} onChange={this.onChangeHandler}>
                                        <option value="select">Select a Role</option>
                                        <option value="Store Manager">Store Manager</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-2">
                                    <label>Image</label>
                                </div>
                                <div className="col-md-10">
                                    <input type="file" className="form-control" onChange={this.fileUploadHandler} />
                                    {/*<p className="form-control">{this.state.profilePic}</p>*/}
                                    <img className="form-control img-thumbnail" style={{height:"200px",width:"200px"}}  src={require('../uploads/' + this.state.profilePic)} alt="User Image"/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row" style={{marginRight:"3px"}}>
                                <Link style={{marginLeft:"auto"}} to={"/admin/mstaff/"}><button style={{width:"auto",color:"black"}} className="btn btn-secondary mr-1">Back</button></Link>
                                <button style={{width:"auto"}} className="btn btn-primary" type="submit">Update Management Staff</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}
