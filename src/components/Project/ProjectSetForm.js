import React, { useState, useEffect, useRef } from "react";
import { CssBaseline, Avatar, Typography, Container, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useProjectSetForm from "./useProjectSetForm";
import { connect } from "react-redux";
import * as actions from "../../actions/projectSet";
import { useToasts } from "react-toast-notifications";
import { useHistory, useParams } from 'react-router-dom';
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
    name: '',
    description: '',
    status: '',
    ownerId: 0
}

const ProjectSetForm = ({ ...props }) => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(0)
    //toast msg.
    const { addToast } = useToasts();
    const params = useParams();
    const valueOrNull = (value = null) => value;

    //let currentSet = 0;
    if (valueOrNull(props.projectSetList.find(x => x.id == params.projectsetId)) != null) {
        //currentSet = props.projectSetList.find(x => x.id === params.projectsetId);
    }

    useEffect(() => {
        console.log('1 ' + params.projectsetId)
        setCurrentId(params.projectsetId)
        console.log(currentId)
    }, [params.projectsetId])

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "This field is required."
        if ('status' in fieldValues)
            temp.status = fieldValues.status ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useProjectSetForm(initialFieldValues, validate, setCurrentId)

    //material-ui select
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    /*
        useEffect(() => {
            //setLabelWidth(inputLabel.current.offsetWidth);
        }, []);
    */
    const history = useHistory();

    const onSubmited = () => {
        nextPath('/projectsets/');
    }

    const nextPath = (path) => {
        history.push(path);
    }

    const handleSubmit = e => {
        //console.log('save set')
        //console.log(currentId)
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {

                addToast("Set information saved successfully", { appearance: 'success', PlacementType: 'bottom-left' })
                onSubmited()
            }
            //props.createProjectSet(values, onSuccess)

            if (currentId == 0) {
                props.createProjectSet(values, onSuccess)

            }
            else
                props.updateProjectSet(currentId, values, onSuccess)
        }

    }
    /*
        useEffect(() => {
            console.log('2' + params.projectsetId)
            if (params.projectsetId != 0) {
                console.log('if')
                setValues({
                    ...props.projectSetList.find(x => x.id === params.projectsetId)
    
                })
                //console.log(props.projectSetList.find(x => x.id === params.projectsetId))
                setErrors({})
            }
            console.log(values);
        }, [])
    */
    useEffect(() => {
        if (currentId != 0) {
            setValues({
                ...props.projectSetList.find(x => x.id == currentId)
            })
            setErrors({})
        }
    }, [currentId])


    return (
        <Container>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <ListAltOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Project Set Form
                </Typography>
                    {(props.user.isLoggedIn) &&
                        ((props.selectedSet.ownerId == props.user.userCurrent.id)
                            ||
                            (params.projectsetId == 0))
                        &&
                        <form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <CssTextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="name"
                                        label="Set Name"
                                        id="name"
                                        value={values.name}
                                        onChange={handleInputChange}
                                        {...(errors.name && { error: true, helperText: errors.name })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CssTextField
                                        //autoComplete="username"
                                        name="description"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="description"
                                        label="Description"
                                        value={values.description}
                                        onChange={handleInputChange}
                                        {...(errors.description && { error: true, helperText: errors.description })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CssFormControl variant="outlined" fullWidth
                                        {...(errors.status && { error: true })}
                                    >
                                        <InputLabel ref={inputLabel}>Status</InputLabel>
                                        <Select
                                            name="status"
                                            value={values.status}
                                            onChange={handleInputChange}
                                            labelWidth={100}
                                        >
                                            <MenuItem value="">Select Status</MenuItem>
                                            <MenuItem value="-3">Private</MenuItem>
                                            <MenuItem value="-2">Closed</MenuItem>
                                            <MenuItem value="-1">Open</MenuItem>
                                        </Select>
                                        {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
                                    </CssFormControl>
                                </Grid>
                            </Grid>
                            <ColorButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Submit
                    </ColorButton>
                            <ColorButton2
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={resetForm}
                            >
                                Reset
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
    projectSetList: state.projectSet.owned,
    selectedSet: state.projectSet.selectedSet
})

const mapActionToProps = {
    createProjectSet: actions.create,
    updateProjectSet: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProjectSetForm));