import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/projectSet';
import { Typography, Container, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";

import NavigateNextIcon from "@material-ui/icons/NavigateNext"

import { useHistory } from 'react-router-dom';
import colors from "../../Constants/colors";

const ColorButton = withStyles(theme => ({
    root: {
        color: colors.white,
        backgroundColor: colors.primaryColor,
        '&:hover': {
            backgroundColor: colors.primaryColorDark,
        },
    },
}))(Button);

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
    icon: {
        color: colors.primaryColor
    },
    iconRed: {
        color: colors.errorBorder,
        fontWeight: 'bold'
    },
    iconGreen: {
        color: colors.ratingGoodColor,
        fontWeight: 'bold'
    },
    iconGray: {
        color: colors.gray
    }
})

const ProjectSetList = ({ classes, ...props }) => {

    useEffect(() => {
        props.fetchAllOtherProjectSet()
        props.fetchAllOwnedProjectSet()
    }, [])//componentDidMount

    const onCreate = () => {
        nextPath('/projectsetform/' + 0);
    }

    const onSelect = (set) => {
        if (set.id !== 0)
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
                    <ColorButton
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => { onCreate() }}
                    >
                        NEW SET
                    </ColorButton>

                </Box>
            </Container>

            <Container>
                <Box pt={5}>
                    <Typography variant="h6">
                        My sets
                </Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Owner</TableCell>
                                <TableCell>State</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.projectSetOwnedList.map((set, index) => {
                                    return (<TableRow key={index} hover >
                                        <TableCell>{set.name}</TableCell>
                                        <TableCell >{set.owner.username}</TableCell>
                                        <TableCell className={set.state.name === "Open" ? classes.iconGreen :
                                            set.state.name === "Closed" ? classes.iconRed : classes.iconGray}>{set.state.name}</TableCell>
                                        <TableCell>
                                            <ButtonGroup variant="text">
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

            <Container>
                <Box pt={5}>
                    <Typography variant="h6">
                        Other sets
                </Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Owner</TableCell>
                                <TableCell>State</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.projectSetOtherList.map((set, index) => {
                                    return (<TableRow key={index} hover >
                                        <TableCell>{set.name}</TableCell>
                                        <TableCell>{set.owner.username}</TableCell>
                                        <TableCell className={set.state.name === "Open" ? classes.iconGreen :
                                            set.state.name === "Closed" ? classes.iconRed : classes.iconGray}>{set.state.name}</TableCell>
                                        <TableCell>
                                            <ButtonGroup variant="text">
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
    //projectSetList: state.projectSet.list,
    projectSetOwnedList: state.projectSet.owned,
    projectSetOtherList: state.projectSet.other
})

const mapActionToProps = {
    //fetchAllProjectSet: actions.fetchAll,
    fetchAllOwnedProjectSet: actions.fetchAllOwned,
    fetchAllOtherProjectSet: actions.fetchAllOther,
    deleteProjectSet: actions.Delete,
    updateProjectData: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProjectSetList));