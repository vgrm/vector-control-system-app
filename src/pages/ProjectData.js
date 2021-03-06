import ProjectData from '../components/Project/ProjectData'
import { Box, Container, Paper, Typography } from "@material-ui/core";

const ProjectDataPage = (props) => {
    return (

        <div>
            <Container>
                <Box p={10}>
                    <Typography variant="h3">
                        Project data
                </Typography>
                </Box>
                <Paper>
                    <ProjectData />
                </Paper>
            </Container>
        </div>
    );

}

export default ProjectDataPage;