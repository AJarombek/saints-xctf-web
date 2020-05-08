/**
 * Container component for an input element that has an identification icon and a validation icon.
 * @author Andrew Jarombek
 * @since 5/2/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ImageInput = ({ type, name, placeholder, onChange, icon, status = 0 }) => {

  let statusIcon, statusClass;
  switch (status) {
    case NONE:
      statusIcon = null;
      statusClass = 'none';
      break;
    case SUCCESS:
      statusIcon = '\u0052';
      statusClass = 'success';
      break;
    case WARNING:
      statusIcon = '\u004f';
      statusClass = 'warning';
      break;
    case FAILURE:
      statusIcon = '\u0051';
      statusClass = 'failure';
      break;
    default:
      statusIcon = null;
      statusClass = 'none';
  }

  return (
    <div className="sxctf-image-input">
      {icon && <img src={icon} alt="" />}
      <input name={name} type={type} placeholder={placeholder} onChange={onChange} />
      <div>
        <div className={classnames("status", statusClass)}>
          <p>{statusIcon}</p>
        </div>
      </div>
    </div>
  );
};

export const NONE = 0;
export const SUCCESS = 1;
export const WARNING = 2;
export const FAILURE = 3;

ImageInput.Status = {
  NONE, SUCCESS, WARNING, FAILURE
};

ImageInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.any,
  status: PropTypes.oneOf([NONE, SUCCESS, WARNING, FAILURE]),
  successIcon: PropTypes.any,
  failureIcon: PropTypes.any,
  warningIcon: PropTypes.any
};

export default ImageInput;
