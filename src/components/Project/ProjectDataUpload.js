import { React, useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
//import UploadService from "../../actions/upload-files.service";
import * as actions from '../../actions/projectData';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, ListItem, Input, Button, FormGroup,CustomInput } from 'reactstrap';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles } from "@material-ui/core";
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
    /*
    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);

        this.state = {
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",
            isError: false,
            fileInfos: [],
        };
    }
*/

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
        //console.log(file);
        //console.log(file[0]);
        console.log(file[0].name);
        console.log("FILE ",file[0]);
        console.log(file[0]);
        console.log("FILE CHANGED: ",file[0].name);
        //let formData = new FormData();
        //formData.append('name', file[0].name)
        //formData.append('fileData', file[0])
    }

    const handleUpload = () => {
        const onSuccess = () => {
            addToast("Submitted successfully", { appearance: 'success' })
        }
        let formData = new FormData();
        formData.append('name', file[0].name)
        formData.append('file', file[0])
        console.log(file);
        console.log(file[0].name);
        
        console.log(formData);
        console.log("FORMDATANAME",formData.name);
        props.createProjectData(formData);
        
    }

    return (
        <Grid>
            <Input type="file" name="file" id="exampleFile" onChange={fileChange} />
                
            <Button variant="contained" onClick={() => { handleUpload() }} >BUTTON TO SUBMIT FILE</Button>

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