import { Typography, Container, Box, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import VectorArt from '../resources/vectorArt.svg';
const HomePage = (props) => {
    return (
        <Container>
            <div>
                <Typography variant="h3">
                    VECTOR GRAPHICS IDENTITY AND CORRECTNESS CONTROL SYSTEM
                    
                    <img src={VectorArt} alt="Italian Trulli"></img>

                </Typography>

                <Typography variant="h6">
                    Home page
                    </Typography>
                <h1>FeatherInk L3</h1>

                    <Typography> where designers meet their clients </Typography>

                <p>Welcome to graphics design solutions page</p>
            </div>
        </Container>
    );

}

export default HomePage;