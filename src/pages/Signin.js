import { Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button, Typography } from "@material-ui/core";

import Signin from '../components/User/Signin';
const SigninPage = (props) => {

    return (
        <div>
            <Container>
                <Typography variant="h3">
                    AA SIGNIN
                    </Typography>

                <Paper>
                    <Signin/>
                </Paper>
            </Container>
        </div>
    );
}

export default SigninPage;