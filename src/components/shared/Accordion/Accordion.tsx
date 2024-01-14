/**
 * Component for an accordion that displays additional content when opened.
 * @author Andrew Jarombek
 * @since 8/9/2020
 */

import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import classNames from 'classnames';

interface Props {
  id?: string;
  iconNode: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  expandable?: boolean;
  defaultState?: boolean;
}

const useStyles = createUseStyles(styles);

const Accordion: React.FunctionComponent<Props> = ({
  id,
  iconNode,
  title,
  children,
  onClick,
  expandable = true,
  defaultState = false,
}) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(defaultState);

  const onOpen = (): void => {
    if (expandable) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div id={id} className={classNames(classes.accordion, 'accordion')} onClick={onClick}>
      <div className={classes.header} onClick={onOpen}>
        <p className={classes.icon}>{iconNode}</p>
        <div className={classes.title}>{title}</div>
        <p className={classNames(classes.arrow, 'expandIcon')}>
          {expandable ? (isOpen ? '\u0042' : '\u0043') : '\u0045'}
        </p>
      </div>
      {isOpen && expandable && <div className={classes.body}>{children}</div>}
    </div>
  );
};

export default Accordion;
