import { React, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/projectSet';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles } from "@material-ui/core";
import { Button , Alert} from 'reactstrap';

const ProjectSetList = (props) => {

    useEffect(() => {
        props.fetchAllProjectSet()
    }, [])//componentDidMount

    return (
        <Grid container>
            <Grid item xs={6}>
                <div>
                    <Button color="primary">primary</Button>{' '}
                    <Button color="secondary">secondary</Button>{' '}
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
    projectSetList: state.projectSet.list
})

const mapActionToProps = {
    fetchAllProjectSet: actions.fetchAll,
    //deleteProjectSet: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(ProjectSetList);