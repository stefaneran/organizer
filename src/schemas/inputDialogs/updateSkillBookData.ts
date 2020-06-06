export default ({ pagesRead, pagesTotal }) => ({
  data: {
    pages: {
      name: 'pages', 
      type: 'slider', 
      min: pagesRead,
      max: pagesTotal,
      step: 1,
      defaultValue: 0,
      label: 'Which page are you on?', 
    }
  }
})