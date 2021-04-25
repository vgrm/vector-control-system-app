import { React, useState, useEffect, Component } from 'react';
import { connect, useSelector } from 'react-redux';
import * as actions from '../../actions/projectData';
import { Box, Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button, Typography } from "@material-ui/core";
import { Input } from 'reactstrap';

import { useToasts } from "react-toast-notifications";
import ProjectDataList from './ProjectDataList';
import ProjectDataUpload from './ProjectDataUpload';

import ArcMatchList from '../Analysis/ArcMatchList';
import ArcIncorrectList from '../Analysis/ArcIncorrectList';
import ArcMissingList from '../Analysis/ArcMissingList';
import ArcHandleList from '../Analysis/ArcHandleList';

import LineMatchList from '../Analysis/LineMatchList';
import LineIncorrectList from '../Analysis/LineIncorrectList';
import LineMissingList from '../Analysis/LineMissingList';
import LineHandleList from '../Analysis/LineHandleList';

import { Link, withRouter, useHistory, useParams } from 'react-router-dom';

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const initialFieldValues = {
    name: '',
    description: '',
    status: '',
    ownerId: 0
}

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

const ProjectData = ({ classes, ...props }) => {

    const history = useHistory();
    const params = useParams();


    useEffect(() => {
        props.fetchProjectData(params.projectId);
        return () => { };
    }, [])//componentDidMount

    useEffect(() => {
        //props.fetchAllProjectData()
    }, [])//componentDidMount
    //toast msg.
    const { addToast } = useToasts()

    //const currentSet = props.projectSetList(x=> x.id == params.projectsetId);
    //const currentSet = useSelector(state=>state.projectSetList[params.projectsetId]);

    const onDelete = () => {
        if (window.confirm('Are you sure to delete this project?')) {
            props.deleteProjectData(params.projectId, () => addToast("Deleted successfully", { appearance: 'success', placement: 'bottom-right' }))
            //nextPath('/projectsets/');
        }
    }

    const onUpdate = () => {
        if (params.projectId != 0) {
            console.log(params)
            console.log(props)
        }
        //nextPath('/projectsetform/' + params.projectsetId);
        //else nextPath('/projectsetform/' + 0);
    }

    const nextPath = (path) => {
        history.push(path);
    }

    /*
    const onUpdate = (set) => {
        //setCurrentId(set.id); 
        //props.setCurrentProjectId(2);
        //console.log(props.currentProjectId);
        console.log("SET INFO");
        console.log(props);
        console.log(history);
        console.log(params);
        console.log(props.projectSetList[params.projectsetId]);
        if (window.confirm('Are you sure to update this set?')) {

            //props.updateProjectData(set.id, set, () => addToast("Updated successfully", { appearance: 'success', placement: 'bottom-right' }))
            //console.log("PROPS IN SET LIST",currentId);
            //console.log("STATE IN SET LIST",this.state);
        }
    }
*/
    return (
        <Container>
            <Box p={5}>
                <Paper>
                    <Container>
                        <Typography variant="caption">
                            Project Name
                        </Typography>
                        <Typography variant="h6">
                            {props.projectData.name}
                        </Typography>
                        <Typography variant="caption">
                            Owner
                        </Typography>
                        <Typography variant="h6">
                            {props.projectData.ownerId}
                        </Typography>
                        <Typography variant="caption">
                            Original
                        </Typography>
                        <Typography variant="h6">
                            {props.projectData.original ? "TRUE" : "FALSE"}
                        </Typography>

                        <Typography variant="caption">
                            Status
                        </Typography>
                        <Typography variant="h6">
                            {props.projectData.status}
                        </Typography>

                        <Typography variant="caption">
                            Date createed
                        </Typography>
                        <Typography variant="h6">
                            {props.projectData.dateCreated}
                        </Typography>
                        <Typography variant="caption">
                            Date uploaded
                        </Typography>
                        <Typography variant="h6">
                            {props.projectData.dateUploaded}
                        </Typography>
                        <Typography variant="caption">
                            Date updated
                        </Typography>
                        <Typography variant="h6">
                            {props.projectData.dateUpdated}
                        </Typography>

                        <Typography variant="caption">
                            Correctness score
                        </Typography>
                        <Typography variant="h6">
                            {props.projectData.scoreCorrectness}
                        </Typography>
                        <Typography variant="caption">
                            Identity score
                        </Typography>
                        <Typography variant="h6">
                            {props.projectData.scoreIdentity}
                        </Typography>


                        <Button><RestorePageIcon className={classes.icon} color="primary"
                            onClick={() => { onUpdate() }} /></Button>
                        <Button><EditIcon className={classes.icon} color="primary"
                            onClick={() => { onUpdate() }} /></Button>
                        <Button><DeleteIcon className={classes.icon} color="secondary"
                            onClick={() => onDelete()} /></Button>

                    </Container>
                </Paper>
            </Box>

            <Box>
                Analysis

                <LineMatchList/>
                <LineIncorrectList/>
                <LineMissingList/>
                
                <ArcMatchList/>
                <ArcIncorrectList/>
                <ArcMissingList/>

                IDENTITY
                <LineHandleList/>
                <ArcHandleList/>
            </Box>
        </Container>
    );

}

const mapStateToProps = state => ({
    projectData: state.projectData.selectedProject
})

const mapActionToProps = {
    fetchAllProjectData: actions.fetchAll,
    deleteProjectData: actions.Delete,
    updateProjectData: actions.update,
    fetchProjectData: actions.fetchById
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProjectData));