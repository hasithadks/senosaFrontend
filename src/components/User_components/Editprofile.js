import React, {Component} from "react";
import axios from "axios";

export default class Editprofile extends Component {
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

        this.state ={
            user_id: '',
            user_email : '',
            user_password: '',
            user_username :'',
            user_phone : '',
            user_gender :'',
            user_image : '',
            user_b_year: '',
            user_b_month: '',
            user_b_day: '',
        };
    }

    componentDidMount() {
    if(localStorage.getItem('user_id') != null){
    axios.get('http://localhost:5000/users/'+ localStorage.getItem('user_id'))
                .then(response =>{
                    this.setState({
                        user_id : localStorage.getItem('user_id'),
                        user_email : response.data.user_email,
                        user_password : response.data.user_password,
                        user_username : response.data.user_username,
                        user_phone : response.data.user_phone,
                      //  user_gender : response.data.user_gender,
                        user_image : response.data.user_image,
                       // user_b_year : response.data.user_b_year,
                       // user_b_month : response.data.user_b_year,
                       // user_b_day : response.data.user_b_day,
                    })
                })
                .catch(function (error) {
                    console.log(error)
                })
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

    onChangeBYear(e){
        this.setState({
            user_b_year:  e.target.value
        });
    }

    onChangeBMonth(e){
        this.setState({
            user_b_month:  e.target.value
        });
    }

    onChangeBDay(e){
        this.setState({
            user_b_day:  e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            user_id: this.state.user_id,
            user_email: this.state.user_email,
            user_username: this.state.user_username,
            user_password: this.state.user_password,
            user_phone: this.state.user_phone,
            user_gender: this.state.user_gender,
            user_image: this.state.user_image,
            user_b_year: this.state.user_b_year,
            user_b_month: this.state.user_b_month,
            user_b_day: this.state.user_b_day
        };

        if (this.state.user_phone.length >= 9 && this.state.user_phone.length <= 10  ) {
            if (this.state.user_username.length > 5) {
                axios.post('http://localhost:5000/users/update/'+this.state.user_id,user)
                    .then(res => {
                        localStorage.setItem('user_email',this.state.user_email);
                        localStorage.setItem('user_username',this.state.user_username);
                        localStorage.setItem('user_password',this.state.user_password);
                        localStorage.setItem('user_phone',this.state.user_phone);
                        localStorage.setItem('user_gender',this.state.user_gender);
                        localStorage.setItem('user_image',this.state.user_image);
                        localStorage.setItem('user_b_year',this.state.user_b_year);
                        localStorage.setItem('user_b_month',this.state.user_b_month);
                        localStorage.setItem('user_b_day',this.state.user_b_day);

                        window.location = '/profile';
                    })
                    .catch(function (error) {
                        alert("Profile update fail");
                        window.location='/edit';
                    });
            }else{
                alert("User Name should at least 6 characters");
            }
        }else{
            alert("Phone number invalid");
        }
    }


    render() {
        return (

            <div>
                <div className="container1">
                    <div style={{width:'70%', marginLeft:'15%'}}>
                        <hr/>
                            <h2>PROFILE UPDATE</h2>
                        <hr/>
                    </div>

                    <form style={{marginBottom:'48px'}} onSubmit={this.onSubmit}>
                        <table style={{width:'70%', marginLeft:'16%'}}>
                            <tbody>
                                <tr>
                                    <td>
                                        <table style={{width:'100%'}}>
                                            <tbody>
                                            <tr>
                                                <td style={{width:'50%'}}>
                                                    <div className="form-group">
                                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" style={{float: 'left'}}>Email</label>
                                                        <div className="col-sm-12">
                                                            <input type="email" className="form-control" id="inputEmail3" required placeholder="Email" disabled
                                                                   value={this.state.user_email}
                                                                   onChange={this.onChangeEmail}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>


                                                <td style={{width:'40%'}}>
                                                    <div className="form-group">
                                                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" style={{float: 'left'}}>Phone</label>
                                                        <div className="col-sm-12">
                                                            <input type="numbers" className="form-control" id="inputPhone" required placeholder="Phone"
                                                                   value={this.state.user_phone}
                                                                   onChange={this.onChangePhone}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width:'50%'}}>
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
                                            </tr>
                                            <tr>
                                                <td style={{width:'50%'}}>
                                                    <div className="form-group">
                                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" style={{float:'left'}}>Birthday</label>
                                                        <div className='row col-sm-12' style={{marginLeft:'1px'}}>
                                                        <div style={{width:'116px'}}>
                                                            <select className="browser-default custom-select" style={{fontSize:'14px',height:'32px'}}
                                                                value={this.state.user_b_year}
                                                                onChange={this.onChangeBYear}>
                                                                <option value="" disabled selected>Year</option>
                                                                <option value="2005">2005</option>
                                                                <option value="2004">2004</option>
                                                                <option value="2003">2003</option>
                                                                <option value="2002">2002</option>
                                                                <option value="2001">2001</option>
                                                                <option value="2000">2000</option>
                                                                <option value="1999">1999</option>
                                                                <option value="1998">1998</option>
                                                                <option value="1997">1997</option>
                                                                <option value="1996">1996</option>
                                                                <option value="1995">1995</option>
                                                                <option value="1994">1994</option>
                                                                <option value="1993">1993</option>
                                                                <option value="1992">1992</option>
                                                                <option value="1991">1991</option>
                                                                <option value="1990">1990</option>
                                                            </select>
                                                        </div>
                                                        <div style={{width:'116px',marginLeft:'15px'}}>
                                                            <select className="browser-default custom-select" style={{fontSize:'14px',height:'32px'}}
                                                                value={this.state.user_b_month}
                                                                onChange={this.onChangeBMonth}>
                                                                <option value="" disabled selected>Month</option>
                                                                <option value="January">January</option>
                                                                <option value="February">February</option>
                                                                <option value="March">March</option>
                                                                <option value="April">April</option>
                                                                <option value="May">May</option>
                                                                <option value="june">June</option>
                                                                <option value="July">July</option>
                                                                <option value="August">August</option>
                                                                <option value="September">September</option>
                                                                <option value="October">October</option>
                                                                <option value="November">November</option>
                                                                <option value="December">December</option>
                                                            </select>
                                                        </div>
                                                        <div style={{width:'116px',marginLeft:'15px'}}>
                                                            <select className="browser-default custom-select" style={{fontSize:'14px',height:'32px'}}
                                                                value={this.state.user_b_day}
                                                                onChange={this.onChangeBDay}>
                                                                <option value="" disabled selected>Day</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                                <option value="11">11</option>
                                                                <option value="12">12</option>
                                                                <option value="13">13</option>
                                                                <option value="14">14</option>
                                                                <option value="15">15</option>
                                                                <option value="16">16</option>
                                                                <option value="17">17</option>
                                                                <option value="18">18</option>
                                                                <option value="19">19</option>
                                                                <option value="20">20</option>
                                                                <option value="21">21</option>
                                                                <option value="22">22</option>
                                                                <option value="23">23</option>
                                                                <option value="24">24</option>
                                                                <option value="25">25</option>
                                                                <option value="26">26</option>
                                                                <option value="27">27</option>
                                                                <option value="28">28</option>
                                                                <option value="29">29</option>
                                                                <option value="30">30</option>
                                                                <option value="31">31</option>
                                                            </select>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{width:'40%'}} >
                                                    <div className="form-group" >
                                                        <div className="col-sm-12">
                                                            <button style={{width:'100%',marginTop:'30px',textAlign:'center'}} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                                                Save changes
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>

                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>

                                    <td>
                                        <div>
                                            <div>
                                                <img id="blah" src="http://placehold.it/180" className="image"/>
                                            </div>
                                            <div style={{width:'110px',backgroundColor:'primary', marginLeft:'55px'}}>
                                                <input type="file" name="file" className="btn-primary" style={{width:'107px',padding:'5px',marginLeft:'-5px'}}/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Profile Details Update</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        Are you sure to update details!
                                    </div>
                                    <div class="modal-footer">
                                        <button type="close" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" href="'/profile'" class="btn btn-primary" >Save changes</button>
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