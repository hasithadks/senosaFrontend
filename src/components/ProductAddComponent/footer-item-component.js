import React, {Component} from 'react';
// import footerimg from "../Images/footerimg.jpg";
// import logo from "../Images/fb cover.jpg";

export default class ItemFooter extends Component{
    render(){
        return(
            <div>
                <footer id="footer" className="footer-hover-links-light mt-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 mb-4 mb-lg-0">
                                <h2 className="text-color-light font-weight-semibold text-1 mb-3">ABOUT SHENOSA</h2>
                                <p>Sri Lanka’s biggest fashion chain offers a wide range of clothes and accessories for Men, Women and Kids. The retail store houses a range of Homeware and Lifestyle products to compliment a comprehensive family shopping experience for all our customers.</p>
                            </div>
                            <div className="col-lg-4 ml-auto mb-4 mb-lg-0">
                                <h2 className="text-color-light font-weight-semibold text-1 mb-3">OUR LOCATION</h2>
                                <ul className="list list-unstyled">
                                    <li className="mb-2"><i className="fas fa-angle-right mr-2 ml-1"></i> <span className="text-color-light">Address:</span> 40 D. S. Senanayake Mawatha, Colombo 008</li>
                                    <li className="mb-2"><i className="fas fa-angle-right mr-2 ml-1"></i> <span className="text-color-light">Phone:</span> <a href="tel:0112 672 689">0112 672 689</a></li>
                                    <li className="mb-2"><i className="fas fa-angle-right mr-2 ml-1"></i> <span className="text-color-light">Email:</span> <a href="mailto:onlineshoppingwebsite18@gmail.com" className="link-underline-dark">onlineshoppingwebsite18@gmail.com</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-3">
                                <h2 className="text-color-light font-weight-semibold text-1 mb-3">QUICK LINKS</h2>
                                <ul className="list list-unstyled">
                                    <li className="mb-2"><i className="fas fa-angle-right mr-2 ml-1"></i> <a href="/login">Login</a></li>
                                    <li className="mb-2"><i className="fas fa-angle-right mr-2 ml-1"></i> <a href="/register">Register</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-copyright">
                            <div className="container">
                                <div className="row text-center text-md-left align-items-center">
                                    <div className="col-md-7 col-lg-8">
                                        <ul className="social-icons social-icons-transparent social-icons-icon-light social-icons-lg">
                                            <li className="social-icons-facebook"><a href="http://www.facebook.com/" target="_blank" title="Facebook"><i className="fab fa-facebook-f"></i></a></li>
                                            <li className="social-icons-twitter"><a href="http://www.twitter.com/" target="_blank" title="Twitter"><i className="fab fa-twitter"></i></a></li>
                                            <li className="social-icons-instagram"><a href="http://www.instagram.com/" target="_blank" title="Instagram"><i className="fab fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-5 col-lg-4"><p className="text-md-right pb-0 mb-0">Copyrights © 2020 <a style={{color:"red"}}>SHENOSA</a>. All Rights Reserved</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}
