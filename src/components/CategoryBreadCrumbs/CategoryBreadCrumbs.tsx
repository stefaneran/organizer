import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Grid, Typography } from '@material-ui/core';

const { Fragment } = React;

const mapBreadCrumbLabel = (name) => {
  const map = {
    'main': 'Categories'
  }
  return map[name] || name;
}

const buildBreadCrumbURL = (breadCrumbItems, maxIndex) => {
  let newUrl = '/';
  breadCrumbItems.forEach((breadCrumb, index) => {
    if(index <= maxIndex) {
      newUrl += `${breadCrumb}${index < maxIndex ? '/' : ''}`
    }
  });
  return newUrl;
}

const getBreadCrumbs = (url) => {
  // Get all URL parts
  const breadCrumbItems = url.split('/');
  // Remove the first one which is an empty string
  breadCrumbItems.shift();
  // Create bread crumb objects with label and link
  const breadCrumbs = breadCrumbItems.map((breadCrumb, index) => ({ 
    label: mapBreadCrumbLabel(breadCrumb), 
    link: buildBreadCrumbURL(breadCrumbItems, index)
  }));
  return breadCrumbs;
}

const CategoryBreadCrumbs = ({ history }) => {

  // console.log('DEV Route History: ', history)

  const { match } = history;
  const { url, params } = match;

  const breadCrumbs = getBreadCrumbs(url);

  const isLastBreadCrumb = (index) => index !== breadCrumbs.length - 1;

  // TODO - Add AppBar
  return (
    <Grid container>
      {breadCrumbs.map((breadCrumb, index) => (
        <Fragment key={breadCrumb.label}>
          {isLastBreadCrumb(index) ? (
            <>
              <Link key={breadCrumb.label} to={isLastBreadCrumb(index) ? breadCrumb.link : undefined}>
                <Typography variant="subtitle2">{breadCrumb.label}</Typography>
              </Link>
              <Typography variant="subtitle2">{'\u00A0/\u00A0'}</Typography>
            </>
          ) : breadCrumb.label}
        </Fragment>
      ))}
    </Grid>
  )
}
export default CategoryBreadCrumbs;