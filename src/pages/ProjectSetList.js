import ProjectSetList from '../components/Project/ProjectSetList'
import ProjectSetForm from '../components/Project/ProjectSetForm'
import { Box, Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button, Typography } from "@material-ui/core";
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