/**
 * DashboardPaginationBar component which paginates the log feed.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import classNames from "classnames";

interface IProps {
    page: number;
    totalPages: number;
    onChangePage: (page: number) => void;
}

const useStyles = createUseStyles(styles);

const PaginationBar: React.FunctionComponent<IProps> = ({ page, totalPages, onChangePage }) => {
    const classes = useStyles();

    return (
        <div id="paginationBar" className={classes.paginationBar}>
            {page > 3 && (
                <div className={classNames(classes.page, classes.otherPage)} onClick={() => onChangePage(1)}>
                    1
                </div>
            )}
            {page > 4 && (
                <div className={classes.spread}>...</div>
            )}
            {page > 2 && (
                <div className={classNames(classes.page, classes.otherPage)} onClick={() => onChangePage(page - 2)}>
                    {page - 2}
                </div>
            )}
            {page > 1 && (
                <div className={classNames(classes.page, classes.otherPage)} onClick={() => onChangePage(page - 1)}>
                    {page - 1}
                </div>
            )}
            <div className={classNames(classes.page, classes.currentPage)}>
                {page}
            </div>
            {totalPages > page && (
                <div className={classNames(classes.page, classes.otherPage)}  onClick={() => onChangePage(page + 1)}>
                    {page + 1}
                </div>
            )}
            {totalPages > (page + 1) && (
                <div className={classNames(classes.page, classes.otherPage)}  onClick={() => onChangePage(page + 2)}>
                    {page + 2}
                </div>
            )}
        </div>
    );
};

export default PaginationBar;
