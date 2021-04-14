
import { React, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/projectSet';

const ProjectSetList = (props) => {

    useEffect(() => {
        props.fetchAllProjectSet()
    }, [])//componentDidMount

    return (<div>
        project set list
    </div>);

}

const mapStateToProps = state => ({
    projectSetList: state.projectSet.list
})

const mapActionToProps = {
    fetchAllProjectSet: actions.fetchAll,
    //deleteProjectSet: actions.Delete
}

export default connect(mapStateToProps,mapActionToProps)(ProjectSetList);