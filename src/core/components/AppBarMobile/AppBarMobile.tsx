import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button
} from '@material-ui/core';
import { HamburgerIconLarge } from '@core/components/Icons/ListIcon';
import { PeopleIconXL } from '@core/components/Icons/PeopleIcon';
import { CartIconXLFill } from '@core/components/Icons/CartIcon';
import { FoodIconXL } from '@core/components/Icons/FoodIcon';
import { LogInIconXL } from '@core/components/Icons/LoginIcon';
import { CategoryType } from '@core/interfaces/general';

const useStyles = makeStyles((theme: Theme) => createStyles({
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
    height: '100%',
    width: '75%',
    background: '#cdd0cb',
    padding: '10em 3em'
  },
  menuExit: {
    height: '100%',
    width: '25%'
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
    position: 'absolute',
    bottom: '0'
  },
  logInButton: {
    marginRight: '1em',
    fontSize: '3em',
  },
  registerButton: {
    fontSize: '3em',
  }
}));

const AppBarMobile = ({
  setCurrentCategory,
  setLoginDialog,
  onLogout
}) => {
  const classes = useStyles();

  const [isMenuOpen, setMenuOpen] = React.useState(false);

  const toggleMenuOpen = () => {
    setMenuOpen(!isMenuOpen);
  }
  const handleChangeCategory = (categoryType: CategoryType) => () => {
    setCurrentCategory(categoryType)
  }

  return (
    <>
      <div 
        style={{ left: isMenuOpen ? '0%' : '-100%' }}
        className={classes.menu}
      >
        <div className={classes.menuContent}>
          <List component="div">

            <ListItem className={classes.listItem} onClick={handleChangeCategory(CategoryType.Contacts)}>
              <ListItemIcon>
                <PeopleIconXL />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary={CategoryType.Contacts} />
            </ListItem>

            <ListItem className={classes.listItem} onClick={handleChangeCategory(CategoryType.Inventory)}>
              <ListItemIcon>
                <CartIconXLFill />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary={CategoryType.Inventory} />
            </ListItem>

            <ListItem className={classes.listItem} onClick={handleChangeCategory(CategoryType.Recipes)}>
              <ListItemIcon>
                <FoodIconXL />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary={CategoryType.Recipes} />
            </ListItem>

          </List>
          
          <div className={classes.login}>
            <Button
              className={classes.logInButton}
              onClick={setLoginDialog({ type: 'login', isOpen: true })}
              startIcon={<LogInIconXL />}
            >
              Log In
            </Button>
            <Button
              className={classes.registerButton}
              onClick={setLoginDialog({ type: 'register', isOpen: true })}
            >
              Register
            </Button>
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