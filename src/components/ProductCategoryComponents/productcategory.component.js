import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";


const PCategory = props => (
    <tr>
        <td>{props.pcategory.categoryname}</td>
        <td>
            <Link style={{color:"black"}} to={"/admin/pcategory/edit/"+props.pcategory._id}><button style={{paddingRight:"20px;",width:"auto"}} className="btn btn-warning mr-1"><i className="fa fa-pencil-alt"> Edit</i></button></Link>
            <button style={{width:"auto",color:"black"}} className="btn btn-danger" onClick={() => {props.deletePcategory(props.pcategory._id)}}><i className="fa fa-trash-alt"> Delete</i></button>
        </td>
    </tr>
);

export default class ProductCategoryList extends Component{
    constructor(props) {
        super(props);

        this.deletePcategory = this.deletePcategory.bind(this);

        this.state = {
            pcategory : []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/pcategory/')
            .then(response => {
                this.setState({ pcategory : response.data})
            })
            .catch(error =>{
                console.log(error);
            })
    }

    deletePcategory(id){
        axios.delete('http://localhost:5000/pcategory/'+id)
            .then(res => console.log(res.date));

        this.setState({
            pcategory : this.state.pcategory.filter(el => el._id !== id)
        })
    }

    categoryList(){
        return this.state.pcategory.map(currentcateogory => {
            return <PCategory pcategory={currentcateogory} deletePcategory={this.deletePcategory} key={currentcateogory._id} />;
        })
    }


    render() {
        return(
            <div className="container card">
                <div className="container" style={{marginBottom:"30px",marginTop:"30px"}}>
                    <h3 className="text-monospace">Product Category</h3>
                </div>
                <div align="right">
                    <Link to={"/admin/pcategory/add"}><button className="btn btn-primary" style={{width:"auto", marginBottom:"20px"}}>Add Product Category</button></Link>
                    <br/>
                </div>

                <div>
                    <table className="table table-striped">
                        <thead >
                        <tr>
                            <th>Category Name</th>
                            <th >Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.categoryList()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
