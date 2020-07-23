/**
 * Container component for an input element that has an identification icon and a validation icon.
 * @author Andrew Jarombek
 * @since 5/2/2020
 */

import React, {ChangeEvent} from 'react';
import classnames from 'classnames';

enum ImageInputStatus { NONE, SUCCESS, WARNING, FAILURE }

interface IProps {
  type: string,
  name: string
  placeholder: string,
  autoComplete?: string,
  maxLength?: number,
  onChange: (event: ChangeEvent<HTMLInputElement>) => any,
  icon?: any,
  status: ImageInputStatus
}

const ImageInput: React.FunctionComponent<IProps> = ({ type, name, placeholder, autoComplete = "", maxLength, onChange, icon,
                      status = ImageInputStatus.NONE }) => {

  let statusIcon, statusClass;
  switch (status) {
    case ImageInputStatus.NONE:
      statusIcon = null;
      statusClass = 'none';
      break;
    case ImageInputStatus.SUCCESS:
      statusIcon = '\u0052';
      statusClass = 'success';
      break;
    case ImageInputStatus.WARNING:
      statusIcon = '\u004f';
      statusClass = 'warning';
      break;
    case ImageInputStatus.FAILURE:
      statusIcon = '\u0051';
      statusClass = 'failure';
      break;
    default:
      statusIcon = null;
      statusClass = 'none';
  }

  return (
    <div className="sxctf-image-input">
      {icon ?
        <img src={icon} alt="" />
        :
        <div className="no-icon"> </div>
      }
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        onChange={onChange}
      />
      <div>
        <div className={classnames("status", statusClass)}>
          <p>{statusIcon}</p>
        </div>
      </div>
    </div>
  );
};

export {ImageInputStatus};
export default ImageInput;
