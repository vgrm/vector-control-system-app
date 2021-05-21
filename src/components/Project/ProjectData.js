import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/projectData';
import { Box, Container, Paper, withStyles, ButtonGroup, Button, Typography } from "@material-ui/core";

import { useToasts } from "react-toast-notifications";


import ArcMatchList from '../Analysis/ArcMatchList';
import ArcIncorrectList from '../Analysis/ArcIncorrectList';
import ArcMissingList from '../Analysis/ArcMissingList';
import ArcHandleList from '../Analysis/ArcHandleList';

import LineMatchList from '../Analysis/LineMatchList';
import LineIncorrectList from '../Analysis/LineIncorrectList';
import LineMissingList from '../Analysis/LineMissingList';
import LineHandleList from '../Analysis/LineHandleList';

import { useParams } from 'react-router-dom';


import DeleteIcon from "@material-ui/icons/Delete";

import RestorePageOutlinedIcon from '@material-ui/icons/RestorePageOutlined';


import colors from '../../Constants/colors';

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


const ProjectData = ({ classes, ...props }) => {
    const params = useParams();


    useEffect(() => {
        props.fetchProjectData(params.projectId);
        return () => { };
    }, [])//componentDidMount


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


    if (props.projectData.owner) {
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
                                Project Set
                        </Typography>
                            <Typography variant="h6">
                                {props.projectData.projectSet.name}
                            </Typography>
                            <Typography variant="caption">
                                Owner
                        </Typography>
                            <Typography variant="h6">
                                {props.projectData.owner.username}
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
                        </Container>
                    </Paper>
                    <Box p={5}>
                        {(props.user.isLoggedIn) &&
                            ((props.projectSet.ownerId === props.user.userCurrent.id))
                            &&
                            <ButtonGroup variant="text">
                                <ColorButton variant="contained" onClick={() => onUpdate(props.project)}>
                                    analyze project  <RestorePageOutlinedIcon />
                                </ColorButton>

                                <ColorButton2 variant="contained" onClick={() => onDelete(props.project.id)}>
                                    delete project <DeleteIcon />
                                </ColorButton2>

                            </ButtonGroup>
                        }
                    </Box>
                </Box>

                <Box>
                    Analysis

                <LineMatchList />
                    <LineIncorrectList />
                    <LineMissingList />

                    <ArcMatchList />
                    <ArcIncorrectList />
                    <ArcMissingList />

                IDENTITY
                <LineHandleList />
                    <ArcHandleList />
                </Box>
            </Container>
        );
    }
    return (<div></div>);
}

const mapStateToProps = state => ({
    projectData: state.projectData.selectedProject,
    user: state.user,
    projectSet: state.projectSet.selectedSet
})

const mapActionToProps = {
    fetchAllProjectData: actions.fetchAll,
    deleteProjectData: actions.Delete,
    updateProjectData: actions.update,
    fetchProjectData: actions.fetchById,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProjectData));