import * as React from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './carousel.styles';
import getIndexByDirection from '@utils/getIndexByDirection';
import FrontCategory from './FrontCategory';
import SideCategory from './SideCategory';

const useStyles = makeStyles(styles);

const CategoryCarousel = ({ categories = [] }) => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const numOfCategories = categories.length;
  const leftCategory = categories[getIndexByDirection({ currentIndex, length: numOfCategories, direction: -1, canWrap: true })];
  const rightCategory = categories[getIndexByDirection({ currentIndex, length: numOfCategories, direction: 1, canWrap: true })];
  const currentCategory = categories[currentIndex];

  const moveCarousel = (direction: 1 | -1) => () => {
    const nextIndex = getIndexByDirection({ currentIndex, length: numOfCategories, direction, canWrap: true });
    setCurrentIndex(nextIndex);
  }

  return (
    <Grid container direction="row" justify="space-between" className={classes.container}>
      <div className={clsx(classes.invisibleButton, classes.left)} onClick={moveCarousel(-1)}></div>
      <SideCategory category={leftCategory} />
      <FrontCategory category={currentCategory} />
      <SideCategory category={rightCategory} />
      <div className={clsx(classes.invisibleButton, classes.right)} onClick={moveCarousel(1)}></div>
    </Grid>
  )
}

export default CategoryCarousel;