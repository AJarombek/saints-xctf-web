/**
 * Container component for an input element that has an identification icon and a validation icon.
 * @author Andrew Jarombek
 * @since 5/2/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

const ImageInput = ({ type, name, placeholder, onChange, icon, status = 0, successIcon,
                      failureIcon, warningIcon }) => {

  let statusIcon;
  switch (status) {
    case SUCCESS:
      statusIcon = successIcon;
      break;
    case WARNING:
      statusIcon = warningIcon;
      break;
    case FAILURE:
      statusIcon = failureIcon;
      break;
    default:
      statusIcon = failureIcon;
  }

  return (
    <div className="sxctf-image-input">
      {icon && <img src={icon} alt="" />}
      <input name={name} type={type} placeholder={placeholder} onChange={onChange} />
      <img src={statusIcon} alt />
    </div>
  );
};

export const SUCCESS = 0;
export const WARNING = 1;
export const FAILURE = 2;

ImageInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.any,
  status: PropTypes.oneOf([SUCCESS, WARNING, FAILURE]),
  successIcon: PropTypes.any,
  failureIcon: PropTypes.any,
  warningIcon: PropTypes.any
};

export default ImageInput;
