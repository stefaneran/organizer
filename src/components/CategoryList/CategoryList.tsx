import * as React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './carousel.styles';
import { mapTypeToComponent } from '@components/CategoryThumbnails';
import { ICategory } from '@interfaces/categories';

const useStyles = makeStyles(styles);

interface ICategoryListProps {
  categories: ICategory[];
  onThumbClick(type, data): () => void;
}

const CategoryList = ({ categories = [], onThumbClick }: ICategoryListProps) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="space-between" spacing={2} className={classes.container}>
      {categories.length && 
        categories.map((category, index) => (
          <Grid key={`${category.title}-${index}`} item xs={2} style={{height: '50%'}}>
            <Link to={`/main/${category.title}`} onClick={onThumbClick(category.categoryType, category)}>
              {mapTypeToComponent(category)}
            </Link>
          </Grid>
        )
      )}
    </Grid>
  )
}

export default CategoryList;