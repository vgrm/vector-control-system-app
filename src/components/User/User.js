import { React, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/user';
import { Grid, Box, Container, Paper, withStyles, Typography } from "@material-ui/core";

import { useParams } from 'react-router-dom';
import ProjectDataListUser from '../Project/ProjectDataListUser';
import UserChart from './UserChart';

import colors from "../../Constants/colors";

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

const User = ({ classes, ...props }) => {
    const params = useParams();
    const currentUsername = useState(params.username);
    const [scoreData, setScoreData] = useState([]);
    const [identityData, setIdentityData] = useState([]);
    //const [currentUsername, setCurrentUsername] = useState(params.username)


    useEffect(() => {
        props.userSelect(params.username);
    }, [])//componentDidMount



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
                                        {props.user.userSelected.username}
                                    </Typography>
                                    <Typography variant="caption">
                                        Email
                        </Typography>
                                    <Typography variant="h6">
                                        {props.user.userSelected.email}
                                    </Typography>
                                    <Typography variant="caption">
                                        Firstname
                        </Typography>
                                    <Typography variant="h6">
                                        {props.user.userSelected.firstName}
                                    </Typography>
                                    <Typography variant="caption">
                                        Lastname
                        </Typography>
                                    <Typography variant="h6">
                                        {props.user.userSelected.lastName}
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
    userSelect: actions.fetchByUsername,
    userSignout: actions.signout,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(User));