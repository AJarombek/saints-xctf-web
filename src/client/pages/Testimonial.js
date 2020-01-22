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
      <figure>
        <img src={src} />
      </figure>
      <div>
        <p>{testimony}</p>
        <p>{title}</p>
        <p>{name}</p>
      </div>
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
