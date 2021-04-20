import { React, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/projectSet';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup,Button } from "@material-ui/core";
//import { Button , Alert} from 'reactstrap';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import ProjectSetForm from './ProjectSetForm';

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

        //toast msg.
        const { addToast } = useToasts()

        const onDelete = (id) => {
            if (window.confirm('Are you sure to delete this record?'))
                props.deleteProjectData(id, () => addToast("Deleted successfully", { appearance: 'success', placement: 'bottom-right' }))
        }
    
        const onUpdate = (set) => {
            setCurrentId(set.id); 
            if (window.confirm('Are you sure to update this set?')) {
    
                //props.updateProjectData(set.id, set, () => addToast("Updated successfully", { appearance: 'success', placement: 'bottom-right' }))
                console.log("PROPS IN SET LIST",currentId);
                console.log("STATE IN SET LIST",this.state);
            }
        }

    return (
        <Grid container>
        <Grid item xs={6}>
            <ProjectSetForm></ProjectSetForm>
        </Grid>
        <Grid item xs={8}>
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
                                return (<TableRow key={index} hover>
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
        </Grid>
    </Grid >
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