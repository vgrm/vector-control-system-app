import { React, useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
//import UploadService from "../../actions/upload-files.service";
import * as actions from '../../actions/projectData';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ListItem, FormGroup, CustomInput } from 'reactstrap';
import { Typography, Input, Button, Box, Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles } from "@material-ui/core";
import UploadFile from './UploadFile';
import { useToasts } from "react-toast-notifications";
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import colors from '../../Constants/colors';

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

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    icon: {
        color: "#607d8b"
    },
    iconRed: {
        color: "#e53935"
    }
})

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
    const [file, setFile] = useState('undefined');
    const { addToast } = useToasts()

    useEffect(() => {
        console.log('USEEFEKT: ', file);
        console.log(file[0].name)
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
        let formData = new FormData();
        formData.append('name', file[0].name);
        formData.append('file', file[0]);
        formData.append('projectsetId', props.projectSet.id);
        console.log(file);
        console.log(file[0].name);

        console.log(formData);
        console.log("FORMDATANAME", formData.name);
        console.log(props);

        if (window.confirm('Are you sure you want to upload this project?')) {

            props.createProjectData(formData, () => addToast("Submitted successfully", { appearance: 'success', placement: 'bottom-right' }))
        }

        //props.createProjectData(formData);

    }

    return (
        <Grid>
            <Container>
            <Box p={1}>
            <Typography variant="h6">
                                Add new project to set
                            </Typography>
                            </Box>
                <Box p={1}>
                    <Grid>
                        <Grid item className="grid-el" xs={12} md={5}>
                            <Box m={1}>
                                <ColorButton
                                    variant="contained"
                                    component="label"
                                >
                                    Choose file
                            <Input
                                        type="file"
                                        hidden
                                        onChange={fileChange}
                                    />
                                </ColorButton>
                            
                            <ColorButton2 variant="contained" onClick={() => handleUpload()}>
                                Upload <PublishOutlinedIcon />
                            </ColorButton2>
                            </Box>

                        </Grid>
                        <Grid item className="grid-el" xs={12} md={5}>
                        <Typography variant="caption">
                                {file[0].name ? file[0].name : '_'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

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

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProjectDataUpload));