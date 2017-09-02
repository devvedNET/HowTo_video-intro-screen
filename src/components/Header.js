import React from 'react';
import logo from '../logo.png';

const Header = () => (
    <div className="Header">
        <img src={logo} className="logo" alt='devved.net logo' />
        <h1>Video Intro &amp; Thumbnail Generator
            <small>exclusively for the devved.net blog</small>
        </h1>
    </div>
);

export default Header; 