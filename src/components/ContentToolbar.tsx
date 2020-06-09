import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Divider, Typography, Tooltip, IconButton } from '@material-ui/core';
import {
  Save as SaveIcon,
  Publish as PublishIcon
} from '@material-ui/icons';
import { BrainIconSmall } from '@components/Icons/BrainIcon';
import { PeopleIconSmall } from '@components/Icons/PeopleIcon';
import downloadJSON from '@utils/downloadJSON';

const { useRef } = React;

export const exportedStyles = {
  buttonContainer: {
    padding: '0.3em'
  },
  button: {
    padding: '0.2em',
    '&:hover': {
      background: 'rgba(255,255,255,0.2)'
    }
  },
  buttonIcon: {
    width: '1.5em',
    height: '1.5em'
  },
  textButton: {
    color: '#fff',
    position: 'relative' as 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    marginLeft: '0.5em',
    '&>span>span': {
      marginLeft: '0',
      marginRight: '0'
    }
  }
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    position: 'relative',
    backgroundColor: theme.palette.primary.main
  },
  version: {
    position: 'absolute',
    right: '0.5em',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  ...exportedStyles
}));

interface ToolBarProps {
  store: any;
  toolBarHandlers: any;
  specializedButtons?: JSX.Element
}

const ContentToolbar = ({ store, toolBarHandlers, specializedButtons }: ToolBarProps) => {
  const classes = useStyles();

  const inputRef = useRef(null);

  const upload = () => {
    inputRef.current.click();
  }
  const onUpload = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // @ts-ignore
      const data = JSON.parse(e.target.result); // TODO Deal with this typing
      store.loadBackupData({ data });
      store.saveData();
    };
    reader.readAsText(event.target.files[0]); 
  }

  return (
    <Paper className={classes.container}>
      <Grid container>

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Show Skill View">
            <IconButton className={classes.button} onClick={toolBarHandlers.viewSkills}>
              <BrainIconSmall />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Show Contacts View">
            <IconButton className={classes.button} onClick={toolBarHandlers.viewContacts}>
              <PeopleIconSmall />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Download Backup">
            <IconButton className={classes.button} onClick={downloadJSON(store)}>
              <SaveIcon className={classes.buttonIcon} style={{ height: '1.5em', color: '#fff' }} />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Upload Backup">
            <IconButton className={classes.button} onClick={upload}>
              <PublishIcon className={classes.buttonIcon} style={{ height: '1.5em', color: '#fff' }} />
            </IconButton>
          </Tooltip>
        </Grid>

        <Divider orientation="vertical" flexItem style={{ backgroundColor: 'rgba(255,255,255,0.5)' }} />

        {specializedButtons}

        <span className={classes.version}>
          <Typography variant="subtitle1" style={{ color: '#fff' }}>V{store.version}</Typography>
        </span>

      </Grid>
      <a id="downloadData" style={{ display: 'none' }} />
      <input ref={inputRef} onChange={onUpload} type="file" id="uploadData" style={{ display: 'none' }} />
    </Paper>
  )
}

export default ContentToolbar;