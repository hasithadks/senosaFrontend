import React, {Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import logo from "../Images/correct_icon.png";
import {Link} from "react-router-dom";
//quantityList
const  Quantity = props =>(
    <tr>
        {/*<td>{props.quantity.item_id}</td>*/}
        <td className="col-sm-2">{props.quantity.item_size}</td>
        <td className="col-sm-3">{props.quantity.item_colour}</td>
        <td className="col-sm-3">{props.quantity.item_quantity}</td>
        <td className="col-sm-3">
            <img height="100" src={require('../uploads/'+props.quantity.item_productImage)} alt="" width="100"/>
        </td>
        <td>
            <div>
                <span className=" mx-1 text-success fas fa-pen" href ='#' onClick={()=>{props.fillQuantity(props.quantity._id)}}></span>  <span className=" mx-1 text-danger fas fa-trash" href ='#' onClick={()=>{props.deleteQuantity(props.quantity._id)}}></span>
            </div>
        </td>
    </tr>
);

export default class AddEditItem extends Component{

    constructor(props) {
        super(props);

        this.deleteQuantity = this.deleteQuantity.bind(this);
        this.onChangeItemName = this.onChangeItemName.bind(this);
        this.onChangeItemDescription = this.onChangeItemDescription.bind(this);
        this.onChangeItemCategory = this.onChangeItemCategory.bind(this);
        this.onChangeItemDiscount = this.onChangeItemDiscount.bind(this);
        this.onChangeItemFrom = this.onChangeItemFrom.bind(this);
        this.onChangeItemBrand = this.onChangeItemBrand.bind(this);
        this.onChangeItemFeatures = this.onChangeItemFeatures.bind(this);
        this.onChangeItemImage = this.onChangeItemImage.bind(this);

        this.onChangeItemId = this.onChangeItemId.bind(this);
        this.onChangeItemSize = this.onChangeItemSize.bind(this);
        this.onChangeItemColour = this.onChangeItemColour.bind(this);
        this.onChangeItemQuantity = this.onChangeItemQuantity.bind(this);
        this.onChangeItemPrice = this.onChangeItemPrice.bind(this);

        this.addProduct = this.addProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);

        this.fillQuantity = this.fillQuantity.bind(this);

        this.addQuantity = this.addQuantity.bind(this);
        this.editQuantity = this.editQuantity.bind(this);

        this.state ={
            item_name : '',
            item_description : '',
            item_category : '',
            item_quantity : '',
            item_discount : '',
            item_from : '',
            item_brand :'',
            item_features: '',
            item_image: '',
            editItem : false,
            item_id: '',
            item_size: '',
            item_colour: '',
            item_price:'',
            quantity:[],
            id:'',
            quantityItem : false,
            nextStep:false,
            categoryArray: [],
            file: null,
            productImage:'',
        }
    }

    //map quantityList into quantity Array
    quantityList(){
        return this.state.quantity.map(currentTodo => {
            return <Quantity quantity ={currentTodo} deleteQuantity ={this.deleteQuantity}  fillQuantity ={this.fillQuantity} key={currentTodo._id}/>
        });
    }

    //display quantities of the product
    fillQuantity(id){
        axios.get('https://senosaonlineshoppingwebsite.herokuapp.com/quantity/qty/'+ id)
            .then(response =>{
                this.setState({
                    id :response.data._id,
                    item_quantity : response.data.item_quantity,
                    item_price : response.data.item_price,
                    item_discount : response.data.item_discount,
                })
            })
            .catch(function (error) {
                console.log(error)
            });
        this.setState({
            quantityItem : true
        });

    }


    componentDidUpdate() {
        if(this.state.item_id != null){
            axios.get('https://senosaonlineshoppingwebsite.herokuapp.com/quantity/'+this.state.item_id)
                .then(response =>{
                    this.setState({quantity: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        else{
            this.setState({quantity:[]});
        }
    }

    componentDidMount() {
        if(this.props.match.params.id != null){
            axios.get('https://senosaonlineshoppingwebsite.herokuapp.com/products/'+ this.props.match.params.id)
                .then(response =>{
                    this.setState({
                        item_id : response.data.item_id,
                        item_name : response.data.item_name,
                        item_description : response.data.item_description,
                        item_category : response.data.item_category,
                        item_discount : response.data.item_discount,
                        item_price : response.data.item_price,
                        item_from : response.data.item_from,
                        item_brand : response.data.item_brand,
                        editItem : true,
                        nextStep : true

                    })
                })
                .catch(function (error) {
                    console.log(error)
                })
        }else{
            this.setState({
                editItem : false
            });
        }

        if(this.state.item_id != null){
            axios.get('https://senosaonlineshoppingwebsite.herokuapp.com/quantity/'+this.state.item_id)
                .then(response =>{
                    this.setState({quantity: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        else{
            this.setState({quantity:[]});
        }

        //catogory dropdown
        if (this.state.item_id != null) {
            axios.get('https://senosaonlineshoppingwebsite.herokuapp.com/pcategory')
                .then(response => {
                    //this.setState({productQuantities: response.data});
                    let CategoryList = [];

                    for (let i = 0; i < response.data.length; i++) {

                        CategoryList.push(response.data[i].categoryname);

                    }
                    this.setState({
                        categoryArray: CategoryList,
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
        } else {
            this.setState({categoryArray: []});
        }
    }


    onChangeItemName(e){
        this.setState({
            item_name :e.target.value
        });
    }

    onChangeItemDescription(e){
        this.setState({
            item_description :e.target.value
        });
    }

    onChangeItemCategory(e){
        this.setState({
            item_category :e.target.value
        });
    }

    onChangeItemDiscount(e){
        this.setState({
            item_discount :e.target.value
        });
    }

    onChangeItemFrom(e){
        this.setState({
            item_from : e.target.value
        });
    }

    onChangeItemBrand(e){
        this.setState({
            item_brand : e.target.value
        });
    }

    onChangeItemFeatures(e){
        this.setState({
            item_features : e.target.value
        });
    }

    onChangeItemImage(e){
        let file = e.target.files[0];
        this.setState({file:file})
    }

    onChangeItemId(e){
        this.setState({
            item_id : e.target.value
        })
    }

    onChangeItemSize(e){
        this.setState({
            item_size : e.target.value
        })
    }

    onChangeItemColour(e){
        this.setState({
            item_colour : e.target.value
        })
    }

    onChangeItemQuantity(e){
        this.setState({
            item_quantity :e.target.value
        });
    }
    onChangeItemPrice(e){
        this.setState({
            item_price :e.target.value
        });
    }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Quantity table insert delete update
    addQuantity(e){
        e.preventDefault();

        if(this.state.item_id != null && this.state.item_colour != null && this.state.item_size != null && this.state.item_quantity !=null){
            console.log(`Form submitted:`);
            console.log(`item id: ${this.state.item_id}`);
            console.log(`item colour: ${this.state.item_colour}`);
            console.log(`item size: ${this.state.item_size}`);
            console.log(`item image: ${this.state.file}`);

            let file = this.state.file;

            let formdata = new FormData();

            formdata.append('item_id',this.state.item_id);
            formdata.append('item_size',this.state.item_size);
            formdata.append('item_colour',this.state.item_colour);
            formdata.append('item_quantity',this.state.item_quantity);
            formdata.append('productImage',file);

            axios({
                url:`https://senosaonlineshoppingwebsite.herokuapp.com/quantity/`,
                method: "POST",
                data:formdata
            }).then((res)=>{
                swal("Data Saved Successfully!", "Your Details has been Saved Successfully!", "success");
            },(err)=>{
                swal("Error!", "Try Again!", "warning");
            });

            this.setState({
                item_size: '',
                item_colour: '',
                item_quantity:'',
                file: '',
            });
        }
        else{
            alert("You must fill in all of the fields.");
        }
    }

    editQuantity(e) {
        e.preventDefault();
        console.log(`item image: ${this.state.file}`);

        if(this.state.item_id != null && this.state.item_colour != null && this.state.item_size != null && this.state.item_quantity !=null ){
            let file = this.state.file;

            const editQuantity = {
            item_id: this.state.item_id,
            item_size: this.state.item_size,
            item_colour: this.state.item_colour,
            item_quantity: this.state.item_quantity,
            productImage: file,
        };

        axios.post('https://senosaonlineshoppingwebsite.herokuapp.com/quantity/update/' + this.state.id, editQuantity)
            .then((res) => {
                swal("Data Saved Successfully!", "Your Details has been Update Successfully!", "success");
            }, (err) => {
                swal("Error!", "Try Again!", "warning");
            });
        // this.props.history.push('/');
        this.setState({
            quantityItem: false
        });

        this.setState({
            item_size: '',
            item_colour: '',
            item_quantity: '',
        });
        }else{
            alert("You must fill in all of the fields.");
        }
    }

    deleteQuantity(id){
        axios.delete('https://senosaonlineshoppingwebsite.herokuapp.com/quantity/delete/'+id)
            .then((res)=>{
            swal("Delete Successfully!", "Your Details has been Delete Successfully!", "success");
        },(err)=>{
            swal("Error!", "Try Again!", "warning");
        });
        this.setState({
            quantity:this.state.quantity.filter(el => el.id !==id)
        })
    }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    addProduct(e){
        e.preventDefault();
        if(this.state.item_name != null && this.state.item_description != null && this.state.item_category != null && this.state.item_quantity != null && this.state.item_price){

        console.log(`Form submitted:`);
        console.log(`item name: ${this.state.item_name}`);
        console.log(`item description: ${this.state.item_description}`);
        console.log(`item category: ${this.state.item_category}`);
        console.log(`item discount: ${this.state.item_discount}`);
        console.log(`item from: ${this.state.item_from}`);
        console.log(`item brand: ${this.state.item_brand}`);
        console.log(`item image: ${this.state.editItem}`);
        console.log(`item price: ${this.state.item_price}`);

        const newItem = {
            item_name : this.state.item_name,
            item_description : this.state.item_description,
            item_category : this.state.item_category,
            item_quantity : this.state.item_quantity,
            item_from : this.state.item_from,
            item_brand : this.state.item_brand,
            item_features: this.state.item_features,
            item_price : this.state.item_price,
            item_discount : this.state.item_discount,
            item_image: this.state.item_image
        };

        axios.post('https://senosaonlineshoppingwebsite.herokuapp.com/products/add',newItem)
            .then(res => {this.setState({
                item_id: res.data.item_id})
            })
            .catch(//swal("Good job!", "You clicked the button!", "warning"
                 );
        swal("Data Saved Successfully!", "Your Details has been Saved Successfully!", "success");

        this.setState({
            nextStep : true
        });

        } else{
            alert("You must fill in all of the fields.");
        }
    }

    editProduct(e){
        e.preventDefault();
        if(this.state.item_name != null && this.state.item_description != null && this.state.item_category != null && this.state.item_quantity != null && this.state.item_price){

        console.log(`Form submitted:`);
        console.log(`edit name: ${this.state.item_name}`);
        console.log(`edit description: ${this.state.item_description}`);
        console.log(`edit category: ${this.state.item_category}`);

        console.log(`edit discount: ${this.state.item_discount}`);
        console.log(`edit from: ${this.state.item_from}`);
        console.log(`edit brand: ${this.state.item_brand}`);

        console.log(`edit image: ${this.state.item_image}`);
        console.log(`edit image: ${this.state.editItem}`);

        const editItem = {
            item_name : this.state.item_name,
            item_description : this.state.item_description,
            item_category : this.state.item_category,
            item_from : this.state.item_from,
            item_brand : this.state.item_brand,
            item_price : this.state.item_price,
            item_discount : this.state.item_discount,
            item_image: this.state.item_image
        };

        // axios.post('https://senosaonlineshoppingwebsite.herokuapp.com/products/update/'+this.props.match.params.id,editItem)
        //     .then(res => console.log(res.data))
        //     .catch(swal("Good job!", "You clicked the button!", "warning"));

        axios.post('https://senosaonlineshoppingwebsite.herokuapp.com/products/update/'+this.props.match.params.id,editItem)
            .then(res => console.log(res.data));

        swal("Good job!", "Your Details has been Update Successfully!", "success");
        //this.props.history.push('/');
        }else{
            alert("You must fill in all of the fields.");
        }
    }

    render(){
        return(
            <div>

                <div className="container text-left">
                    <form  onSubmit = {this.state.editItem
                        ? this.editProduct
                        : this.addProduct}>

                        <div className="col-sm-10 ml-lg-n1 mt-lg-n3" >
                        <hr/>
                        <h4 className="text-center"> {this.state.editItem ? "Edit Item" : "Add Item"}</h4>
                        <hr/>
                        </div>

                        <div className="col-sm-10 ml-lg-n1" >
                            <br/>
                            <h4 className="text-left ml-lg-n3"> <b>Product Details</b></h4>
                        </div>

                            <div className="row">
                                <div className="col-sm-5">
                                <label>Product Name: </label>
                                <input type="text" required
                                        className="form-control"
                                        value ={this.state.item_name}
                                        onChange={this.onChangeItemName}

                                />
                                </div>

                                <div className="col-sm-5">
                                    <label>Product Catogory: </label>
                                    <div style={{padding: '0px'}}>
                                        <select style={{width: '100%'}} className="browser-default custom-select"
                                                onChange={(e) => this.onChangeItemCategory(e)}>
                                            <option>Select Category</option>
                                            {this.state.categoryArray.map((category) => <option key={category} value={category}>{category}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-10">
                                    <label>Product Description: </label>
                                    <textarea
                                        className="form-control" required
                                        value ={this.state.item_description}
                                        onChange={this.onChangeItemDescription}

                                    />
                                </div>

                        </div>
                        <br/>

                            <div className="row">
                                <div className="col-sm-5">
                                    <label>From: </label>
                                    <input type="text"
                                           className="form-control"
                                           value ={this.state.item_from}
                                           onChange = {this.onChangeItemFrom}
                                    />
                                </div>
                                <div className="col-sm-5">
                                    <label>Brand: </label>
                                    <input type="text"
                                           className="form-control"
                                           value = {this.state.item_brand}
                                           onChange={this.onChangeItemBrand}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-5">
                                    <label>Price: </label>
                                    <input type="number" required
                                           className="form-control"
                                           value = {this.state.item_price}
                                           onChange={this.onChangeItemPrice}
                                           />
                                </div>

                                <div className="col-sm-4">
                                    <label>Product Discount: </label>
                                    <input type="number"
                                           className="form-control"
                                           value ={this.state.item_discount}
                                           onChange={this.onChangeItemDiscount}
                                    />

                                </div>
                                <div className="col-sm-1" ><h5 style={{marginTop:31, color:"red",backgroundColor:"#ececec",padding:7}}>% Off</h5></div>
                            </div>


                            <div className="row">
                                <div className="col-sm-6">

                                </div>
                                <div className="col-sm-2 mt-3">
                                    <Link style={{textDecoration:"none"}} to={"/admin/itemlist"}><button className="btn btn-block btn-warning" style={{width:"159px" , color:"white"}}>Back</button></Link>
                                </div>
                                <div className="col-sm-2">
                                    <button style={{marginTop:10}} type ="submit" value ="Submit"
                                            className = {this.state.editItem
                                                ? "btn btn-block btn-success mt-3"
                                                : "btn btn-block btn-primary mt-3"}
                                    > {this.state.editItem ? "Edit" : "Next"}
                                    </button>
                                </div>
                            </div>
                    </form>
                    <br/>



                    {this.state.nextStep
                        ? ( <div>

                                <div className="col-sm-10 ml-lg-n1" >
                                    <br/>
                                    <hr/>
                                    <h4 className="text-left ml-lg-n3"><b>Product Quantities</b> </h4>
                                </div>

                                    <form encType="multipart/form-data" method="POST">


                                        <div className= "row">
                                            <div className="col-sm-5">
                                                <label>ItemId: </label>
                                                <input type="text"
                                                       className="form-control"
                                                       value = {this.state.item_id}
                                                       onChange={this.onChangeItemId}
                                                       disabled/>
                                            </div>
                                            <div className="col-sm-5">
                                                <div className="form-group">
                                                    <label htmlFor="exampleFormControlSelect1">Size</label>
                                                    <select className="form-control" id="exampleFormControlSelect1"
                                                            value={this.state.item_size}
                                                            onChange={this.onChangeItemSize} >
                                                        <option>XS</option>
                                                        <option>S</option>
                                                        <option>M</option>
                                                        <option>L</option>
                                                        <option>XL</option>
                                                        <option>XXL</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="col-sm-5">
                                                <div className="form-group">
                                                    <label htmlFor="exampleFormControlSelect1">Colour</label>
                                                    <select className="form-control" id="exampleFormControlSelect1"
                                                            value={this.state.item_colour}
                                                            onChange={this.onChangeItemColour}>
                                                        <option>Gray</option>
                                                        <option>Black</option>
                                                        <option>White</option>
                                                        <option>Orange</option>
                                                        <option>Red</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-5">
                                                <label>Quantity: </label>
                                                <input type="number" required
                                                       className="form-control"
                                                       value = {this.state.item_quantity}
                                                       onChange={this.onChangeItemQuantity}
                                                       />
                                            </div>
                                            </div>
                                            <div className="row">

                                            <div className="col-sm-5">
                                                <div className="custom-file" style={{marginTop:30}} >
                                                    <input type="file"
                                                           name="file" required
                                                           className="custom-file-input"
                                                           id="customFileLangHTML"
                                                           //value = {this.state.item_image}
                                                           onChange={this.onChangeItemImage} />
                                                    <label className="custom-file-label " htmlFor="customFileLangHTML" data-browse="Browse" >Choose Image</label>

                                                </div>
                                            </div>
                                                <div className="col-sm-3">
                                                </div>
                                            <div className="col-sm-2">
                                                <button style={{marginTop:30}} type ="submit" value ="Submit"
                                                        className = {this.state.quantityItem
                                                            ? "btn btn-block btn-success"
                                                            : "btn btn-block btn-primary"}
                                                        onClick= {this.state.quantityItem
                                                            ? this.editQuantity
                                                            : this.addQuantity}
                                                > {this.state.quantityItem ? "Edit" : "Add"}
                                                </button>
                                            </div>
                                        </div>

                                    </form>
                                    <br/>
                                <div className="col-sm-10 ml-lg-n1" >
                                    <br/>
                                    <hr/>
                                    <h4 className="text-left ml-lg-n3"> <b> Product Quantities List</b> </h4>
                                </div>
                                    <table className="table col-sm-10" style={{marginTop :20}}>
                                        <thead>
                                        <tr>
                                            <th>Size</th>
                                            <th>Color</th>
                                            <th>Quantity</th>
                                            <th>Image</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.quantityList()}
                                        </tbody>
                                    </table>




                            </div>
                        )
                        :(
                            <div></div>
                        )
                    }
                    <br/> <br/>
                </div>

            </div>
        )
    }
}
