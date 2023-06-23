import React from "react"
import './Footer.css'
import { Link } from "react-router-dom";
import image from './Screenshot_4-removebg-preview.png';

const Footer = () => 
<footer class="footer-distributed">

<div class="footer-left">
    <h3>Placio<span>Car</span></h3>
    {/*<h1><Link to="/home" className=" d-flex align-items-center gap-2">
                  <img src={image} height="70px"/>
                 </Link></h1>*/}

    <p class="footer-links">
        <a href="#">Home</a>
        |
        <a href="#">About</a>
        |
        <a href="#">Contact</a>
        |
        <a href="#">Blog</a>
    </p>

    <p class="footer-company-name">Copyright © 2021 <strong>SagarDeveloper</strong> All rights reserved</p>
</div>

<div class="footer-center">
    <div>
        <i class="fa fa-map-marker"></i>
        <p><span>Ghaziabad</span>
            Delhi</p>
    </div>

    <div>
        <i class="fa fa-phone"></i>
        <p>+91 74**9**258</p>
    </div>
    <div>
        <i class="fa fa-envelope"></i>
        <p><a href="mailto:sagar00001.co@gmail.com">xyz@gmail.com</a></p>
    </div>
</div>
<div class="footer-right">
    <p class="footer-company-about">
        <span>About the company</span>
        <strong>Sagar Developer</strong> is a Youtube channel where you can find more creative CSS Animations
        and
        Effects along with
        HTML, JavaScript and Projects using C/C++.
    </p>
    <div class="footer-icons">
        <a href="#"><i class="fa fa-facebook"></i></a>
        <a href="#"><i class="fa fa-instagram"></i></a>
        <a href="#"><i class="fa fa-linkedin"></i></a>
        <a href="#"><i class="fa fa-twitter"></i></a>
        <a href="#"><i class="fa fa-youtube"></i></a>
    </div>
</div>
</footer>


export default Footer;