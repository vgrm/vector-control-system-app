import { Box, Container, Paper, Typography } from "@material-ui/core";
import Profile from '../components/User/UserProfile'

const ProfilePage = (props) => {
    return (
        <div>
            <Container>
                <Box p={10}>
                    <Typography variant="h3">
                        Profile
                    </Typography>
                </Box>
                <Paper>
                    <Profile />
                </Paper>
            </Container>
        </div>
    );
}

export default ProfilePage;