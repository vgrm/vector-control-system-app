import { React, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/user';
import { Box, Container, Grid, Paper, withStyles, Button, Typography } from "@material-ui/core";

import { useHistory } from 'react-router-dom';
import ProjectDataListUser from '../Project/ProjectDataListUser';
import UserChart from './UserChart';

import EditIcon from "@material-ui/icons/Edit";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import colors from "../../Constants/colors";

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
    const currentUsername = useState(props.user.userCurrent.username)
    const [scoreData, setScoreData] = useState([]);
    const [identityData, setIdentityData] = useState([]);

    const history = useHistory();

    const nextPath = (path) => {
        history.push(path);
    }

    const onSignout = () => {
        if (window.confirm('Are you sure to signout?')) {
            props.userSignout();
            nextPath('/');
        }
    }

    const onUpdate = () => {
        nextPath('/userform/' + props.user.userCurrent.username);
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