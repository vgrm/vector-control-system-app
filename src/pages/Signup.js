import { Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button, Typography } from "@material-ui/core";

import Signup from '../components/User/Signup';
const SignupPage = (props) => {

    return (
        <div>
            <Container>
                <Paper>
                    <Signup/>
                </Paper>
            </Container>
        </div>
    );
}

export default SignupPage;