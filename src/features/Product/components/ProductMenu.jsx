import { Box, Link, makeStyles } from '@material-ui/core';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

ProductMenu.propTypes = {};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        listStyleType: 'none',
        padding: 0,

        '& > li': {
            padding: theme.spacing(2, 4),
        },
        '& > li > a': {
            color: theme.palette.grey[700],
            fontSize: '24px',
        },
        '& > li > a.active': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
    },
}));

function ProductMenu(props) {
    const classes = useStyles();

    const { url } = useRouteMatch();

    return (
        <Box component="ul" className={classes.root}>
            <li>
                <Link component={NavLink} to={url} exact>
                    Description
                </Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/additional`} exact>
                    Additional information
                </Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/reviews`} exact>
                    Reviews
                </Link>
            </li>
        </Box>
    );
}

export default ProductMenu;
