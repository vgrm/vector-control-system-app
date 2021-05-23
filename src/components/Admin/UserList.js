import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/user';
import { Typography, Container, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import NavigateNextIcon from "@material-ui/icons/NavigateNext"

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
    icon: {
        color: "#607d8b"
    },
    iconRed: {
        color: "#e53935"
    }
})

const UserList = ({ classes, ...props }) => {
    const params = useParams();
    const history = useHistory();
    const nextPath = (path) => {
        history.push(path);
    }

    useEffect(() => {
        props.fetchAllUsers()
    }, [])//componentDidMount


    //toast msg.
    const { addToast } = useToasts()

    const onDelete = (user) => {
        if (window.confirm('Are you sure to delete this user?')) {
            props.deleteUser(user.username, () => addToast("Deleted successfully", { appearance: 'success', placement: 'bottom-right' }))
        }
    }

    const onSelect = (user) => {
        nextPath('/user/' + user.username);
    }

    const onUpdate = (user) => {

        nextPath('/userform/' + user.username);
    }



    return (
        <Container>

            <Container>
                <Box pt={5}>
                    <Typography variant="h6">
                        All users
                </Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>RoleId</TableCell>
                                <TableCell>Firstname</TableCell>
                                <TableCell>Lastname</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.userList.map((user, index) => {
                                    return (<TableRow key={index} hover >
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.roleId}</TableCell>
                                        <TableCell>{user.firstName}</TableCell>
                                        <TableCell>{user.lastName}</TableCell>
                                        <TableCell>
                                            <ButtonGroup variant="text">
                                                <Button><EditIcon className={classes.icon}
                                                    onClick={() => onUpdate(user)} /></Button>
                                                <Button><DeleteIcon className={classes.icon}
                                                    onClick={() => onDelete(user)} /></Button>
                                                <Button><NavigateNextIcon className={classes.icon}
                                                    onClick={() => onSelect(user)} /></Button>
                                            </ButtonGroup>

                                        </TableCell>
                                    </TableRow>)
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Container>
    );
}

const mapStateToProps = state => ({
    userList: state.user.list
})

const mapActionToProps = {
    fetchAllUsers: actions.fetchAll,
    deleteUser: actions.Delete,
    updateUser: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(UserList));