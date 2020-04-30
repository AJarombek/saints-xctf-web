/**
 * Footer section of the home page linking to different sources.
 * @author Andrew Jarombek
 * @since 1/21/2020
 */

import React from 'react';
import saints_xctf_logo from '../../../assets/saintsxctf_logo.png';

const HomeFooter = () => {
  return (
    <div className="sxctf-home-footer">
      <a className="contact-us-link" href="mailto:andrew@jarombek.com">Contact Us</a>
      <a className="sxctf-logo-link" href="#">
        <figure className="sxctf-logo">
          <img src={saints_xctf_logo}/>
        </figure>
      </a>
    </div>
  );
};

export default HomeFooter;
