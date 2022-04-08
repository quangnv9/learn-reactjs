import { makeStyles } from '@material-ui/core';
import { AccountCircle, Close } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'white',
    },
    closeBtn: {
        position: 'absolute' + '!important',
        top: theme.spacing(1),
        right: theme.spacing(1),
        color: theme.palette.grey[500],
        padding: theme.spacing(1),
        zIndex: 1,
    }
}))

const MODE = {
    REGISTER: 'register',
    LOGIN: 'login',
}

export default function Header() {

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const dispatch = useDispatch()

    const loggedInUser = useSelector(state => state.user.currentUser);
    const isLoggedIn = !!loggedInUser.id;
    const [anchorEl, setAnchorEl] = useState(null);
    const popoverOpen = Boolean(anchorEl)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserClick = (event) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        const action = logout();
        dispatch(action);
        setAnchorEl(null);
    }

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <CodeIcon className={classes.menuButton} fontSize="large" />
                    <Typography className={classes.title} component="div">
                        <Link className={classes.link} to="/">F8 Shop</Link>
                    </Typography>

                    <NavLink className={classes.link} to="/todos">
                        <Button color="inherit">Todos</Button>
                    </NavLink>

                    <NavLink className={classes.link} to="/albums">
                        <Button color="inherit">Albums</Button>
                    </NavLink>

                    <NavLink className={classes.link} to="/products">
                        <Button color="inherit">Product</Button>
                    </NavLink>

                    {!isLoggedIn && (
                        <Button color="inherit" onClick={handleClickOpen}>
                            Login
                        </Button>
                    )}

                    {isLoggedIn && (
                        <IconButton
                            onClick={handleUserClick}
                            color="inherit"
                        >
                            <AccountCircle ></AccountCircle>
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
            <Menu
                keepMounted
                open={popoverOpen}
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
            <Dialog
                disableEscapeKeyDown
                open={open}
                onClose={handleClose}
            >
                <IconButton className={classes.closeBtn} onClick={handleClose}>
                    <Close />
                </IconButton>
                <DialogContent>
                    {mode === MODE.REGISTER && (
                        <>
                            <Register closeDialog={handleClose} />
                            <Box textAlign="center">
                                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                                    Already have an account. Login here!
                                </Button>
                            </Box>
                        </>
                    )}
                    {mode === MODE.LOGIN && (
                        <>
                            <Login closeDialog={handleClose} />
                            <Box textAlign="center">
                                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                                    Dont have an account. Register here!
                                </Button>
                            </Box>
                        </>
                    )}

                </DialogContent>
            </Dialog>
        </div>

    );
}
