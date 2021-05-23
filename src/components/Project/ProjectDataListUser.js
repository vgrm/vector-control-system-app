import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/projectData';
import { Typography, Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";

import NavigateNextIcon from "@material-ui/icons/NavigateNext"

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
    const params = useParams();

    useEffect(() => {
        //console.log(props)
        props.fetchProjectsUser(props.currentUsername[0])
        //correctScoreData()
    }, [])//componentDidMount

    useEffect(() => {
        //console.log(props)
        //props.fetchProjectsUser(props.currentUsername[0])
        correctScoreData()
    }, [props.projectDataListUser])//componentDidMount

    useEffect(() => {
        if (props.currentProjectId != 0) {

            props.fetchProjects(params.projectsetId)

        }
    }, [props.currentProjectId])

    const onSelect = (project) => {
        if (project.id !== 0)
            nextPath('/projectdata/' + project.id);
    }

    const onSelectSet = (setId) => {
        nextPath('/projectset/' + setId);
    }

    const history = useHistory();

    const nextPath = (path) => {
        history.push(path);
    }

    const correctScoreData = () => {
        var scores = []
        props.projectDataListUser.forEach(x => {
            scores.push(x.scoreCorrectness)
        });
        var arr = [];
        scores.forEach((x, index) => {
            arr.push([index, x])
        });

        props.setScoreData(arr);

        var identities = []
        props.projectDataListUser.forEach((x, index) => {
            identities.push([index, x.scoreIdentity])
        });
        props.setIdentityData(identities);
        //console.log('arr', arr);
    }

    return (
        <Container>
            <Typography variant="h6">
                User projects
                    </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project Set</TableCell>
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
                            props.projectDataListUser.map((project, index) => {
                                return (<TableRow key={index} hover>
                                    <TableCell><Button onClick={() => onSelectSet(project.projectSetId)}>{project.projectSet.name}</Button></TableCell>
                                    <TableCell>{project.name}</TableCell>
                                    <TableCell>{project.status}</TableCell>
                                    <TableCell>{project.scoreIdentity}</TableCell>
                                    <TableCell>{project.scoreCorrectness}</TableCell>
                                    <TableCell>{project.dateUploaded}</TableCell>
                                    <TableCell>{project.dateUpdated}</TableCell>
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
    projectSet: state.projectSet.selectedSet,

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