import { React, useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
//import UploadService from "../../actions/upload-files.service";
import * as actions from '../../actions/projectData';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, ListItem, Input, Button, FormGroup,CustomInput } from 'reactstrap';
import { Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles } from "@material-ui/core";
import UploadFile from './UploadFile';
import { useToasts } from "react-toast-notifications";

const initialValues = {
    selectedFiles: undefined,
    currentFile: undefined,
    progress: 0,
    message: "",
    isError: false,
    fileInfos: [],
};

const ProjectDataUpload = ({ classes, ...props }) => {

    const [values, setValues] = useState(initialValues)
    const [file, setFile] = useState(undefined);
    const { addToast } = useToasts()

    useEffect(() => {
        console.log('USEEFEKT: ',file);
    }, [file])//componentDidMount

    const {
        selectedFiles,
        currentFile,
        progress,
        message,
        fileInfos,
        isError
    } = UploadFile(initialValues, props.setCurrentId)
    //= this.state;

    const fileChange = (e) => {
        //setValues.selectedFiles();
        setFile(e.target.files);
        e.preventDefault();

        //console.log(file);
        //console.log(file[0]);
        //console.log(file[0].name);
        //console.log("FILE ",file[0]);
        //console.log(file[0]);
        //console.log("FILE CHANGED: ",file[0].name);
        //let formData = new FormData();
        //formData.append('name', file[0].name)
        //formData.append('fileData', file[0])
    }

    const handleUpload = () => {



        const onSuccess = () => {
            addToast("Submitted successfully", { appearance: 'success' })
        }
        let formData = new FormData();
        formData.append('name', file[0].name);
        formData.append('file', file[0]);
        formData.append('projectsetId', props.projectSet.id);
        console.log(file);
        console.log(file[0].name);
        
        console.log(formData);
        console.log("FORMDATANAME",formData.name);
        console.log(props);

        if (window.confirm('Are you sure you want to upload this project?')) {

            props.createProjectData(formData, () => addToast("Submitted successfully", { appearance: 'success', placement: 'bottom-right' }))
        }

        //props.createProjectData(formData);
        
    }

    return (
        <Grid>
            <Container>
            <Input type="file" name="file" id="exampleFile" onChange={fileChange} />
                
            <Button variant="contained" onClick={() => { handleUpload() }} >BUTTON TO SUBMIT FILE</Button>
            </Container>
        </Grid>

    );
}

const mapStateToProps = state => ({
    projectDataList: state.projectData.list
})

const mapActionToProps = {
    fetchAllProjectData: actions.fetchAll,
    createProjectData: actions.create
    //deleteProjectSet: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(ProjectDataUpload);