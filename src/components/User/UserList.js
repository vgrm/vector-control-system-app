import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/user';
import { Grid } from "@material-ui/core";

const UserList = (props) => {

    useEffect(() => {
        props.fetchAllUser()
    })//componentDidMount

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
}

export default connect(mapStateToProps, mapActionToProps)(UserList);