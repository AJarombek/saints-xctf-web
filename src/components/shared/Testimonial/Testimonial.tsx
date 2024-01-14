/**
 * Component representing a testimonial for the application.
 * @author Andrew Jarombek
 * @since 1/22/2020
 */

import React, { ReactNode } from 'react';

interface IProps {
  src: string;
  name: string;
  title: string;
  testimony: ReactNode;
}

const Testimonial: React.FunctionComponent<IProps> = ({ src, name, title, testimony }) => {
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

export default Testimonial;
