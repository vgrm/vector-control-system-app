import ProjectSet from '../components/Project/ProjectSet';
import { Box, Container, Paper, Typography } from "@material-ui/core";

const ProjectSetPage = ({ classes, ...props }) => {
    return (
        <div>
            <Container>
                <Box p={10}>
                    <Typography variant="h3">
                        Project Set
                    </Typography>
                </Box>
                <Paper>
                    <ProjectSet {...props} />
                </Paper>
            </Container>
        </div>

    );

}

export default ProjectSetPage;