import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, AppBar, Tabs, Tab, Button, Typography } from '@material-ui/core';
import { SkillItemType } from '@interfaces/categories/skill/Skill.interface';

const { useState } = React;

// @ts-ignore - flexGrow produces a TS error for some reason
const useStyles = makeStyles(theme => ({
  container: {
    height: '100%'
  },
  innerContainer: {
    height: '100%',
    padding: '0.5em'
  },
  tab: {
    minWidth: 'auto',
    flexGrow: '1'
  }
}));

const ItemList = ({ items = [], archive = [], openDialog }) => {
  const classes = useStyles();

  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, tab) => {
    setCurrentTab(tab);
  }

  const BookItem = ({ item }) => {
    return (
      <Paper key={`${item.title}-${item.itemType}`} onClick={()=>{/** TODO */}}>
        <Typography variant="subtitle1">{item.title}</Typography>
        <Typography variant="subtitle1">Progress: {item.pagesRead}/{item.pagesTotal}</Typography>
        <Button variant="outlined" onClick={()=>{/** TODO */}}>Update</Button>
      </Paper>
    )
  }

  const CourseItem = ({ item }) => {
    return (
      <Paper key={`${item.title}-${item.itemType}`} onClick={()=>{/** TODO */}}>
        <Typography variant="subtitle1">{item.title}</Typography>
        <Typography variant="subtitle1">Progress: {item.classesDone}/{item.classesTotal}</Typography>
        <Button variant="outlined" onClick={()=>{/** TODO */}}>Update</Button>
      </Paper>
    )
  }

  const mapSkillType = (item) => {
    const { itemType } = item;
    const map = {
      [SkillItemType.Book]: <BookItem item={item} />,
      [SkillItemType.Course]: <CourseItem item={item} />
    }
    return map[itemType]
  }

  return (
    <Paper className={classes.container}>
      <AppBar position="static">
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab className={classes.tab} label="Current" />
          <Tab className={classes.tab} label="Archive" />
        </Tabs>
      </AppBar>
      <Grid className={classes.innerContainer} container direction="column">
        <Grid className={'gridRow'} item xs={1}>
          <Typography variant="subtitle1">Filters</Typography>
          <Button variant="outlined" onClick={openDialog({ type: 'chooseItemType' })}>Add Item</Button>
        </Grid>
        {currentTab === 0 ? (
          <Grid className={'gridRow'} item xs={9}>
            {items && items.map(mapSkillType)}
          </Grid>
        ) : (
          <Grid className={'gridRow'} item xs={9}>
            {archive && archive.map(item => (
              <Paper key={item.title}>
                Archive Item
              </Paper>
            ))}
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}

export default ItemList;