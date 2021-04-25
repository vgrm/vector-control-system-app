import { React, useState, useEffect, Component } from 'react';
import { connect, useSelector } from 'react-redux';
import * as actions from '../../actions/projectSet';
import { Box, Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button, Typography } from "@material-ui/core";
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
    icon:{
        color:"#607d8b"
    },
    iconRed:{
        color:"#e53935"
    }
})

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

    const onDelete = () => {
        if (window.confirm('Are you sure to delete this set?')){
            props.deleteProjectSet(params.projectsetId, () => addToast("Deleted successfully", { appearance: 'success', placement: 'bottom-right' }))
            nextPath('/projectsets/');
        }
    }

    const onUpdate = () => {
        if (params.projectsetId != 0)
            nextPath('/projectsetform/' + params.projectsetId);
        else nextPath('/projectsetform/' + 0);
    }
    
    const nextPath = (path) => {
        history.push(path);
    }

    /*
    const onUpdate = (set) => {
        //setCurrentId(set.id); 
        //props.setCurrentProjectId(2);
        //console.log(props.currentProjectId);
        console.log("SET INFO");
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
*/
    return (
        <Container>
            <Box p={5}>
                <Paper>
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

                        <Button><EditIcon className={classes.icon} color="primary"
                            onClick={() => { onUpdate() }} /></Button>
                        <Button><DeleteIcon className={classes.icon} color="secondary"
                            onClick={() => onDelete()} /></Button>

                    </Container>
                </Paper>
            </Box>

            <Box p={5}><Container><ProjectDataUpload {...props} /></Container></Box>
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

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProjectSet));