/**
 * Home component displayed when no user is singed in and the website is accessed.
 * @author Andrew Jarombek
 * @since 1/12/2020
 */

import React from 'react';
import HomeNavBar from './HomeNavBar';
import HomeBody from './HomeBody';

const Home = () => {
    return (
        <div className="sxctf-home">
            <HomeNavBar />
            <HomeBody />
        </div>
    );
};

export default Home;
