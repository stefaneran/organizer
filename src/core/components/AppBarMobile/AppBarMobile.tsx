import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { 
  Divider, 
  Typography,
  IconButton, 
  Button,
  CircularProgress 
} from '@material-ui/core';
import { PeopleIconSmall } from '@core/components/Icons/PeopleIcon';
import { CartIconSmall } from '@core/components/Icons/CartIcon';
import { FoodIconSmall } from '@core/components/Icons/FoodIcon';
import { ListIconMedium } from '@core/components/Icons/ListIcon';
import { CategoryType } from '@core/interfaces/general'
import AppStore from '@core/interfaces/AppStore.interface';
import ContactsStore from '@contacts/interfaces/ContactsStore.interface';
import SkillsStore from '@skills/interfaces/SkillsStore.interface';

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
    background: '#cdd0cb'
  },
  menuExit: {
    height: '100%',
    width: '25%'
  }
}));

const AppBar = ({ 
  app,
  contacts,
  skills,
  uploadContacts,
  uploadSkills,
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

        </div>
        <div className={classes.menuExit} onClick={toggleMenuOpen} />
      </div>
      <IconButton className={classes.hamburger} onClick={toggleMenuOpen}>
        <ListIconMedium />
      </IconButton>
    </>
  )
}

export default AppBar;