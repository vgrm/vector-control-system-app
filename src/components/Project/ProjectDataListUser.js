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
        console.log("PDUSER:",props)
        props.fetchProjectsUser(props.currentUsername)
        //props.setCurrentProjectId(0)
        //props.fetchProjects(params.projectsetId)
    }, [])//componentDidMount

    useEffect(() => {
        if (props.currentProjectId != 0) {
            console.log("YES");
            props.fetchProjects(params.projectsetId)
            //props.projectDataList.find(x => x.id == props.currentProjectId)
        }
    }, [props.currentProjectId])


    //toast msg.
    const { addToast } = useToasts()

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
            HUH
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
                            props.projectDataListUser.map((project, index) => {
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
    projectDataList: state.projectData.list,
    projectDataListUser: state.projectData.listUser,
    user: state.user,
    projectSet: state.projectSet.selectedSet
})

const mapActionToProps = {
    fetchProjects: actions.fetchProjects,
    fetchProjectsUser: actions.fetchByUser,
    fetchAllProjectData: actions.fetchAll,
    deleteProjectData: actions.Delete,
    updateProjectData: actions.update,
    patchProjectData: actions.patch
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProjectDataList));