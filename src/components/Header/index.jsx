import { makeStyles } from '@material-ui/core';
import { Close } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Register from 'features/Auth/components/Register';
import * as React from 'react';
import { useState } from 'react';
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

export default function Header() {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <CodeIcon className={classes.menuButton} fontSize="large" />
                    <Typography className={classes.title} variant="h6" component="div" sx={{ flexGrow: 1 }}>
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

                    <Button color="inherit" onClick={handleClickOpen}>Register</Button>

                </Toolbar>
            </AppBar>
            <Dialog
                disableEscapeKeyDown
                open={open}
                onClose={handleClose}
            >
                <IconButton className={classes.closeBtn} onClick={handleClose}>
                    <Close />
                </IconButton>
                <DialogContent>
                    <Register closeDialog={handleClose} />
                </DialogContent>

            </Dialog>
        </div>

    );
}
