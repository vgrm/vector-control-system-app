import React, { useState, useEffect } from "react";
import { CssBaseline, Avatar, Typography, Container, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../../actions/user";
import { useToasts } from "react-toast-notifications";
import { useParams } from 'react-router-dom';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import colors from "../../Constants/colors";
import { makeStyles, withStyles } from '@material-ui/core/styles';

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

const CssFormControl = withStyles({
    root: {
        '& label.Mui-focused': {
            color: colors.secondaryColorLight,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: colors.primaryColorLight,
        },
        '& .MuiFormControl-fullWidth	': {

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
})(FormControl);

const ColorButton = withStyles(theme => ({
    root: {
        color: colors.white,
        backgroundColor: colors.primaryColor,
        '&:hover': {
            backgroundColor: colors.primaryColorDark,
        },
    },
}))(Button);

const ColorButton2 = withStyles(theme => ({
    root: {
        color: colors.white,
        backgroundColor: colors.secondaryColor,
        '&:hover': {
            backgroundColor: colors.secondaryColorDark,
        },
    },
}))(Button);

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

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        },
        '& .MuiFormControl-root	': {
            margin: theme.spacing(1),
            minWidth: 230,
        },
    },
    FormControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    firstName: '',
    lastName: '',
    email: '',
    roleId: -2
}

const UserForm = ({ ...props }) => {
    const classes = useStyles();
    const { addToast } = useToasts()
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    const inputLabel = React.useRef(null);
    const labelWidth = React.useState(0);
    const params = useParams();

    useEffect(() => {
        props.userSelect(params.username);
        setValues({
            ...props.user.userSelected
        })
        setErrors({})
    }, [props, params.username])//componentDidMount

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
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

    const deleteUser = () => {
        props.deleteUser(params.username);
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                //onSubmited()
                addToast("Submitted successfully", { appearance: 'success', placement: 'bottom-left' })
            }
            props.updateUser(params.username, values, onSuccess);
            //props.createProjectSet(values, onSuccess)
            //props.createProjectSet(values, onSuccess)
            //props.signinUser(values, onSuccess);
            //console.log("SUBMITING DATA", values, props);
            //nextPath('/');
        }
        console.log("SUBMITING DATA", values, props);
    }

    return (
        <Container>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <ListAltOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        User Form
                </Typography>
                    {((props.user.isLoggedIn && props.user.userCurrent.username === params.username)
                        || (props.user.isLoggedIn && props.user.userCurrent.roleId === -1))
                        &&
                        <form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <CssTextField
                                        variant="outlined"
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="email"
                                        value={values.email}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CssTextField
                                        variant="outlined"
                                        fullWidth
                                        id="firstName"
                                        name="firstName"
                                        label="firstName"
                                        value={values.firstName}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CssTextField
                                        variant="outlined"
                                        fullWidth
                                        id="lastName"
                                        name="lastName"
                                        label="lastName"
                                        value={values.lastName}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                {(props.user.isLoggedIn && props.user.userCurrent.roleId === -1) &&
                                    <Grid item xs={12}>
                                        <CssFormControl variant="outlined" fullWidth
                                            {...(errors.roleId && { error: true })}
                                        >
                                            <InputLabel ref={inputLabel}>RoleId</InputLabel>
                                            <Select
                                                name="roleId"
                                                value={values.roleId}
                                                onChange={handleInputChange}
                                                labelWidth={labelWidth}
                                            >
                                                <MenuItem value="">Select Role</MenuItem>
                                                <MenuItem value="-2">User</MenuItem>
                                                <MenuItem value="-1">Admin</MenuItem>
                                            </Select>
                                            {errors.roleId && <FormHelperText>{errors.roleId}</FormHelperText>}
                                        </CssFormControl>
                                    </Grid>}
                            </Grid>
                            <ColorButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                save changes
                    </ColorButton>
                            <ColorButton2
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={deleteUser}
                            >
                                Delete user
                    </ColorButton2>
                        </form>
                    }
                </div>
            </Container>

        </Container>

    );
}

const mapStateToProps = state => ({
    user: state.user,
    //projectSetList: state.projectSet.owned,
    //selectedSet: state.projectSet.selectedSet
})

const mapActionToProps = {
    userSelect: actions.fetchByUsername,
    updateUser: actions.update,
    deleteUser: actions.Delete
    //createProjectSet: actions.create,
    //updateProjectSet: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(UserForm));