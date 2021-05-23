import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
//import useSignupForm from './useSignupForm';
import { connect } from "react-redux";
import * as actions from "../../actions/user";
import { useHistory } from 'react-router-dom';
//import { Card, Row, Col, Form, Button } from "react-bootstrap";

//import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import colors from "../../Constants/colors";

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: colors.secondaryColorLight,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: colors.primaryColorLight,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: colors.secondaryColorLight,
            },
            '&:hover fieldset': {
                borderColor: colors.primaryColorDark,
            },
            '&.Mui-focused fieldset': {
                borderColor: colors.primaryColorLight,
            },
        },
    },
})(TextField);

const ColorButton = withStyles(theme => ({
    root: {
        color: colors.white,
        backgroundColor: colors.primaryColor,
        '&:hover': {
            backgroundColor: colors.primaryColorDark,
        },
    },
}))(Button);

function Copyright() {
    return (
        <Typography variant="body2" color={colors.primaryColor} align="center">
            <Link color="inherit" href="/">
                Vector Control System
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: colors.primaryColor,
        //    theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const initialFieldValues = {
    username: '',
    password: '',
    password2: ''
}


const Signup = ({ ...props }) => {
    const classes = useStyles();
    const { addToast } = useToasts()
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const history = useHistory();

    const nextPath = (path) => {
        history.push(path);
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        console.log(temp)
        console.log(fieldValues)
        console.log(values)
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "This field is required."
        if ('password2' in fieldValues) {
            //temp.password2 = fieldValues.password2 == fieldValues.password ? "" : "Passwords don't match."
            temp.password2 = fieldValues.password2 ? "" : "This field is required."
        }
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const validateSubmit = (fieldValues = values) => {
        let temp = { ...errors }
        console.log(temp)
        console.log(fieldValues)
        console.log(values)
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "This field is required."
        if ('password2' in fieldValues) {
            //temp.password2 = fieldValues.password2 == fieldValues.password ? "" : "Passwords don't match."
            temp.password2 = fieldValues.password2 ? "" : "This field is required."
        }
        if (values.password2 !== values.password) {
            temp.password2 = "Passwords do not match"
        }
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validateSubmit()) {
            const onSuccess = () => {

                addToast("Signed up successfully", { appearance: 'success', placement: 'bottom-left' })
                nextPath('/');
            }
            const onError = () => {

                addToast("Invalid username", { appearance: 'warning', placement: 'bottom-left' })
            }

            props.signupUser(values, onSuccess, onError);
            //nextPath('/');
        }
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
    }

    return (
        <Container>
            {!props.user.isLoggedIn &&
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Signup
                </Typography>
                        <form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <CssTextField
                                        //autoComplete="username"
                                        name="username"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        autoFocus
                                        onChange={handleInputChange}
                                        {...(errors.username && { error: true, helperText: errors.username })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CssTextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        onChange={handleInputChange}
                                        {...(errors.password && { error: true, helperText: errors.password })}
                                    //autoComplete="current-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CssTextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password2"
                                        label="Password Repeat"
                                        type="password"
                                        id="password2"
                                        onChange={handleInputChange}
                                        {...(errors.password2 && { error: true, helperText: errors.password2 })}
                                    //autoComplete="current-password"
                                    />
                                </Grid>
                            </Grid>
                            <ColorButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Signup
                            </ColorButton>

                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Typography component="h1" variant="h5">
                                        <Link href="/signin" variant="body2" color="inherit">
                                            Already have an account? Signin
                            </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Container>
            }
        </Container>
    );
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionToProps = {
    signupUser: actions.signup
}

export default connect(mapStateToProps, mapActionToProps)(Signup);
