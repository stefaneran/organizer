import * as React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { mapTypeToComponent } from '@components/CategoryThumbnails';
import { ICategory } from '@interfaces/categories';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%'
  },
  containerInner: {
    height: '100%',
    padding: '1em',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  thumbnail: {
    height: '50%',
  }
}));

interface ICategoryListProps {
  categories: ICategory[];
  onThumbClick(type, data): () => void;
}

const CategoryList = ({ categories = [], onThumbClick }: ICategoryListProps) => {
  const classes = useStyles();
  console.log(categories);

  return (
    <Paper className={classes.container}>
      <Grid 
        data-selector="category-list" 
        className={classes.containerInner} 
        container spacing={2} justify="space-between"
      >
        {categories.length && 
          categories.map((category, index) => (
            <Grid key={`${category.title}-${index}`} className={classes.thumbnail} item xs={4}>
              <Link to={`/main/${category.title}`} onClick={onThumbClick(category.categoryType, category)}>
                {mapTypeToComponent(category)}
              </Link>
            </Grid>
          )
        )}
      </Grid>
    </Paper>
  )
}

export default CategoryList;