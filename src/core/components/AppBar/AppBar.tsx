import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { 
  Paper, 
  Grid, 
  Divider, 
  Typography, 
  Tooltip, 
  IconButton, 
  Button, 
  CircularProgress 
} from '@material-ui/core';
import {
  Save as SaveIcon,
  Publish as PublishIcon
} from '@material-ui/icons';
import { BrainIconSmall } from '@core/components/Icons/BrainIcon';
import { PeopleIconSmall } from '@core/components/Icons/PeopleIcon';
import { CategoryType } from '@core/interfaces/general'
import AppStore from '@core/interfaces/AppStore.interface';
import ContactsStore from '@contacts/interfaces/ContactsStore.interface';
import SkillsStore from '@skills/interfaces/SkillsStore.interface';
import downloadJSON from '@core/utils/downloadJSON';
import dataMigration from '@store/utils/dataMigration';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    position: 'relative',
    backgroundColor: theme.palette.primary.main
  },
  rightSection: {
    display: 'flex',
    marginLeft: 'auto',
    alignSelf: 'center',
    paddingRight: '1em'
  },
  version: {
    alignSelf: 'center',
    marginLeft: '1em'
  },
  userName: {
    alignSelf: 'center',
  },
  loading: {
    width: '40px',
    color: '#fff',
    marginLeft: '1em',
    '&>div': {
      padding: '0.3em'
    }
  },
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
}));

interface ToolBarProps {
  app: AppStore;
  contacts: ContactsStore;
  skills: SkillsStore;
  uploadContacts: any;
  uploadSkills: any;
  setCurrentCategory: (categoryType: CategoryType) => void;
  setLoginDialog: (props: { type: string; isOpen: boolean; }) => () => void;
  onLogout: () => void;
}

const AppBar = ({ 
  app,
  contacts,
  skills,
  uploadContacts,
  uploadSkills,
  setCurrentCategory,
  setLoginDialog,
  onLogout
}: ToolBarProps) => {
  const classes = useStyles();

  const inputRef = React.useRef(null);

  const upload = () => {
    inputRef.current.click();
  }

  const handleUpload = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // @ts-ignore
      const data = JSON.parse(e.target.result); // TODO Deal with this typing
      const { contacts, skills } = dataMigration(data);
      uploadContacts({ contacts });
      uploadSkills({ skills });
    };
    reader.readAsText(event.target.files[0]); 
  }

  const handleChangeCategory = (categoryType: CategoryType) => () => {
    setCurrentCategory(categoryType)
  }

  return (
    <Paper className={classes.container}>
      <Grid container>

        <Divider orientation="vertical" flexItem style={{ backgroundColor: 'rgba(255,255,255,0.5)' }} />

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Show Skill View">
            <IconButton className={classes.button} onClick={handleChangeCategory(CategoryType.Skills)}>
              <BrainIconSmall />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Show Contacts View">
            <IconButton className={classes.button} onClick={handleChangeCategory(CategoryType.Contacts)}>
              <PeopleIconSmall />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Download Backup">
            <IconButton className={classes.button} onClick={downloadJSON({ app, contacts, skills })}>
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

        {!app.user.loggedIn ? (
          <>
            <Grid item className={classes.buttonContainer}>
              <Button className={classes.textButton} onClick={setLoginDialog({ type: 'register', isOpen: true })}>
                Register
              </Button>
            </Grid>

            <Grid item className={classes.buttonContainer}>
              <Button className={classes.textButton} onClick={setLoginDialog({ type: 'login', isOpen: true })}>
                Login
              </Button>
            </Grid>
          </>
        ) : (
          <Grid item className={classes.buttonContainer}>
            <Button className={classes.textButton} onClick={onLogout}>
              Logout
            </Button>
          </Grid>
        )}

        <div className={classes.rightSection}>

          {app.user.loggedIn && (
            <span className={classes.userName}>
              <Typography variant="subtitle1" style={{ color: '#fff' }}>{app.user.userName}</Typography>
            </span>
          )}

          <span className={classes.version}>
            <Typography variant="subtitle1" style={{ color: '#fff' }}>V{app.version}</Typography>
          </span>

          <div className={classes.loading}>
            {app.loading && (
              <CircularProgress color="inherit" />
            )}
          </div>

        </div>

      </Grid>
      <a id="downloadData" style={{ display: 'none' }} />
      <input 
        ref={inputRef} 
        onChange={handleUpload} 
        type="file" 
        id="uploadData" 
        style={{ display: 'none' }} 
      />
    </Paper>
  )
}

export default AppBar;