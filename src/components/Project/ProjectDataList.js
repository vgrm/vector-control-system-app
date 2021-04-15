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

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteDCandidate(id, () => addToast("Deleted successfully", { appearance: 'info' }))
    }


    const onDelete1 = id => {
        //if (window.confirm('Are you sure to delete this record?'))
        //    props.deleteDCandidate(id, () => addToast("Deleted successfully", { appearance: 'info' }))
    }

    return (
        <Grid container>
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Owner</TableCell>
                                <TableCell>Identity Score</TableCell>
                                <TableCell>Date</TableCell>
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
                                        <TableCell>
                                            <ButtonGroup variant="text">
                                                <Button><EditIcon color="primary"
                                                    onClick={() => { setCurrentId(record.id) }} /></Button>
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
    //deleteProjectSet: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(ProjectDataList);