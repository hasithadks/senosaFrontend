import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const  Product = props =>(
    <tr>
        <td>{props.product.item_name}</td>
        <td>{props.product.item_description}</td>
        <td>{props.product.item_category}</td>
        <td>{props.product.item_discount}</td>
        <td>{props.product.item_price}</td>
        <td>{props.product.item_from}</td>
        <td>{props.product.item_brand}</td>
        <td>
            <div>
                <Link className="mx-1 text-success fas fa-pen text-decoration-none" to={"/admin/product/edititem/"+props.product._id}></Link><span className=" mx-1 text-danger fas fa-trash" href ='#' onClick={()=>{props.deleteProduct(props.product._id,props.product.item_id)}}></span>
            </div>
        </td>
    </tr>
);
export default class ItemLists extends Component{

    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.state = {products:[]};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/products/')
            .then(response =>{
                this.setState({products: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:5000/products/')
            .then(response =>{
                this.setState({products: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    deleteProduct(pid,qid){
        axios.delete('http://localhost:5000/products/delete/'+pid)
            .then(res => console.log(res.data));
        this.setState({
            products:this.state.products.filter(el => el.pid !==pid)
        });
        axios.delete('http://localhost:5000/quantity/delete/qty/'+qid)
            .then(res => console.log(res.data));
        this.setState({
            //quantity:this.state.quantity.filter(el => el.qid !==qid)
        })
    }

    productList(){
        return this.state.products.map(currentTodo => {
            return <Product product ={currentTodo} deleteProduct ={this.deleteProduct} key={currentTodo._id}/>
        });
    }
    render(){
        return(
            <div>
                <div className="App-center">
                    <div className="container">
                        <div className="list-group-item">
                        <h3><b> Item List </b></h3>


                        <div className="col-sm-3" style={{marginLeft:"850px"}}>
                            <Link style={{color:"black", textDecoration:"none"}} to={"/admin/product/additem"}><button style={{width:"auto" ,marginLeft:"-30px"}} className="btn btn-block btn-warning">Add Item</button></Link>
                        </div>

                        <table className="table table-striped" style={{marginTop :20}}>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Discount</th>
                                <th>Price</th>
                                <th>From</th>
                                <th>Brand</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.productList()}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>


            </div>

        )
    }
}
