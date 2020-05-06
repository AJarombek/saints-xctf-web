/**
 * Grouping of {@code ImageInput} components.
 * @author Andrew Jarombek
 * @since 5/6/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

const ImageInputSet = ({ children }) => {
  return (
    <div className="sxctf-image-input-set">
      { children }
    </div>
  );
};

ImageInputSet.propTypes = {
  children: PropTypes.node.isRequired
};

export default ImageInputSet;
