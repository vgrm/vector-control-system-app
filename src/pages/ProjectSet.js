import ProjectSetList from '../components/Project/ProjectSetList';
import ProjectSetForm from '../components/Project/ProjectSetForm';
import ProjectSet from '../components/Project/ProjectSet';
import { Box,Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button, Typography } from "@material-ui/core";

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