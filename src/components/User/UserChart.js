import { React, useState, useEffect, Component, useMemo } from 'react';
import { connect, useSelector } from 'react-redux';
import * as actions from '../../actions/user';
import { Box, Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button, Typography } from "@material-ui/core";
import { Input } from 'reactstrap';

import { useToasts } from "react-toast-notifications";
import { Chart } from 'react-charts'
import { Link, withRouter, useHistory, useParams } from 'react-router-dom';

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import colors from "../../Constants/colors";

const initialFieldValues = {
    name: '',
    description: '',
    status: '',
    ownerId: 0
}

const ColorButton = withStyles(theme => ({
    root: {
        color: colors.white,
        backgroundColor: colors.primaryColor,
        '&:hover': {
            backgroundColor: colors.primaryColorDark,
        },
    },
}))(Button);

const ColorButton2 = withStyles(theme => ({
    root: {
        color: colors.white,
        backgroundColor: colors.secondaryColor,
        '&:hover': {
            backgroundColor: colors.secondaryColorDark,
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
        color: "#607d8b"
    },
    iconRed: {
        color: "#e53935"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: colors.primaryColor,
        //    theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
})

const UserChart = ({ classes, ...props }) => {
    const history = useHistory();
    const params = useParams();
    const [indexData, setIndexData] = useState([]);
    const [dataArray, setDataArray] = useState([])
    const [dataScore, setDataScore] = useState([]);
    const [dataIden, setDataIden] = useState([]);

    const [flag, setFlag] = useState(false)

    useEffect(() => {
        if (props.scoreData) {
            setDataScore(props.scoreData)
        }
    }, [])//componentDidMount

    useEffect(() => {
        if (props.identityData) {
            setDataIden(props.identityData)
        }
    }, [])//componentDidMount

    /*
    useEffect(() => {
        if(props.scoreData){
        console.log('adding data to array')
        var arr =[];
        props.scoreData.forEach((x,index)=>{
            arr.push([index,x])
        });
        setDataArray(arr);
    }
        //props.userSelect(params.username);
        //props.fetchAllProjectData()
    }, [])//componentDidMount
*/
    const data = useMemo(
        () => [
            {
                label: 'Correctness score',
                //data: props.scoreData,
                data: dataScore,
                color: colors.primaryColor
            }
        ],
        [dataScore]
    )

    const data2 = useMemo(
        () => [
            {
                label: 'Identity matches',
                data: dataIden,
                color: colors.errorBorder
            }
        ],
        [dataIden]
    )

    const axes = useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )

    const series = useMemo(
        () => ({
            type: 'bar',
        }),
        []
    )

    const lineChart = (
        <div
            style={{
                width: '400px',
                height: '150px'
            }}
        >
            <Chart data={data} axes={axes} series={series} primaryCursor tooltip />
        </div>
    )

    const onLoad = () => {

    }

    const onCheck = () => {
        var arr = [];
        setDataScore(arr);
        setDataScore(props.scoreData);
        setDataIden(props.identityData)
        console.log(data)
        console.log(dataScore)
        //props.scoreData.push([arr])

        //console.log(props.scoreData)
    }
    return (
        <Container>
            {props.scoreData && props.identityData &&
                <Container>
                    <Typography variant="caption">
                        Correctness score history
                    </Typography>
                    <div
                        style={{
                            width: '400px',
                            height: '150px'
                        }}
                    >
                        <Chart data={data} axes={axes} series={series} primaryCursor tooltip />
                    </div>
                    <Typography variant="caption">
                        Identity score history
                    </Typography>
                    <div
                        style={{
                            width: '400px',
                            height: '150px'
                        }}
                    >
                        <Chart data={data2} axes={axes} series={series} primaryCursor tooltip />
                    </div>
                </Container>}
        </Container>
    );

}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionToProps = {
    userSignout: actions.signout,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(UserChart));