import React, { Component } from 'react';
import './App.css';
import { chain } from 'lodash';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VideocamIcon from '@material-ui/icons/Videocam';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';




class App extends Component {

  constructor(props) {
    super(props);


   
    this.state = {
      BattedBallData: []

    };
  }

  
 componentDidMount()
 {

  const results = require('./BattedBallData.json');

  //using lodash to group the data by batter name
  const grouped = chain(results.Data)
  .groupBy("BATTER")
  .map((value, key) => ({ player: key, data: value }))
  .value()



  this.setState({ BattedBallData: grouped})

  }



  render() {

  
    const { BattedBallData } = this.state;


    return ( 
      <Container fixed>

          <Typography component="div">
            <Box align="center" fontFamily="fontFamily" m={1}>
            Batted ball data by hitter. Data is sorted by exit velocity
            </Box>
          </Typography>

          {BattedBallData.map((BattedData, index) => { 

        
     
            return (
                    <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{BattedData.player}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>

                        <Paper>
                          <Table aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell>BATTER</TableCell>
                                <TableCell>PITCHER</TableCell>
                                <TableCell align="center">DATE</TableCell>
                                <TableCell align="center">EXIT VELOCITY</TableCell>
                                <TableCell align="center">LAUNCH ANGLE</TableCell>
                                <TableCell align="center">OUTCOME</TableCell>
                                <TableCell align="center">VIDEO</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                            {BattedData.data.sort((a, b) => b.EXIT_SPEED - a.EXIT_SPEED).map((PlayerData, i) => { 

                              return (
                              <TableRow key={i}>
                                <TableCell>{PlayerData.BATTER}</TableCell>
                                <TableCell>{PlayerData.PITCHER}</TableCell>
                                <TableCell align="center">{PlayerData.GAME_DATE}</TableCell>
                                <TableCell align="center">{PlayerData.EXIT_SPEED}</TableCell>
                                <TableCell align="center">{PlayerData.LAUNCH_ANGLE}</TableCell>
                                <TableCell align="center">{PlayerData.PLAY_OUTCOME}</TableCell>
                                <TableCell align="center"><a href={PlayerData.VIDEO_LINK} target="_blank"><VideocamIcon /></a></TableCell>
                              </TableRow>
                              )
                            })}
                      
                            </TableBody>
                          </Table>
                        </Paper>

                    </Typography>
                    </ExpansionPanelDetails>
                    </ExpansionPanel>)
          })}

      </Container>
    
    )
  }
}

export default App;

