import * as React from 'react';
import { GenericDialog } from '@components/Dialogs/GenericDialog';
import { FormCreator } from '@components/FormCreator';
import { getDefaultFormData, getSimpleFormData } from '@utils/formDataUtils';
import { SkillItemType } from '@interfaces/skill/SkillItem.interface';
import createSkillBook from '@data/inputDialogs/createSkillBookData';
import createSkillCourse from '@data/inputDialogs/createSkillCourseData';

const { useState } = React;

interface ICreateSkillItemProps {
  isOpen: boolean;
  onClose: any;
  itemType: SkillItemType;
}

const skillItemFormModelMap = (itemType: SkillItemType) => {
  const map = {
    [SkillItemType.Book]: createSkillBook,
    [SkillItemType.Course]: createSkillCourse
  }
  return map[itemType];
}

const CreateSkillItemDialog = ({ isOpen, onClose, itemType }: ICreateSkillItemProps) => {

  const formModel = skillItemFormModelMap(itemType);

  const [formData, setFormData] = useState(getDefaultFormData(formModel));
  const [lastInputField, setLastInputField] = useState('');

  const handleChange = (inputName, inputValue) => {
    setFormData({ ...formData, [inputName]: inputValue });
    setLastInputField(inputName);
  }

  const handleClose = (options?) => () => {
    let isSubmit = options ? options.isSubmit : false;
    onClose({ isSubmit, formData });
  }

  return (
    <GenericDialog
      isOpen={isOpen} 
      title={"Choose Item Type"}
      onClose={handleClose}
      actionsType={'simpleForm'}
    >
      <FormCreator 
        formData={getSimpleFormData(formModel, formData)}
        formGrid={formModel.formGrid || null}
        lastInputField={lastInputField}
        onChange={handleChange}
      />
    </GenericDialog>
  );
}

export default CreateSkillItemDialog;