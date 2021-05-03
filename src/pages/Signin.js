import { Container, Paper } from "@material-ui/core";

import Signin from '../components/User/Signin';
const SigninPage = (props) => {

    return (
        <div>
            <Container>
                <Paper>
                    <Signin />
                </Paper>
            </Container>
        </div>
    );
}

export default SigninPage;