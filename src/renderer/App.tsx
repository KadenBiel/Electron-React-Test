import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const style = makeStyles(() => ({
    button: {
		WebkitAppRegion: 'no-drag',
		marginLeft: 'auto',
		padding: 0,
		position: 'absolute',
		top: 0,
	},
    title: {
		width: '100%',
		textAlign: 'center',
		display: 'block',
	}
}));

const TitleBar: React.FC = function () {
    const classes = style();
    return(
        <div>
            <span className={classes.title}>React-hook tests</span>
            <IconButton
                className={classes.button}
                onClick={() => {ipcRenderer.send('quit-app')}}
            >
                <CloseIcon />
            </IconButton>
        </div>
    )
}

const App: React.FC = function () {
    const [stateTest, setStateTest] = useState(true) 
    return (
        <div>
            <TitleBar />
            <h1>React-Hook test</h1>
            <Button onClick={() => {setStateTest(true)}}>Open</Button>
            <Dialog open={stateTest}>
                <DialogTitle>This is a Dialog</DialogTitle>
                <DialogContent>
                    It works!
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setStateTest(false)}}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))