/**
 * Component representing a testimonial for the application.
 * @author Andrew Jarombek
 * @since 1/22/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

const Testimonial = ({src, name, title, testimony}) => {
  return (
    <div className="sxctf-testimonial">
      <p>"{testimony}"</p>
      <div>
        <figure>
          <img src={src} alt="" loading="lazy" />
        </figure>
      </div>
      <p>{name}</p>
      <p>{title}</p>
    </div>
  );
};

Testimonial.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  testimony: PropTypes.node.isRequired,
};

export default Testimonial;
