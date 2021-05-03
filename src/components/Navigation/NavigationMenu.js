//import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './NavigationMenu.css';
import React from "react";

const NavigationMenu = ({ classes, ...props }) => {

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">Vector Control System</NavbarBrand>
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={true} navbar>
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
                                props.user.userCurrent.roleId === -1 &&
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

const mapStateToProps = state => ({
    user: state.user
})

const mapActionToProps = {
}

//export default NavigationMenu;
export default connect(mapStateToProps, mapActionToProps)(NavigationMenu);