import * as React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FrontCategory from './FrontCategory';
import SideCategory from './SideCategory';

const useStyles = makeStyles(theme => ({
  container: {},
  invisibleButton: {

  }
}));

const getIndex = (currentIndex: number, length: number, direction: 1 | -1) => {
  const x = currentIndex + direction;
  if(direction < 0)
    return (x < 0) ? length - 1 : x;
  return (x >= length) ? 0 : x;
}

const CategoryCarousel = ({ categories = [] }) => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const numOfCategories = categories.length;
  const leftCategory = categories[getIndex(currentIndex, numOfCategories, -1)];
  const rightCategory = categories[getIndex(currentIndex, numOfCategories, 1)];
  const currentCategory = categories[currentIndex];

  const moveCarousel = (direction: 1 | -1) => () => {
    setCurrentIndex(direction)
  }

  return (
    <Grid container direction="row" justify="space-between" className={classes.container}>
      <div className={classes.invisibleButton} onClick={moveCarousel(-1)}></div>
      <SideCategory category={leftCategory} />
      <FrontCategory category={currentCategory} />
      <SideCategory category={rightCategory} />
      <div className={classes.invisibleButton} onClick={moveCarousel(1)}></div>
    </Grid>
  )
}

export default CategoryCarousel;