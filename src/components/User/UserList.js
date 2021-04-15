import { React, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/user';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles } from "@material-ui/core";
import { Button , Alert} from 'reactstrap';

const UserList = (props) => {

    useEffect(() => {
        props.fetchAllUser()
    }, [])//componentDidMount

    return (
        <Grid container>
            <Grid item xs={6}>
                <div>
                    USERLIST COMPONENT
                    something
                </div>
            </Grid>
            <Grid item xs={6}>
                <div>
                    project set list1
                </div>
            </Grid>
        </Grid>

    );
}

const mapStateToProps = state => ({
    userList: state.user.list
})

const mapActionToProps = {
    fetchAllUser: actions.fetchAll,
    //deleteProjectSet: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(UserList);