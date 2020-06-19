import React, { Component } from 'react'
import '../CSS/footer.css'

export default class Footer extends Component {
    render() {
        return (


        <footer className="page-footer font-small navbar-dark bg-dark ft">
            {/* Footer Links */}
            <div className="container">
                {/* Grid row*/}
                <div className="row text-center d-flex justify-content-center pt-5 mb-3">
                    {/* Grid column */}
                    <div className="col-md-2 mb-3">
                        <h6 className="text-uppercase font-weight-bold">
                            <a href="#!">About us</a>
                        </h6>
                    </div>
                    {/* Grid column */}
                    {/* Grid column */}
                    <div className="col-md-2 mb-3">
                        <h6 className="text-uppercase font-weight-bold">
                            <a href="#!">Products</a>
                        </h6>
                    </div>
                    {/* Grid column */}
                    {/* Grid column */}
                    <div className="col-md-2 mb-3">
                        <h6 className="text-uppercase font-weight-bold">
                            <a href="#!">Awards</a>
                        </h6>
                    </div>
                    {/* Grid column */}
                    {/* Grid column */}
                    <div className="col-md-2 mb-3">
                        <h6 className="text-uppercase font-weight-bold">
                            <a href="#!">Help</a>
                        </h6>
                    </div>
                    {/* Grid column */}
                    {/* Grid column */}
                    <div className="col-md-2 mb-3">
                        <h6 className="text-uppercase font-weight-bold">
                            <a href="#!">Contact</a>
                        </h6>
                    </div>
                    {/* Grid column */}
                </div>
                {/* Grid row*/}
                <hr className="rgba-white-light" style={{margin: '0 15%'}} />

                {/* Grid row*/}
                <hr className="clearfix d-md-none rgba-white-light" style={{margin: '10% 15% 5%'}} />
                {/* Grid row*/}

            </div>
            {/* Footer Links */}
        </footer>




    )
    }
}