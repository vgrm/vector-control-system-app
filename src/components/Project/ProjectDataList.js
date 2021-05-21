import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/projectData';
import { Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from '@material-ui/icons/Star';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import NavigateNextIcon from "@material-ui/icons/NavigateNext"

import colors from '../../Constants/colors';
import { useToasts } from "react-toast-notifications";

import { useHistory, useParams } from 'react-router-dom';

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
    starIcon1: { color: colors.ratingBadColor },
    starIcon2: { color: colors.gray },
    icon: {
        color: colors.primaryColor
    },
    iconRed: {
        color: "#e53935"
    }
})

const ProjectDataList = ({ classes, ...props }) => {

    //const history = useHistory();
    const params = useParams();

    useEffect(() => {
        props.setCurrentProjectId(0)
        props.fetchProjects(params.projectsetId)
    }, [])//componentDidMount

    useEffect(() => {
        if (props.currentProjectId !== 0) {
            props.fetchProjects(params.projectsetId)
        }
    }, [])


    //toast msg.
    const { addToast } = useToasts()

    const onDelete = (id) => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteProjectData(id, () => addToast("Deleted successfully", { appearance: 'success', placement: 'bottom-right' }))
    }

    const onUpdate = (record) => {
        if (window.confirm('Are you sure to update this record?')) {
            props.updateProjectData(record.id, record, () => addToast("Updated successfully", { appearance: 'success', placement: 'bottom-right' }))
        }
        props.setCurrentProjectId(record.id);
    }

    const onSetOriginal = (record) => {
        let formData = new FormData();
        formData.append('command', "ChangeOriginal");
        if (window.confirm('Are you sure to update this record?')) {
            props.patchProjectData(record.id, formData, () => addToast("Updated successfully", { appearance: 'success', placement: 'bottom-right' }))
            props.setCurrentProjectId(0);
        }

    }

    const onSelect = (project) => {
        if (project.id !== 0)
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
                            <TableCell>Status</TableCell>
                            <TableCell>Identity</TableCell>
                            <TableCell>Correctness</TableCell>
                            <TableCell>Date uploaded</TableCell>
                            <TableCell>Date updated</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.projectDataList.map((project, index) => {
                                return (<TableRow key={index} hover>
                                    <TableCell>{project.name}</TableCell>
                                    <TableCell>{project.status}</TableCell>
                                    <TableCell>{project.scoreIdentity}</TableCell>
                                    <TableCell>{project.scoreCorrectness}</TableCell>
                                    <TableCell>{project.dateUploaded}</TableCell>
                                    <TableCell>{project.dateUpdated}</TableCell>
                                    <TableCell>
                                        {(props.user.isLoggedIn) &&
                                            ((props.projectSet.ownerId === props.user.userCurrent.id))
                                            &&
                                            <ButtonGroup variant="text">
                                                <Button><StarIcon className={project.original ? classes.starIcon1 : classes.starIcon2} color="primary"
                                                    onClick={() => { onSetOriginal(project); props.setCurrentProjectId(project.id) }} /></Button>
                                                <Button><RestorePageIcon className={classes.icon} color="primary"
                                                    onClick={() => { onUpdate(project); props.setCurrentProjectId(project.id) }} /></Button>
                                                <Button><DeleteIcon className={classes.icon} color="secondary"
                                                    onClick={() => onDelete(project.id)} /></Button>

                                            </ButtonGroup>}
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
    user: state.user,
    projectSet: state.projectSet.selectedSet
})

const mapActionToProps = {
    fetchProjects: actions.fetchProjects,
    fetchAllProjectData: actions.fetchAll,
    deleteProjectData: actions.Delete,
    updateProjectData: actions.update,
    patchProjectData: actions.patch
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProjectDataList));