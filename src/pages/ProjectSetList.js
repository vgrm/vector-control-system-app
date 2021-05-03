import ProjectSetList from '../components/Project/ProjectSetList'
import { Box, Container, Paper, Typography } from "@material-ui/core";
const ProjectSetListPage = (props) => {

    return (
        <div>
            <Container>
                <Box p={10}>
                    <Typography variant="h3">
                        Project Sets
                    </Typography>
                </Box>
                <Paper>
                    <ProjectSetList {...props} />
                </Paper>
            </Container>
        </div>
    );
}

export default ProjectSetListPage;