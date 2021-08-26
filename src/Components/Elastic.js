import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  paper: {
      margin: theme.spacing(2)
  },
  gridContainer: {
      marginTop: theme.spacing(1)
  },
  gridItem: {
      margin: theme.spacing(1)
  },
  gridItemPad: {
      padding: theme.spacing(2)
  },
  formControl: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  reqBody: {
      marginTop: theme.spacing(2)
  },
  response: {
      marginTop: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(2)
  }
}));

function Elastic() {
    const classes = useStyles();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [method, setMethod] = React.useState("GET");
    const [url, setUrl] = React.useState("");
    const [reqBody, setReqBody] = React.useState("")
    const [response, setResponse] = React.useState("")

    const handleUsernameChange = e => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    const handleMethodChange = e => {
        setMethod(e.target.value)
    }

    const handleUrlChange = e => {
        setUrl(e.target.value)
    }

    const handleReqBodyChange = e => {
        setReqBody(e.target.value)
    }

    const queryElastic = () => {
        let reqParams = {
            method: method,
            url: url,
            headers: {
              'Content-Type': 'application/json'
            },
          }
          if((method === 'POST' || method === 'PUT') && reqBody.length > 0) {
              reqParams.data= reqBody
          }
          if(username && password) {
            let creds = new Buffer(username + ':' + password);
            let b64String = creds.toString('base64');
            let authString = 'Basic ' + b64String
            reqParams.headers['Authorization'] = authString
        }
        axios(url, reqParams).then(response => {
            setResponse(JSON.stringify(response.data))
        }).catch(err => {
            setResponse(err)
        })
    }

    return (
      <div>
        <Paper elevation={3} className={classes.paper}>
            <Grid container>
                <Grid item xs={12} className={classes.gridItem}>
                <form className={classes.root}>
                    <Typography variant="h6">Login</Typography>
                    <TextField id="username" label="Username" value={username} onChange={handleUsernameChange} variant='outlined'/>
                    <TextField id="password" type="password" label="Password" value={password} onChange={handlePasswordChange} variant='outlined'/>
                </form>
                </Grid>
            </Grid>
        </Paper>
        <Paper elevation={3} className={classes.paper}>
            <Grid container>
                <Grid item xs={6} className={classes.gridItemPad}>
                    <Typography variant="h6">Input</Typography>
                    <Grid container spacing={1} className={classes.gridContainer}>
                    <Grid item xs="3">                        
                        <Select
                        id="http-method-select"
                        value={method}
                        onChange={handleMethodChange}
                        label="Method" variant="outlined"
                        fullWidth
                        >
                        <MenuItem value="GET">GET</MenuItem>
                        <MenuItem value="POST">POST</MenuItem>
                        <MenuItem value="PUT">PUT</MenuItem>
                        <MenuItem value="DELETE">DELETE</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs="9">
                    <TextField id="url" label="URL" value={url} onChange={handleUrlChange} variant='outlined' fullWidth/>
                    </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="request-body"
                            label="Request Body"
                            multiline
                            rows={10}
                            value={reqBody}
                            onChange={handleReqBodyChange}
                            variant="outlined"
                            fullWidth
                            className={classes.reqBody}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={queryElastic} className={classes.button}>
                            Query
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={6} className={classes.gridItemPad}>
                    <Typography variant="h6">Output</Typography>
                        <TextField
                            id="response" 
                            label="response"
                            multiline
                            rows={14}
                            value={response}
                            variant="outlined"
                            fullWidth
                            className={classes.response}/>
                </Grid>
            </Grid>
        </Paper>
      </div>
    );
  }
  
export default Elastic;