import { React, useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/projectData';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import { Input } from 'reactstrap';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

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

const ProjectDataList = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllProjectData()
    }, [])//componentDidMount


    //toast msg.
    const { addToast } = useToasts()

    const onDelete = (id) => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteProjectData(id, () => addToast("Deleted successfully", { appearance: 'success', placement: 'bottom-right' }))
    }



    const onUpdate = (record) => {
        setCurrentId(record.id); 
        if (window.confirm('Are you sure to update this record?')) {

            props.updateProjectData(record.id, record, () => addToast("Updated successfully", { appearance: 'success', placement: 'bottom-right' }))
        }
    }

    return (
        <Grid container>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={8}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Owner</TableCell>
                                <TableCell>Identity Score</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>CorrectnessScore</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.projectDataList.map((record, index) => {
                                    return (<TableRow key={index} hover>
                                        <TableCell>{record.name}</TableCell>
                                        <TableCell>{record.owner}</TableCell>
                                        <TableCell>{record.identityScore}</TableCell>
                                        <TableCell>{record.date}</TableCell>
                                        <TableCell>{record.status}</TableCell>
                                        <TableCell>{record.correctnessscore}</TableCell>
                                        <TableCell>
                                            <ButtonGroup variant="text">
                                                <Button><EditIcon color="primary"
                                                    onClick={() => { onUpdate(record) }} /></Button>
                                                <Button><DeleteIcon color="secondary"
                                                    onClick={() => onDelete(record.id)} /></Button>
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
    projectDataList: state.projectData.list
})

const mapActionToProps = {
    fetchAllProjectData: actions.fetchAll,
    deleteProjectData: actions.Delete,
    updateProjectData: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(ProjectDataList);