import { React, useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/projectData';
import { Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import { Input } from 'reactstrap';

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import NavigateNextIcon from "@material-ui/icons/NavigateNext"

import { useToasts } from "react-toast-notifications";

import { Link, withRouter, useHistory, useParams } from 'react-router-dom';

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
    starIcon1: { color: 'gold' },
    starIcon2: { color: 'gray' },
    icon: {
        color: "#607d8b"
    },
    iconRed: {
        color: "#e53935"
    }
})

const ProjectDataList = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    //const history = useHistory();
    const params = useParams();

    useEffect(() => {
        props.setCurrentProjectId(0)
        props.fetchProjects(params.projectsetId)
    }, [props.currentProjectId])//componentDidMount

    useEffect(() => {
        if (props.currentProjectId != 0) {
            console.log("YES");
            props.fetchProjects(params.projectsetId)
            //props.projectDataList.find(x => x.id == props.currentProjectId)
        }
    }, [props.currentProjectId])


    //toast msg.
    const { addToast } = useToasts()

    const onDelete = (id) => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteProjectData(id, () => addToast("Deleted successfully", { appearance: 'success', placement: 'bottom-right' }))
    }

    const onUpdate = (record) => {

        console.log(props);
        console.log(props.currentProjectId);
        //let formData = new FormData();
        //formData.append('status', "tesUPt");
        if (window.confirm('Are you sure to update this record?')) {
            //props.patchProjectData(record.id, formData, () => addToast("Updated successfully", { appearance: 'success', placement: 'bottom-right' }))
            props.updateProjectData(record.id, record, () => addToast("Updated successfully", { appearance: 'success', placement: 'bottom-right' }))
        }
        props.setCurrentProjectId(record.id);
        //props.setCurrentProjectId(0);
    }

    const onSetOriginal = (record) => {
        //setCurrentId(record.id);
        let formData = new FormData();
        formData.append('status', "Processing");
        formData.append('command', "ChangeOriginal");
        if (window.confirm('Are you sure to update this record?')) {
            props.patchProjectData(record.id, formData, () => addToast("Updated successfully", { appearance: 'success', placement: 'bottom-right' }))
            props.setCurrentProjectId(0);
            //props.updateProjectData(record.id, formData, () => addToast("Updated successfully", { appearance: 'success', placement: 'bottom-right' }))
        }
        //if (window.confirm('Are you sure to set this project as ORIGINAL?')) {
        //props.updateProjectData(record.id, record, () => addToast("Updated successfully", { appearance: 'success', placement: 'bottom-right' }))
        //}
    }

    const onSelect = (project) => {
        if (project.id != 0)
            nextPath('/projectdata/' + project.id);
    }

    const history = useHistory();

    const nextPath = (path) => {
        history.push(path);
    }

    return (
        <Container>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Owner</TableCell>
                            <TableCell>Original</TableCell>
                            <TableCell>Identity Score</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>CorrectnessScore</TableCell>
                            <TableCell>PROJECTSET</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.projectDataList.map((project, index) => {
                                return (<TableRow key={index} hover>
                                    <TableCell>{project.name}</TableCell>
                                    <TableCell>{project.ownerId}</TableCell>
                                    <TableCell>{project.original}</TableCell>
                                    <TableCell>{project.scoreIdentity}</TableCell>
                                    <TableCell>{project.date}</TableCell>
                                    <TableCell>{project.status}</TableCell>
                                    <TableCell>{project.scoreCorrectness}</TableCell>
                                    <TableCell>{project.projectSetId}</TableCell>
                                    <TableCell>
                                        <ButtonGroup variant="text">
                                            <Button><StarIcon className={project.original ? classes.starIcon1 : classes.starIcon2} color="primary"
                                                onClick={() => { onSetOriginal(project); props.setCurrentProjectId(project.id) }} /></Button>
                                            <Button><RestorePageIcon className={classes.icon} color="primary"
                                                onClick={() => { onUpdate(project); props.setCurrentProjectId(project.id) }} /></Button>
                                            <Button><DeleteIcon className={classes.icon} color="secondary"
                                                onClick={() => onDelete(project.id)} /></Button>
                                            <Button><NavigateNextIcon className={classes.icon}
                                                onClick={() => onSelect(project)} /></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>)
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );

}

const mapStateToProps = state => ({
    projectDataList: state.projectData.list
})

const mapActionToProps = {
    fetchProjects: actions.fetchProjects,
    fetchAllProjectData: actions.fetchAll,
    deleteProjectData: actions.Delete,
    updateProjectData: actions.update,
    patchProjectData: actions.patch
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProjectDataList));