import * as React from 'react';
import { GenericDialog } from '@components/GenericDialog';
import getIndexByDirection from '@utils/getIndexByDirection';

const WizardDialog = ({ isOpen, Component, data }) => {
  const [index, setIndex] = React.useState(0);
  const { max } = data;

  const handleAction = (direction: number) => () => {
    const newIndex = getIndexByDirection(index, data.max, direction);
    setIndex(newIndex);
  }

  const actionData = { index, max, handleClick: handleAction }

  return (
    <GenericDialog isOpen={isOpen} type="wizard" actionData={{index, max: data.max, actionData}} >
      <Component data={data} />
    </GenericDialog>
  );
}

export default WizardDialog;