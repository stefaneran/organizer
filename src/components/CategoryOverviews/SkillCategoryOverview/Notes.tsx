import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, TextField, Typography, Button } from '@material-ui/core';

const { useState } = React;

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    padding: '1em'
  },
  innerContainer: {
    height: '100%',
    width: '100%'
  },
  content: {
    flexBasis: '75%',
    overflow: 'auto'
  },
  notes: {
    width: '100%',
    height: '100%',
    whiteSpace: 'pre-wrap'
  }
}));

const Notes = ({ store, title, notes }) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const [notesText, setNotesText] = useState(notes);

  const handleNotesInput = (event) => {
    setNotesText(event.target.value);
  }

  const handleStartEdit = () => {
    setIsEdit(true);
  }

  const handleEndEdit = (isSave: boolean) => () => {
    if(isSave) {
      const { updateSkillNotes, saveData } = store;
      updateSkillNotes({ title, newNotes: notesText });
      saveData();
    }
    else {
      setNotesText(notes);
    }
    setIsEdit(false);
  }

  const formatNotes = () => {
    return notes.split('\n').map((item, i) => {
      return <p key={i}>{item}</p>;
    });
  }

  return (
    <Paper className={classes.container}>
      <Grid container direction="column" className={classes.innerContainer}>
        <Grid item>
          <Typography variant="h6">Notes</Typography>
        </Grid>
        <Grid item className={classes.content}>
          {isEdit ? (
            <TextField className={classes.notes} value={notesText} onChange={handleNotesInput} multiline />
          ) : (
            <Typography variant="subtitle2">{formatNotes()}</Typography>
          )}
        </Grid>
        <Grid item>
          {isEdit ? (
            <>
              <Button variant="outlined" onClick={handleEndEdit(true)}>Save</Button>
              <Button variant="outlined" onClick={handleEndEdit(false)}>Cancel</Button>
            </>
          ) : (
            <Button variant="outlined" onClick={handleStartEdit}>Edit</Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Notes;