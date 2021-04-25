import { React, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/projectSet';
import { Container, Box, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
//import { Button , Alert} from 'reactstrap';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import NavigateNextIcon from "@material-ui/icons/NavigateNext"

import { useToasts } from "react-toast-notifications";
import ProjectSetForm from './ProjectSetForm';

import { Link, withRouter, useHistory } from 'react-router-dom';

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

const ProjectSetList = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    const [currentSetId, setCurrentSetId] = useState(0)

    useEffect(() => {
        props.fetchAllProjectSet()
    }, [])//componentDidMount

    
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = (id) => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteProjectSet(id, () => addToast("Deleted successfully", { appearance: 'success', placement: 'bottom-right' }))
    }

    const onUpdate = (set) => {
        setCurrentId(set.id);
        if (set.id != 0)
            nextPath('/projectsetform/' + set.id);
        else nextPath('/projectsetform/' + 0);
        //if (window.confirm('Are you sure to update this set?')) {

            //props.updateProjectData(set.id, set, () => addToast("Updated successfully", { appearance: 'success', placement: 'bottom-right' }))
            //console.log("PROPS IN SET LIST", props);
            //<ProjectSetForm {...({ currentId, setCurrentId,currentSetId,setCurrentSetId})}/>
        //}
    }

    const onCreate = () => {
        setCurrentId(0);
        nextPath('/projectsetform/' + 0);
        //if (window.confirm('Are you sure to update this set?')) {

            //props.updateProjectData(set.id, set, () => addToast("Updated successfully", { appearance: 'success', placement: 'bottom-right' }))
            //console.log("PROPS IN SET LIST", props);
            //<ProjectSetForm {...({ currentId, setCurrentId,currentSetId,setCurrentSetId})}/>
        //}
    }

    const onSelect = (set) => {
        if (set.id != 0)
            nextPath('/projectset/' + set.id);
    }

    const history = useHistory();
    
    const nextPath = (path) => {
        history.push(path);
    }

    return (
        <Container>
        <Container>
            <Box p={5}>
            <Paper>
            <Button
                    variant="contained"
                    className={classes.icon}
                    onClick={() => { onCreate() }}
                >
                    NEW SET
                </Button>
            </Paper>
</Box>
</Container>

            <Container>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Owner</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.projectSetList.map((set, index) => {
                                return (<TableRow key={index} hover >
                                    <TableCell>{set.name}</TableCell>
                                    <TableCell>{set.ownerId}</TableCell>
                                    <TableCell>{set.status}</TableCell>
                                    <TableCell>
                                        <ButtonGroup variant="text">
                                            <Button><EditIcon className={classes.icon}color="primary"
                                                onClick={() => { onUpdate(set) }} /></Button>
                                            <Button><DeleteIcon className={classes.icon}color="secondary"
                                                onClick={() => onDelete(set.id)} /></Button>
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
    projectSetList: state.projectSet.list
})

const mapActionToProps = {
    fetchAllProjectSet: actions.fetchAll,
    deleteProjectSet: actions.Delete,
    updateProjectData: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProjectSetList));