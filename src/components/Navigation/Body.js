import { Route } from 'react-router';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

import HomePage from '../../pages/Home';

import ProjectDataPage from '../../pages/ProjectData';
import ProjectDataListPage from '../../pages/ProjectDataList';

import ProjectSetPage from '../../pages/ProjectSet';
import ProjectSetListPage from '../../pages/ProjectSetList';

import UserListPage from '../../pages/UserList';

function Body() {
    return (
        <Container fluid="true">
            omg its a body
            <Route exact path="/" component={HomePage} />
            <Route path='/projectset' component={ProjectSetListPage} />
            <Route path='/projectset/:projectsetId([0-9]+)' component={ProjectSetPage} />
            <Route path='/projectdata' component={ProjectDataListPage} />
            <Route path='/projectdata/:projectId([0-9]+)' component={ProjectDataPage} />
            <Route path='/user' component={UserListPage} />
        </Container>
    );
}

export default Body;