/**
 * Footer section of the home page linking to different sources.
 * @author Andrew Jarombek
 * @since 1/21/2020
 */

import React from 'react';

// @ts-ignore
import saints_xctf_logo from '../../../../assets/saintsxctf_logo.png';

interface IProps {
    showContactUs?: boolean;
}

const HomeFooter: React.FunctionComponent<IProps> = ({ showContactUs = true }) => {
  return (
    <div className="sxctf-home-footer">
        {showContactUs && <a className="contact-us-link" href="mailto:andrew@jarombek.com">Contact Us</a>}
      <a className="sxctf-logo-link" href="#">
        <figure className="sxctf-logo">
          <img src={saints_xctf_logo} alt=""/>
        </figure>
      </a>
    </div>
  );
};

export default HomeFooter;
