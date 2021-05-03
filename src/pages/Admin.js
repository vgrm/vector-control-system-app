import { Container, Paper, Typography } from "@material-ui/core";
import UserList from '../components/Admin/UserList';

const AdminPage = (props) => {
    return (
        <div>
            <Container>
                <Typography variant="h3">
                    ADMIN PAGE
                    </Typography>

                <Paper>
                    <UserList />
                </Paper>
            </Container>
        </div>
    );
}

export default AdminPage;