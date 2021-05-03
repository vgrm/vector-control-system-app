import { React, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/user';
import { Box, Container, Paper, withStyles, Typography } from "@material-ui/core";

import { useParams } from 'react-router-dom';
import ProjectDataListUser from '../Project/ProjectDataListUser';


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
    //const [currentUsername, setCurrentUsername] = useState(params.username)


    useEffect(() => {
        props.userSelect(params.username);
    })//componentDidMount



    return (
        <Container>
            USER PAGE
            {props.user.isLoggedIn &&
                <Box p={5}>
                    <Paper>
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
                                {props.user.userSelected.firstname}
                            </Typography>
                            <Typography variant="caption">
                                Lastname
                        </Typography>
                            <Typography variant="h6">
                                {props.user.userSelected.lastname}
                            </Typography>
                        </Container>
                    </Paper>
                </Box>
            }
            <ProjectDataListUser currentUsername={currentUsername}{...props} />
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