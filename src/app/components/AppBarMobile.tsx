import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button
} from '@material-ui/core';
import { HamburgerIconLarge } from '@core/components/Icons/ListIcon';
import { CartIconXLFill } from '@core/components/Icons/CartIcon';
import { FoodIconXL } from '@core/components/Icons/FoodIcon';
import { PeopleIconXL } from '@core/components/Icons/PeopleIcon';
import { LogInIconXL } from '@core/components/Icons/LoginIcon';
import { StateSetter, OrganizerModule, AppStore } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  hamburger: {
    position: 'absolute',
    top: '0.5em',
    left: '0.5em',
    zIndex: 15
  },
  menu: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    transition: 'left 300ms',
    display: 'flex',
    zIndex: 10
  },
  menuContent: {
    position: 'relative',
    height: '100%',
    width: '75%',
    background: '#ecedf0',
  },
  menuExit: {
    height: '100%',
    width: '25%'
  },
  listContainer: {
    padding: '10em 3em'
  },
  listItem: {
    marginBottom: '1em'
  },
  listItemText: {
    '& span': {
      fontSize: '4em',
      paddingLeft: '1em'
    }
  },
  login: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: '6em'
  },
  logInButton: {
    fontSize: '3em',
  },
  registerButton: {
    fontSize: '3em',
  }
}));

interface Props {
  app: AppStore["app"];
  setCurrentModule: StateSetter<OrganizerModule>;
  setLoginDialog: (prop: { type: string; isOpen: boolean }) => () => void;
  onLogout: () => void;
}

const AppBarMobile: React.FC<Props> = ({
  app,
  setCurrentModule,
  setLoginDialog,
  onLogout
}) => {
  const classes = useStyles();

  const [isMenuOpen, setMenuOpen] = React.useState(false);

  const toggleMenuOpen = () => {
    setMenuOpen(!isMenuOpen);
  }
  const handleChangeModule = (OrganizerModule: OrganizerModule) => () => {
    setCurrentModule(OrganizerModule)
    toggleMenuOpen();
  }

  return (
    <>
      <div 
        style={{ left: isMenuOpen ? '0%' : '-100%' }}
        className={classes.menu}
      >
        <div className={classes.menuContent}>
          <List component="div" className={classes.listContainer}>

            <ListItem className={classes.listItem} onClick={handleChangeModule(OrganizerModule.Contacts)}>
              <ListItemIcon>
                <PeopleIconXL />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary={OrganizerModule.Contacts} />
            </ListItem>

            <ListItem className={classes.listItem} onClick={handleChangeModule(OrganizerModule.Inventory)}>
              <ListItemIcon>
                <CartIconXLFill />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary={OrganizerModule.Inventory} />
            </ListItem>

            <ListItem className={classes.listItem} onClick={handleChangeModule(OrganizerModule.Recipes)}>
              <ListItemIcon>
                <FoodIconXL />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary={OrganizerModule.Recipes} />
            </ListItem>

          </List>
          
          <div className={classes.login}>
            {!app.user.loggedIn ? (
              <>
                <Button
                  className={classes.logInButton}
                  onClick={setLoginDialog({ type: 'login', isOpen: true })}
                  startIcon={<LogInIconXL />}
                  variant="outlined"
                  color="primary"
                >
                  Log In
                </Button>
                <Button
                  className={classes.registerButton}
                  onClick={setLoginDialog({ type: 'register', isOpen: true })}
                  variant="outlined"
                  color="primary"
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                className={classes.logInButton}
                onClick={onLogout}
                variant="outlined"
                color="primary"
              >
                Log Out
              </Button>
            )}
          </div>
        </div>
        <div className={classes.menuExit} onClick={toggleMenuOpen} />
      </div>
      <IconButton className={classes.hamburger} onClick={toggleMenuOpen}>
        <HamburgerIconLarge />
      </IconButton>
    </>
  )
}

export default AppBarMobile;