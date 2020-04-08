import * as React from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './carousel.styles';
import getIndexByDirection from '@utils/getIndexByDirection';
import mapTypeToComponent from './mapTypeToComponent';

const useStyles = makeStyles(styles);

const CategoryCarousel = ({ categories = [] }) => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const numOfCategories = categories.length;
  const categoryItems = {
    left: categories[getIndexByDirection({ currentIndex, length: numOfCategories, direction: -1, canWrap: true })],
    front: categories[currentIndex],
    right: categories[getIndexByDirection({ currentIndex, length: numOfCategories, direction: 1, canWrap: true })]
  }

  const moveCarousel = (direction: 1 | -1) => () => {
    const nextIndex = getIndexByDirection({ currentIndex, length: numOfCategories, direction, canWrap: true });
    setCurrentIndex(nextIndex);
  }

  return (
    <Grid container direction="row" justify="space-between" spacing={2} className={classes.container}>
      {categories.length ? (
        <>
          <div className={clsx(classes.invisibleButton, classes.left)} onClick={moveCarousel(-1)}></div>
          <Grid item xs={4} style={{height: '100%'}}>
            {mapTypeToComponent(categoryItems.left)}
          </Grid>
          <Grid item xs={4}>
            {mapTypeToComponent(categoryItems.front)}
          </Grid>
          <Grid item xs={4}>
            {mapTypeToComponent(categoryItems.right)}
          </Grid>
          <div className={clsx(classes.invisibleButton, classes.right)} onClick={moveCarousel(1)}></div>
        </>
      ) : null}
    </Grid>
  )
}

export default CategoryCarousel;