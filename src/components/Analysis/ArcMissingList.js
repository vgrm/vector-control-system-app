import { React, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/arc';
import { Container, Box, Typography, Paper, TableContainer, Table, TableHead, TableFooter, TablePagination, TableRow, TableCell, TableBody, withStyles } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import { useParams } from 'react-router-dom';

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
    starIcon1: { color: 'gold' },
    starIcon2: { color: 'gray' },
    icon: {
        color: "#607d8b"
    },
    iconRed: {
        color: "#e53935"
    }
})
const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

const ArcMissingList = ({ classes, ...props }) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.arcsMissingList.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const params = useParams();


    useEffect(() => {
        if (params.projectId !== 0) {
            props.fetchArcsMissing(params.projectId)
        }
    }, [])//componentDidMount





    return (
        <Container>
            <Box pt={5}>
                <Typography variant="h6">
                    Missing arcs
                </Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Handle</TableCell>
                            <TableCell>Layer</TableCell>
                            <TableCell>X</TableCell>
                            <TableCell>Y</TableCell>
                            <TableCell>Z</TableCell>
                            <TableCell>Radius</TableCell>
                            <TableCell>Angle Start</TableCell>
                            <TableCell>Angle End</TableCell>
                            <TableCell>DX</TableCell>
                            <TableCell>DY</TableCell>
                            <TableCell>DZ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (rowsPerPage > 0 ? props.arcsMissingList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : props.arcsMissingList)
                                .map((arc, index) => {
                                    return (<TableRow key={index} hover>
                                        <TableCell>{arc.handle}</TableCell>
                                        <TableCell>{arc.layer}</TableCell>
                                        <TableCell>{arc.x}</TableCell>
                                        <TableCell>{arc.y}</TableCell>
                                        <TableCell>{arc.z}</TableCell>
                                        <TableCell>{arc.radius}</TableCell>
                                        <TableCell>{arc.angleStart}</TableCell>
                                        <TableCell>{arc.angleEnd}</TableCell>
                                        <TableCell>{arc.dx}</TableCell>
                                        <TableCell>{arc.dy}</TableCell>
                                        <TableCell>{arc.dz}</TableCell>
                                    </TableRow>)
                                })
                        }
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 30 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                colSpan={4}
                                count={props.arcsMissingList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

        </Container>
    );

}

const mapStateToProps = state => ({
    arcsMissingList: state.arc.listMissing
})

const mapActionToProps = {
    fetchArcsMissing: actions.fetchArcsMissing
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ArcMissingList));