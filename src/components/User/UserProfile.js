import { React, useState, useEffect, Component } from 'react';
import { connect, useSelector } from 'react-redux';
import * as actions from '../../actions/user';
import { Box, Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button, Typography } from "@material-ui/core";
import { Input } from 'reactstrap';

import { useToasts } from "react-toast-notifications";

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

const UserProfile = ({ classes, ...props }) => {

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
        console.log(props)
        console.log("propsuser",props.user)
        console.log(props.user.isLoggedIn)

        //nextPath('/projectsetform/' + params.projectsetId);
        //else nextPath('/projectsetform/' + 0);
    }


    return (
        <Container>
            {props.user.isLoggedIn &&
            <Box p={5}>
                <Paper>
                    <Container>
                        <Typography variant="caption">
                            User  Name
                        </Typography>
                        <Typography variant="h6">
                            {props.user.userCurrent.username}
                        </Typography>

                        <Button><RestorePageIcon className={classes.icon} color="primary"
                            onClick={() => { onUpdate() }} /></Button>
                        <Button><EditIcon className={classes.icon} color="primary"
                            onClick={() => { onUpdate() }} /></Button>
                        <Button><DeleteIcon className={classes.icon} color="secondary"
                            onClick={() => onDelete()} /></Button>
                        <Button><DeleteIcon className={classes.icon} color="secondary"
                            onClick={() => onSignout()} /></Button>

                    </Container>
                </Paper>
            </Box>
}
ok
<Button><RestorePageIcon className={classes.icon} color="primary"
                            onClick={() => { onUpdate() }} /></Button>
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