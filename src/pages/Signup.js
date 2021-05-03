import { Container, Paper } from "@material-ui/core";

import Signup from '../components/User/Signup';
const SignupPage = (props) => {

    return (
        <div>
            <Container>
                <Paper>
                    <Signup />
                </Paper>
            </Container>
        </div>
    );
}

export default SignupPage;