/**
 * Grouping of {@code ImageInput} components.
 * @author Andrew Jarombek
 * @since 5/6/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ImageInputSet = ({ children, direction = ROW }) => {

  return (
    <div className={classnames("sxctf-image-input-set", direction)}>
      <form>
        { children }
      </form>
    </div>
  );
};

export const ROW = "row";
export const COLUMN = "column";

ImageInputSet.Direction = {
  ROW, COLUMN
};

ImageInputSet.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf([ROW, COLUMN])
};

export default ImageInputSet;
