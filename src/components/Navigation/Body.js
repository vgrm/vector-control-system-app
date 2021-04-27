import { React, useState, useEffect } from 'react';
import { Route } from 'react-router';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

import HomePage from '../../pages/Home';

import ProjectDataPage from '../../pages/ProjectData';
import ProjectDataListPage from '../../pages/ProjectDataList';

import ProjectSetPage from '../../pages/ProjectSet';
import ProjectSetFormPage from '../../pages/ProjectSetForm';
import ProjectSetListPage from '../../pages/ProjectSetList';

import UserListPage from '../../pages/UserList';

import SignupPage from '../../pages/Signup';
import SigninPage from '../../pages/Signin';
import UserProfilePage from '../../pages/Profile';

import AdminPage from '../../pages/Admin';
//function Body() { <Route path='/projectset/:projectsetId([0-9]+)' component={ProjectSetPage} /> <Route path='/projectset' component={ProjectSetListPage} />
    const Body = ({ classes, ...props }) => {
        const [currentProjectId, setCurrentProjectId] = useState(0)

    return (
        <Container fluid="true">
            <Route exact path="/" component={HomePage} />
            
            <Route path='/projectsets'>
            <ProjectSetListPage {...({ currentProjectId, setCurrentProjectId})}/>
            </Route>

            <Route path='/projectset/:projectsetId([0-9]+)'>
                <ProjectSetPage {...({ currentProjectId, setCurrentProjectId})}/>
            </Route>

            <Route path='/projectsetform/:projectsetId([0-9]+)'>
                <ProjectSetFormPage/>
            </Route>

            <Route path='/projects' component={ProjectDataListPage} />
            <Route path='/projectdata/:projectId([0-9]+)' component={ProjectDataPage}/>
            <Route path='/user' component={UserListPage} />

            <Route path='/signup' component={SignupPage} />
            <Route path='/signin' component={SigninPage} />

            <Route path='/profile' component={UserProfilePage} />

            <Route path='/admin' component={AdminPage} />

        </Container>
    );
}

export default Body;