import * as React from 'react';
import getIndexByDirection from '@utils/getIndexByDirection';

interface IProps {
  maxSteps: number;
  callback?: any;
}

export default ({ maxSteps, callback }: IProps) => {
  const [index, setIndex] = React.useState(0);

  const handleAction = (direction: -1 | 1) => () => {
    const newIndex = getIndexByDirection(index, maxSteps, direction);
    setIndex(newIndex);
    if(callback) {
      callback();
    }
  }

  return { index, setIndex, handler: handleAction }
}