import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, AppBar, Tabs, Tab, Button, Typography } from '@material-ui/core';
import { SkillItemType } from '@interfaces/categories/skill/Skill.interface';

const { Fragment, useState } = React;

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
      <Paper onClick={()=>{/** TODO */}}>
        <Typography variant="subtitle1">
          {item.title}
        </Typography>
        <Typography variant="subtitle1">
          Pages: {item.pagesRead}/{item.pagesTotal}
        </Typography>
        <Button variant="outlined" onClick={openDialog({ type: 'updateBook', data: item })}>
          Update
        </Button>
      </Paper>
    )
  }

  const CourseItem = ({ item }) => {
    return (
      <Paper onClick={()=>{/** TODO */}}>
        <Typography variant="subtitle1">
          {item.title}
        </Typography>
        <Typography variant="subtitle1">
          Classes: {item.classesDone}/{item.classesTotal}
        </Typography>
        <Button variant="outlined" onClick={openDialog({ type: 'updateCourse', data: item })}>
          Update
        </Button>
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
            {items && items.map(item => (
              <Fragment key={`${item.title}-${item.itemType}`}>
                {mapSkillType(item)}
              </Fragment>
            ))}
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