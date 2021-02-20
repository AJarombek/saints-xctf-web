/**
 * Container component for an input element that has an identification icon and a validation icon.
 * @author Andrew Jarombek
 * @since 5/2/2020
 */

import React, { ChangeEvent, KeyboardEvent, useRef } from 'react';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

enum ImageInputStatus {
  NONE,
  SUCCESS,
  WARNING,
  FAILURE
}

interface Props {
  type: string;
  name: string;
  placeholder: string;
  minValue?: number;
  autoComplete?: string;
  maxLength?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => any;
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => any;
  useCustomValue?: boolean;
  value?: string;
  icon?: any;
  status: ImageInputStatus;
  className?: ClassValue;
}

const ImageInput: React.FunctionComponent<Props> = ({
  type,
  name,
  placeholder,
  minValue,
  autoComplete = '',
  maxLength,
  onChange,
  onKeyUp,
  useCustomValue,
  value,
  icon,
  status = ImageInputStatus.NONE,
  className
}) => {
  const inputRef = useRef(null);

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
    <div className={classNames('sxctf-image-input', className)}>
      {icon ? <img src={icon} alt="" /> : <div className="no-icon"> </div>}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        min={minValue}
        value={useCustomValue ? value : inputRef.current?.value}
        autoComplete={autoComplete}
        maxLength={maxLength}
        onChange={onChange}
        onKeyUp={onKeyUp}
        ref={inputRef}
      />
      <div>
        <div className={classNames('status', statusClass)}>
          <p>{statusIcon}</p>
        </div>
      </div>
    </div>
  );
};

export { ImageInputStatus };
export default ImageInput;
