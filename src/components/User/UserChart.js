import { React, useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/user';
import { Container, withStyles, Typography } from "@material-ui/core";
import { Chart } from 'react-charts'
import colors from "../../Constants/colors";

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
    const [dataScore, setDataScore] = useState([]);
    const [dataIden, setDataIden] = useState([]);

    useEffect(() => {
        if (props.scoreData) {
            setDataScore(props.scoreData)
        }
    }, [props.scoreData])//componentDidMount

    useEffect(() => {
        if (props.identityData) {
            setDataIden(props.identityData)
        }
    }, [props.identityData])//componentDidMount

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