import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, TextField, Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    padding: '1em',
    position: 'relative',
    backgroundColor: theme.palette.primary.main
  },
  innerContainer: {
    height: '100%',
    padding: '0.2em 0.5em'
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    maxHeight: '73%',
    '& > *': {
      maxHeight: '100%',
      overflow: 'auto',
      '& > *': {
        maxHeight: '100%',
      }
    }
  },
  notes: {
    width: '100%',
    height: '100%',
    whiteSpace: 'pre-wrap'
  },
  editBtn: {
    position: 'absolute',
    right: '1em',
    top: '1em'
  }
}));

const SkillNotes = ({ notes, onEditSave }) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = React.useState(false);
  const [notesText, setNotesText] = React.useState(notes);

  const handleNotesInput = (event) => {
    setNotesText(event.target.value);
  }

  const handleStartEdit = () => {
    setIsEdit(true); 
  }

  const handleEndEdit = (isSave: boolean) => () => {
    if(isSave) {
      onEditSave({ property: 'notes', value: notesText })
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
      <Paper className={classes.innerContainer}>
        <Grid container direction="column" style={{ height: '100%' }}>
          <Grid item>
            <Typography variant="h6">Notes</Typography>
            <IconButton className={classes.editBtn} onClick={handleStartEdit} disabled={isEdit}>
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item className={classes.content}>
            {isEdit ? (
              <TextField className={classes.notes} value={notesText} onChange={handleNotesInput}  rows={10} multiline />
            ) : (
              <Typography variant="subtitle2">{formatNotes()}</Typography>
            )}
          </Grid>
          <Grid item className={classes.actions}>
            {isEdit ? (
              <>
                <IconButton onClick={handleEndEdit(true)}>
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleEndEdit(false)}>
                  <CancelIcon />
                </IconButton>
              </>
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  )
}

export default SkillNotes;