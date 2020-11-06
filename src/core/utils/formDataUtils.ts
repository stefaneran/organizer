export const mapDefaultFieldValueByType = (type) => {
  const map = {
    text: '',
    number: 0,
    checkbox: false,
    select: '',
    slider: 0,
    textMultiSelect: []
  };
  return map[type];
}

// Populate state hook object with fieldName/value key pairs
export const getDefaultFormData = (form) => {
  const defaultFormData: any = {};
  for(const fieldName in form.data) {
    const { type, defaultValue } = form.data[fieldName];
    defaultFormData[fieldName] = defaultValue ? defaultValue : mapDefaultFieldValueByType(type);
  }
  return defaultFormData;
}

//// ----- Wizard-Specific -----

// Get form data for specific wizard steps
export const getStepFormData = (wizardFormModel, index, formData) => 
  wizardFormModel.steps[index].fields.map(fieldName => ({ 
    ...wizardFormModel.data[fieldName], 
    inputValue: formData[fieldName]
  }));

//// ----- Regular Input Dialogs -----

export const getSimpleFormData = (formModel, formData) => {
  const form = [];
  for(const field in formModel.data) {
    form.push({
      ...formModel.data[field],
      inputValue: formData[field]
    });
  }
  return form;
}