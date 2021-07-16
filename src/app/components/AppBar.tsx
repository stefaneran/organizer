import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { 
  Paper, 
  Grid,
  Typography, 
  Tooltip, 
  IconButton, 
  Button,
  CircularProgress 
} from '@material-ui/core';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import { PeopleIconSmall } from 'core/components/Icons/PeopleIcon';
import { CartIconSmall } from 'core/components/Icons/CartIcon';
import { FoodIconSmall } from 'core/components/Icons/FoodIcon';
import { LogInIconSmall } from 'core/components/Icons/LoginIcon';
import { CategoryType, AppStore } from 'core/types';

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
  saveButton: {
    borderLeft: '2px solid rgba(255,255,255,0.6)',
  },
  uploadButton: {
    borderRight: '2px solid rgba(255,255,255,0.6)',
  },
  buttonContainer: {
    padding: '0.3em'
  },
  button: {
    padding: '0.2em',
    '&:hover': {
      background: 'rgba(255,255,255,0.2)'
    },
  },
  buttonIcon: {
    width: '1.5em',
    height: '1.5em'
  },
  textButton: {
    color: '#fff',
    position: 'relative' as const,
    top: '50%',
    transform: 'translateY(-50%)',
    marginLeft: '0.5em',
    fontSize: '1.2em',
    '&>span>span': {
      marginLeft: '0',
      marginRight: '0'
    }
  },
  activitiesIcon: {
    height: '1.5em',
    width: '1.5em',
    color: '#fff'
  }
}));

interface AppBarProps {
  app: AppStore["app"];
  setCurrentCategory: (categoryType: CategoryType) => void;
  setLoginDialog: (props: { type: string; isOpen: boolean; }) => () => void;
  onLogout: () => void;
}

const AppBar = ({ 
  app,
  setCurrentCategory,
  setLoginDialog,
  onLogout
}: AppBarProps) => {
  const classes = useStyles();

  const handleChangeCategory = (categoryType: CategoryType) => () => {
    setCurrentCategory(categoryType)
  }

  return (
    <Paper className={classes.container}>
      <Grid container>

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Show Contacts">
            <IconButton className={classes.button} onClick={handleChangeCategory(CategoryType.Contacts)}>
              <PeopleIconSmall />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Show Activities">
            <IconButton className={classes.button} onClick={handleChangeCategory(CategoryType.Activities)}>
              <LocalActivityIcon className={classes.activitiesIcon} />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Show Inventory">
            <IconButton className={classes.button} onClick={handleChangeCategory(CategoryType.Inventory)}>
              <CartIconSmall />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Show Recipes">
            <IconButton className={classes.button} onClick={handleChangeCategory(CategoryType.Recipes)}>
              <FoodIconSmall />
            </IconButton>
          </Tooltip>
        </Grid>

        {!app.user.loggedIn ? (
          <>
            <Grid item className={classes.buttonContainer}>
              <Button 
                className={classes.textButton} 
                startIcon={<LogInIconSmall />}
                onClick={setLoginDialog({ type: 'login', isOpen: true })}
              >
                Login
              </Button>
            </Grid>
            <Grid item className={classes.buttonContainer}>
              <Button 
                className={classes.textButton}
                onClick={setLoginDialog({ type: 'register', isOpen: true })}
              >
                Register
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
    </Paper>
  )
}

export default AppBar;