import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '1em',
    width: '5em',
    border: '1px solid rgba(0, 0, 0, 0.30)',
    boxShadow: '0px 0px 0px 0px #3f51b5',
    transition: 'box-shadow 200ms, border 200ms',
    cursor: 'default'
  },
  progress: {
    height: '100%',
    background: '#B4F8C8',
  },
  rounded: {
    borderBottomLeftRadius: '1em',
    borderTopLeftRadius: '1em',
    borderBottomRightRadius: '1em',
    borderTopRightRadius: '1em'
  },
  highlighted: {
    '&:hover': {
      boxShadow: '0px 0px 8px 2px #3f51b5',
      border: '1px solid #3f51b5',
      cursor: 'pointer'
    }
  }
}));

const positiveColor = '#B4F8C8';
const negativeColor = '#F51720';

interface Props {
  percentage: number;
  tooltipText: string;
  isClickable: boolean;
  isNegative: boolean;
  onClick?: (event) => void;
  width?: string;
  marginBottom?: string;
}

const ProgressBar: React.FC<Props> = ({
  percentage,
  tooltipText,
  isClickable,
  isNegative,
  onClick,
  width,
  marginBottom
}) => {
  const classes = useStyles();

  const progressWidth = `${percentage === -1 ? '0' : percentage}%`;
  const background = isNegative ? negativeColor : positiveColor;

  return (
    <Tooltip title={tooltipText}>
      <div
        className={clsx(classes.container, classes.rounded, isClickable ? classes.highlighted : '')}
        style={{
          width: width ? width : '5em',
          marginBottom: marginBottom ? marginBottom : '0'
        }}
        onClick={onClick}
      >
        <div
          className={clsx(classes.progress, classes.rounded)}
          style={{
            width: progressWidth,
            background
          }}
        />
      </div>
    </Tooltip>
  )
}

export default ProgressBar;