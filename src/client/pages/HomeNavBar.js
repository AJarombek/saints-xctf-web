/**
 * Home navigation bar displayed at the top of the home page.
 * @author Andrew Jarombek
 * @since 1/12/2020
 */

import {AJButton} from 'jarombek-react-components';

const HomeNavBar = () => {
    return (
        <div className="sxctf-home-nav-bar">
            <figure className="sxctf-logo">
                <img src={} />
            </figure>
            <h1>SaintsXCTF</h1>
            <div>
                <AJButton type="text">About</AJButton>
                <AJButton type="text">Testimonials</AJButton>
                <AJButton type="outlined">Sign Up</AJButton>
                <AJButton type="contained">Log In</AJButton>
            </div>
        </div>
    );
};

export default HomeNavBar;
