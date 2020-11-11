import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, AppBar, Tabs, Tab, Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import SkillItem from './SkillItem';
import DialogTypes from '@skills/interfaces/DialogTypes.interface';

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

const SkillItemList = ({ 
  skill,
  onOpenDialog,
  setSelectedItem
}) => {
  const classes = useStyles();

  const [currentTab, setCurrentTab] = React.useState(0);

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
            onClick={onOpenDialog(DialogTypes.ChooseSkillItemType)} 
            endIcon={<AddIcon />}
            style={{ color: '#fff' }}
          >
            Add Item
          </Button>
        </Grid>
        {currentTab === 0 ? (
          <Grid className={'gridRow'} item xs={9}>
            {skill.items && skill.items.map(item => (
              <SkillItem 
                key={`${item.title}-${item.itemType}`}
                item={item} 
                onOpenDialog={onOpenDialog}
                type="active"
                setSelected={setSelectedItem}
              />
            ))}
          </Grid>
        ) : (
          <Grid className={'gridRow'} item xs={9}>
            {skill.archive && skill.archive.map(item => (
              <SkillItem 
                key={`${item.title}-${item.itemType}`}
                item={item}
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