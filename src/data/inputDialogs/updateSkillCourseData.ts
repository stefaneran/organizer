export default ({ classesDone, classesTotal }) => ({
  data: {
    classes: {
      name: 'classes', 
      type: 'slider', 
      min: classesDone,
      max: classesTotal,
      step: 1,
      defaultValue: 0,
      label: 'Current Class', 
    }
  }
})