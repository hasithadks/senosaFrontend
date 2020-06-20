import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default class EditProductCategory extends Component{
    constructor(props) {
        super(props);

        this.onChangeCategoryname = this.onChangeCategoryname.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            categoryname : ''
        }
    }

    componentDidMount() {
        axios.get('https://senosaonlineshoppingwebsite.herokuapp.com/pcategory/'+this.props.match.params.id)
            .then(response =>{
                this.setState({
                    categoryname: response.data.categoryname
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeCategoryname(e){
        this.setState({
            categoryname : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const productcategory = {
            categoryname : this.state.categoryname
        }

        console.log(productcategory);

        axios.post('https://senosaonlineshoppingwebsite.herokuapp.com/pcategory/update/'+this.props.match.params.id, productcategory)
            .then(res => console.log(res.data));

        window.location = '/admin/pcategory';
    }

    render() {
        return(
            <div className="container">
                <div className="container card">
                    <div className="container" style={{marginBottom:"30px",marginTop:"30px"}}>
                        <h3 className="text-monospace">Add New Product Category</h3>
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-2">
                                    <label>Category Name</label>
                                </div>
                                <div className="col-md-10">
                                    <input type="text" className="form-control" value={this.state.categoryname} onChange={this.onChangeCategoryname} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row" style={{marginRight:"3px"}}>
                                <Link style={{marginLeft:"auto"}} to={"/admin/pcategory/"}><button style={{width:"auto",color:"black"}} className="btn btn-secondary mr-1">Back</button></Link>
                                <button style={{width:"auto"}} className="btn btn-primary" type="submit">Update Product Category</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}
