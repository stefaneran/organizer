import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, AppBar, Tabs, Tab, Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import SkillItem from './SkillItem';

const { useState } = React;

const useStyles = makeStyles((theme: Theme) => createStyles({
  tab: {
    minWidth: 'auto',
    flexGrow: 1
  },
  toolbar: {
    backgroundColor: theme.palette.primary.main,
    textAlign: 'center',
    marginBottom: '0.5em'
  }
}));

const SkillItemList = ({ items = [], archive = [], openDialog }) => {
  const classes = useStyles();

  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, tab) => {
    setCurrentTab(tab);
  }

  return (
    <div>
      <AppBar position="static">
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab className={classes.tab} label="Current" />
          <Tab className={classes.tab} label="Archive" />
        </Tabs>
      </AppBar>
      <Grid container direction="column">
        <Grid className={clsx(classes.toolbar, 'gridRow')} item xs={1}>
          <Button
            onClick={openDialog({ type: 'chooseItemType' })} 
            endIcon={<AddIcon />}
            style={{ color: '#fff' }}
          >
            Add Item
          </Button>
        </Grid>
        {currentTab === 0 ? (
          <Grid className={'gridRow'} item xs={9}>
            {items && items.map(item => (
              <SkillItem 
                key={`${item.title}-${item.itemType}`} 
                item={item} 
                openDialog={openDialog}
                type="active"
              />
            ))}
          </Grid>
        ) : (
          <Grid className={'gridRow'} item xs={9}>
            {archive && archive.map(item => (
              <SkillItem 
                key={`${item.title}-${item.itemType}`}
                item={item} 
                openDialog={openDialog}
                type="archive"
              />
            ))}
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default SkillItemList;