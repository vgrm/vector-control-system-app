import React from "react";

import HomePage from '../../pages/Home';

import ProjectDataPage from '../../pages/ProjectData';
import ProjectDataListPage from '../../pages/ProjectDataList';

import ProjectSetPage from '../../pages/ProjectSet';
import ProjectSetListPage from '../../pages/ProjectSetList';

import UserListPage from '../../pages/UserList';

const routes = {
  "/": () => <HomePage />,

  "/projectset": () => <ProjectSetListPage />,
  '/projectset/:projectsetId([0-9]+)': () => <ProjectSetPage/>,

  "/projectdata": () => <ProjectDataListPage />,
  "/projectdata/:projectId([0-9]+)": () => <ProjectDataPage />,

  "/user": () => <UserListPage />

};
export default routes;