//import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Box, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button, Typography } from "@material-ui/core";
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './NavigationMenu.css';
import React, { useState, useEffect } from "react";
/*
export class NavigationMenu extends Component {
    static displayName = NavigationMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
*/
const NavigationMenu = ({ classes, ...props }) => {
    const [collapsed, setCollapsed] = useState(false)
    //render() {
    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">Vector Control System</NavbarBrand>
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                        <ul className="navbar-nav flex-grow">

                            {!props.user.isLoggedIn &&
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/signin">Signin</NavLink>
                                </NavItem>}
                            {!props.user.isLoggedIn &&
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/signup">Signup</NavLink>
                                </NavItem>}
                            {props.user.isLoggedIn &&
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/projectsets">Project Sets</NavLink>
                                </NavItem>}
                            {props.user.isLoggedIn &&
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/profile">Profile of {props.user.userCurrent.username}</NavLink>
                                </NavItem>}
                                {props.user.isLoggedIn &&
                                props.user.userCurrent.roleId == -1 &&
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/admin">ADMIN</NavLink>
                                </NavItem>}
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
//}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionToProps = {
}

//export default NavigationMenu;
export default connect(mapStateToProps, mapActionToProps)(NavigationMenu);