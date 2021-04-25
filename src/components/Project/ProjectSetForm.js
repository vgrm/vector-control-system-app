import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useProjectSetForm from "./useProjectSetForm";
import { connect } from "react-redux";
import * as actions from"../../actions/projectSet";
import { useToasts } from "react-toast-notifications";
import { projectSet } from './../../reducers/projectSet';
import {Link, withRouter, useHistory, useParams } from 'react-router-dom';

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
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

const ProjectSetForm = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    //toast msg.
    const { addToast } = useToasts()
    const params = useParams();

    useEffect(() => {
        console.log(params)
        console.log(props)
        
        if (params.projectsetId != 0) {
            setCurrentId(params.projectsetId)
        }
    }, [params])

    //validate()
    //validate({fullName:'jenny'})
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

        if (fieldValues == values)
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
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const history = useHistory();
    
    const onSubmited = () => {
            nextPath('/projectsets/');
    }

    const nextPath = (path) => {
        history.push(path);
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                onSubmited()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            //props.createProjectSet(values, onSuccess)
            
            if (currentId == 0){
                props.createProjectSet(values, onSuccess)
                console.log("SUBMITING DATA",values,props)
            }
            else
                props.updateProjectSet(currentId, values, onSuccess)
        }
        console.log("SUBMITING DATA",values,props);
    }

    useEffect(() => {
        console.log(params)
        console.log(props)
        console.log(currentId)
        if (currentId != 0) {
            console.log("SETVALUES")
            setValues({
                ...props.projectSetList.find(x => x.id == currentId)
            })
            setErrors({})
        }
        console.log(values);
    }, [currentId])


    return (
    <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
    <Grid container>
        <Grid item xs={6}>
            <TextField
                name="name"
                variant="outlined"
                label="Set Name"
                value={values.name}
                onChange={handleInputChange}
                {...(errors.name && { error: true, helperText: errors.name })}
            />
            <TextField
                name="description"
                variant="outlined"
                label="Description"
                value={values.description}
                onChange={handleInputChange}
                {...(errors.description && { error: true, helperText: errors.description })}
            />
            <FormControl variant="outlined"
                className={classes.formControl}
                {...(errors.status && { error: true })}
            >
                <InputLabel ref={inputLabel}>Status</InputLabel>
                <Select
                    name="status"
                    value={values.status}
                    onChange={handleInputChange}
                    labelWidth={labelWidth}
                >
                    <MenuItem value="">Select Status</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                    <MenuItem value="Open">Open</MenuItem>
                </Select>
                {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.smMargin}
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    className={classes.smMargin}
                    onClick={resetForm}
                >
                    Reset
                </Button>
            </div>
        </Grid>
    </Grid>
</form>
);
}

const mapStateToProps = state => ({
    projectSetList: state.projectSet.list
})

const mapActionToProps = {
    createProjectSet: actions.create,
    updateProjectSet: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProjectSetForm));