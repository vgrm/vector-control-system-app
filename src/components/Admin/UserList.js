import { React, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/user';
import { Typography, Container, Box, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";

//import { Button , Alert} from 'reactstrap';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import NavigateNextIcon from "@material-ui/icons/NavigateNext"

import { useToasts } from "react-toast-notifications";

import { Link, withRouter, useHistory, useParams } from 'react-router-dom';
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
    const [currentId, setCurrentId] = useState(0)
    const [currentSetId, setCurrentSetId] = useState(0)

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
        if (window.confirm('Are you sure to delete this user?')){
            props.deleteUser(user.username, () => addToast("Deleted successfully", { appearance: 'success', placement: 'bottom-right' }))
        }
    }

    const onSelect = (user) => {
        console.log(user)
            nextPath('/user/' + user.username);
    }

    const onUpdate = () => {
        if (params.projectsetId != 0)
            nextPath('/projectsetform/' + params.projectsetId);
        else nextPath('/projectsetform/' + 0);
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
                                props.userList.map((set, index) => {
                                    return (<TableRow key={index} hover >
                                        <TableCell>{set.username}</TableCell>
                                        <TableCell>{set.email}</TableCell>
                                        <TableCell>{set.roleId}</TableCell>
                                        <TableCell>{set.firstname}</TableCell>
                                        <TableCell>{set.lastname}</TableCell>
                                        <TableCell>
                                            <ButtonGroup variant="text">
                                                <Button><EditIcon className={classes.icon}
                                                    onClick={() => onUpdate(set)} /></Button>
                                                    <Button><DeleteIcon className={classes.icon}
                                                    onClick={() => onDelete(set)} /></Button>
                                                    <Button><NavigateNextIcon className={classes.icon}
                                                    onClick={() => onSelect(set)} /></Button>
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