import {Typography, Container, Box, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import VectorArt from '../resources/vectorArt.svg';
const HomePage = (props) => {
    return (
    <div>
        <Typography variant="h3">
                    VECTOR GRAPHICS IDENTITY AND CORRECTNESS CONTROL SYSTEM
                    <img src={VectorArt} alt="Italian Trulli"></img>

                    </Typography>

                    <Typography variant="h6">
                    Home page
                    </Typography>
    </div>);

}

export default HomePage;