/**
 * Footer section of the home page linking to different sources.
 * @author Andrew Jarombek
 * @since 1/21/2020
 */

import React from 'react';
import saints_xctf_logo from '../../assets/saintsxctf_logo.png';

const HomeFooter = () => {
    return (
        <div className="sxctf-home-footer">
          <a href="mailto:andrew@jarombek.com">Contact Us</a>
          <figure className="sxctf-logo">
            <img src={saints_xctf_logo} />
          </figure>
        </div>
    );
};

export default HomeFooter;
