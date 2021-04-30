import { React, useState, useEffect, Component } from 'react';
import { connect, useSelector } from 'react-redux';
import * as actions from '../../actions/user';
import { Box, Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button, Typography } from "@material-ui/core";
import { Input } from 'reactstrap';

import { useToasts } from "react-toast-notifications";

import { Link, withRouter, useHistory, useParams } from 'react-router-dom';
import ProjectDataListUser from '../Project/ProjectDataListUser';
import UserChart from './UserChart';

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import colors from "../../Constants/colors";

const initialFieldValues = {
    name: '',
    description: '',
    status: '',
    ownerId: 0
}

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
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: colors.primaryColor,
        //    theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
})

const UserProfile = ({ classes, ...props }) => {
    const [currentUsername, setCurrentUsername] = useState(props.user.userCurrent.username)
    const [scoreData, setScoreData] = useState([]);
    const [identityData, setIdentityData] = useState([]);

    const history = useHistory();
    const params = useParams();

    const nextPath = (path) => {
        history.push(path);
    }

    useEffect(() => {
        //props.fetchAllProjectData()
    }, [])//componentDidMount
    //toast msg.
    const { addToast } = useToasts()

    //const currentSet = props.projectSetList(x=> x.id == params.projectsetId);
    //const currentSet = useSelector(state=>state.projectSetList[params.projectsetId]);

    const onDelete = () => {
        if (window.confirm('Are you sure to delete this project?')) {
            //props.deleteProjectData(params.projectId, () => addToast("Deleted successfully", { appearance: 'success', placement: 'bottom-right' }))
            //nextPath('/projectsets/');
        }
    }

    const onSignout = () => {
        if (window.confirm('Are you sure to signout?')) {
            props.userSignout();
            nextPath('/');

            //props.deleteProjectData(params.projectId, () => addToast("Deleted successfully", { appearance: 'success', placement: 'bottom-right' }))
            //nextPath('/projectsets/');
        }
    }

    const onUpdate = () => {

        console.log(params)
        console.log(props.user.userCurrent.username)
        //console.log("propsuser", props.user)
        //console.log(props.user.isLoggedIn)

        nextPath('/userform/' + props.user.userCurrent.username);
        //else nextPath('/projectsetform/' + 0);
    }

    const correctScoreData = () => {
        console.log(scoreData)
    }

    return (
        <Container>
            {props.user.isLoggedIn &&
                <Box p={5}>
                    <Paper>
                        <Grid container>
                            <Grid item className="grid-el" xs={12} md={5}>
                                <Container>
                                    <Typography variant="caption">
                                        User  Name
                                    </Typography>
                                    <Typography variant="h6">
                                        {props.user.userCurrent.username}
                                    </Typography>
                                    <Typography variant="caption">
                                        Email
                                    </Typography>
                                    <Typography variant="h6">
                                        {props.user.userCurrent.email}
                                    </Typography>
                                    <Typography variant="caption">
                                        Role
                                    </Typography>
                                    <Typography variant="h6">
                                        {props.user.userCurrent.role.name}
                                    </Typography>
                                    <Typography variant="caption">
                                        Firstname
                                    </Typography>
                                    <Typography variant="h6">
                                        {props.user.userCurrent.firstName}
                                    </Typography>
                                    <Typography variant="caption">
                                        Lastname
                                    </Typography>
                                    <Typography variant="h6">
                                        {props.user.userCurrent.lastName}
                                    </Typography>


                                </Container>
                            </Grid>
                            <Grid item className="grid-el" xs={12} md={5}>
                                <Typography variant="h6">
                                    User statistics
                                    </Typography>
                                {scoreData.length > 0 && identityData.length > 0 && <UserChart {...props} scoreData={scoreData} identityData={identityData} />}
                            </Grid>
                        </Grid>
                    </Paper>

                    <Box p={5}>
                        <ColorButton variant="contained" onClick={() => onUpdate()}>
                            edit profile <EditIcon />
                        </ColorButton>

                        <ColorButton2 variant="contained" onClick={() => onSignout()}>
                            signout <ExitToAppOutlinedIcon />
                        </ColorButton2>
                    </Box>
                </Box>
            }
            <ProjectDataListUser currentUsername={currentUsername}{...props} setScoreData={setScoreData} setIdentityData={setIdentityData} />
        </Container>
    );

}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionToProps = {
    userSignout: actions.signout,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(UserProfile));