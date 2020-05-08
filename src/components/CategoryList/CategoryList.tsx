import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { mapTypeToComponent, EmptyThumbnail } from '@components/CategoryThumbnails';
import { ICategory } from '@interfaces/categories';

const useStyles = makeStyles(theme => ({
  container: {
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  thumbnail: {
    cursor: 'pointer'
  }
}));

interface ICategoryListProps {
  categories: ICategory[];
  onThumbClick(type?, data?): () => void;
}

const CategoryList = ({ categories = [], onThumbClick }: ICategoryListProps) => {
  const classes = useStyles();

  return (
    <Grid 
      data-selector="category-list" 
      className={classes.container} 
      container spacing={2}
    >
      {categories.length ? (
        <>
          {categories.map((category, index) => (
            <Grid 
              key={`${category.title}-${index}`} 
              className={classes.thumbnail} 
              item xs={4} lg={3}
              onClick={onThumbClick(category.categoryType, category)}
            >
              {mapTypeToComponent(category)}
            </Grid>
          ))}
          {categories.length < 3 && (
            <Grid 
              className={classes.thumbnail} 
              item xs={4} lg={3}
              onClick={onThumbClick()}
            >
              <EmptyThumbnail />
            </Grid>
          )}
        </>
      ) : (
        <Grid 
          className={classes.thumbnail} 
          item xs={4} lg={3}
          onClick={onThumbClick()}
        >
          <EmptyThumbnail />
        </Grid>
      )}
    </Grid>
  )
}

export default CategoryList;