import React, {Component} from 'react';
import './dashboard.css'
import {Link} from "react-router-dom";
import { Route } from 'react-router-dom';
import ManagementStaffList from "../ManagementStaffComponents/managementstaff.component";
import CreateManagementStaff from "../ManagementStaffComponents/create-managementstaff.component";
import EditManagementStaff from "../ManagementStaffComponents/edit-managementstaff.component";
import ProductCategoryList from "../ProductCategoryComponents/productcategory.component";
import CreateProductCategory from "../ProductCategoryComponents/create-productcategory.component";
import EditProductCategory from "../ProductCategoryComponents/edit-productcategory.component";
import ItemList from "../ProductAddComponent/item-list-component";
import AddEditItem from "../ProductAddComponent/add-edit-item-component";

export default class DashboardIndex extends Component{
    render(){
        return(
            <div>
                <div className="row" id="body-row">

                    <div id="sidebar-container" style={{marginLeft:"10px"}}>
                        <br/>
                        <ul className="list-group" style={{width:"300px"}}>
                            <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                                <span style={{color:"white"}}>Management Dashboard</span>
                            </li>
                            <Link to ="/admin/mstaff" className=" list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <span className="fa fa-user fa-fw mr-3" />
                                    <span className="menu-collapsed">Management Staff</span>
                                </div>
                            </Link>
                            <Link to ="/admin/itemlist" className=" list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <span className="fa fa-box fa-fw mr-3" />
                                    <span className="menu-collapsed">Products</span>
                                </div>
                            </Link>
                            <Link to ="/admin/pcategory" className=" list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <span className="fa fa-boxes fa-fw mr-3" />
                                    <span className="menu-collapsed">Product Categories</span>
                                </div>
                            </Link>

                        </ul>
                    </div>

                    <div className="col p-4">
                        <Route path="/admin/mstaff" component={ManagementStaffList} exact/>
                        <Route path="/admin/mstaff/add" component={CreateManagementStaff} />
                        <Route path="/admin/mstaff/edit/:id" component={EditManagementStaff} />
                        <Route path="/admin/pcategory" exact component={ProductCategoryList} />
                        <Route path="/admin/pcategory/add" component={CreateProductCategory} />
                        <Route path="/admin/pcategory/edit/:id" component={EditProductCategory} />
                        <Route path="/admin/itemlist" exact component={ItemList}/>
                        <Route path="/admin/product/edititem/:id" exact component={AddEditItem}/>
                        <Route path="/admin/product/additem" exact component={AddEditItem}/>
                    </div>
                </div>
            </div>
        )
    }
}
