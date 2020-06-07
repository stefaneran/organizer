# To deploy to "https://stefaneran.github.io/organizer"

- Change version: Where #.#.# are [Major Iteration].[Major feature].[Minor changes commit]
  - Go to store/reducer
  - Change "version" property in initialState
- In 'webpack.config.js' change 
  publicPath: '/' to publicPath: './'
- Run "yarn build"
- Run "yarn deploy"

