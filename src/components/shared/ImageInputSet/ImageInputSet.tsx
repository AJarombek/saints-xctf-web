/**
 * Grouping of {@code ImageInput} components.
 * @author Andrew Jarombek
 * @since 5/6/2020
 */

import React, {ReactNode} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

enum ImageInputDirection { ROW = "row", COLUMN = "column" }

interface IProps {
    children: ReactNode;
    direction?: ImageInputDirection;
}

const ImageInputSet: React.FunctionComponent<IProps> = ({ children, direction = ImageInputDirection.ROW }) => {

  return (
    <div className={classnames("sxctf-image-input-set", direction)}>
      <form>
        { children }
      </form>
    </div>
  );
};

export {ImageInputDirection};
export default ImageInputSet;
