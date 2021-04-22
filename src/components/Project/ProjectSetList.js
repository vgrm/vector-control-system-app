import { React, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/projectSet';
import { Container, Box, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
//import { Button , Alert} from 'reactstrap';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
    }
})

const ProjectSetList = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllProjectSet()
    }, [])//componentDidMount

    const history = useHistory();
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = (id) => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteProjectSet(id, () => addToast("Deleted successfully", { appearance: 'success', placement: 'bottom-right' }))
    }

    const onUpdate = (set) => {
        setCurrentId(set.id);
        props.setCurrentProjectId(2);
        if (window.confirm('Are you sure to update this set?')) {

            //props.updateProjectData(set.id, set, () => addToast("Updated successfully", { appearance: 'success', placement: 'bottom-right' }))
            console.log("PROPS IN SET LIST", props);
        }
    }

    const onSelect = (set) => {
        setCurrentId(set.id);
        //props.setCurrentProjectId(2);
        if (currentId != 0)
            nextPath('/projectset/' + currentId);
        /*
        if (window.confirm('Are you sure to update this set?')) {
 
            //props.updateProjectData(set.id, set, () => addToast("Updated successfully", { appearance: 'success', placement: 'bottom-right' }))
            console.log("PROPS IN SET LIST",props);
        }*/
    }

    const nextPath = (path) => {
        history.push(path);
    }

    return (
        <Container>
        <Container>
            <Box p={5}>
            <Paper>
            <ProjectSetForm {...({ currentId, setCurrentId})}/>
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
                                return (<TableRow key={index} hover onClick={() => onSelect(set)}>
                                    <TableCell>{set.name}</TableCell>
                                    <TableCell>{set.ownerId}</TableCell>
                                    <TableCell>{set.status}</TableCell>
                                    <TableCell>
                                        <ButtonGroup variant="text">
                                            <Button><EditIcon color="primary"
                                                onClick={() => { onUpdate(set) }} /></Button>
                                            <Button><DeleteIcon color="secondary"
                                                onClick={() => onDelete(set.id)} /></Button>
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

export default connect(mapStateToProps, mapActionToProps)(ProjectSetList);