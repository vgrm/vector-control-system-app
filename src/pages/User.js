import { Box, Container, Paper, Typography } from "@material-ui/core";
import User from '../components/User/User'

const UserPage = (props) => {
    return (
        <div>
            <Container>
                <Box p={10}>
                    <Typography variant="h3">
                        User Profile
                        </Typography>
                </Box>
                <Paper>
                    <User />
                </Paper>
            </Container>
        </div>

    );
}

export default UserPage;