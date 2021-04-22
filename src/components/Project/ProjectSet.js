import { React, useState, useEffect, Component } from 'react';
import { connect, useSelector } from 'react-redux';
import * as actions from '../../actions/projectSet';
import { Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button, Typography } from "@material-ui/core";
import { Input } from 'reactstrap';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import ProjectDataList from './ProjectDataList';
import ProjectDataUpload from './ProjectDataUpload';

import { Link, withRouter, useHistory, useParams } from 'react-router-dom';

const initialFieldValues = {
    name: '',
    description: '',
    status: '',
    ownerId: 0
}

const ProjectSet = ({ classes, ...props }) => {

    const history = useHistory();
    const params = useParams();


    useEffect(() => {
        props.fetchProjectSet(params.projectsetId);
        return () => { };
    }, [])//componentDidMount

    useEffect(() => {
        props.fetchAllProjectSet()
    }, [])//componentDidMount
    //toast msg.
    const { addToast } = useToasts()

    //const currentSet = props.projectSetList(x=> x.id == params.projectsetId);
    //const currentSet = useSelector(state=>state.projectSetList[params.projectsetId]);
    const onDelete = (id) => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteProjectData(id, () => addToast("Deleted successfully", { appearance: 'success', placement: 'bottom-right' }))
    }

    const onUpdate = (set) => {
        //setCurrentId(set.id); 
        //props.setCurrentProjectId(2);
        //console.log(props.currentProjectId);
        console.log(props);
        console.log(history);
        console.log(params);
        console.log(props.projectSetList[params.projectsetId]);
        if (window.confirm('Are you sure to update this set?')) {

            //props.updateProjectData(set.id, set, () => addToast("Updated successfully", { appearance: 'success', placement: 'bottom-right' }))
            //console.log("PROPS IN SET LIST",currentId);
            //console.log("STATE IN SET LIST",this.state);
        }
    }

    return (
        <Container>
            <Container>
            <Typography variant="caption">
                Project Set Name
                    </Typography>
            <Typography variant="h6">
                {props.projectSet.name}
            </Typography>

            <Typography variant="caption">
                Description
                    </Typography>
            <Typography variant="h6">
                {props.projectSet.description}
            </Typography>

            <Typography variant="caption">
                Status
                    </Typography>
            <Typography variant="h6">
                {props.projectSet.status}
            </Typography>

            <Typography variant="caption">
                Owner
                    </Typography>
            <Typography variant="h6">
                {props.projectSet.ownerId}
            </Typography>
            </Container>

            <Container><ProjectDataUpload {...props} /></Container>
            <Container><ProjectDataList {...props} /></Container>
        </Container>
    );

}

const mapStateToProps = state => ({
    projectSetList: state.projectSet.list,
    projectSet: state.projectSet.selectedSet
})

const mapActionToProps = {
    fetchAllProjectSet: actions.fetchAll,
    deleteProjectSet: actions.Delete,
    updateProjectData: actions.update,
    fetchProjectSet: actions.fetchById
}

export default connect(mapStateToProps, mapActionToProps)(ProjectSet);