import { Typography, Container, Box, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import VectorArt from '../Constants/VectorArt.svg';
const HomePage = (props) => {
    return (
        <Container>
            <Grid container>
                <Grid item className="grid-el" xs={12} md={5}>
                    <Box p={10}>
                        <Typography variant="h3">
                            VECTOR GRAPHICS IDENTITY AND CORRECTNESS CONTROL SYSTEM
                    </Typography>
                    </Box>
                </Grid>
                <Grid item className="grid-el" xs={12} md={5}>
                    <img src={VectorArt} alt="Logo" />
                </Grid>
            </Grid>
        </Container>
    );

}

export default HomePage;