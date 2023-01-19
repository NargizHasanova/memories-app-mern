import React, { useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import { logout } from '../../redux/usersSlice';


const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);
    // const location = useLocation();
    const classes = useStyles();

    const logOut = () => {
        dispatch(logout());
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            // tokenin vaxti expire olubsa logOut etsin
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logOut()
            }
        }
    }, []);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            alt={user?.name}
                            src={user?.imageUrl}>
                            {user?.name?.charAt(0)}
                        </Avatar>
                        <Typography
                            className={classes.userName}
                            variant="h6">
                            {user?.name}
                        </Typography>
                        <Button
                            variant="contained"
                            className={classes.logout}
                            color="secondary"
                            onClick={logOut}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;