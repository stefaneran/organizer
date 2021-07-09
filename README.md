# To deploy to "https://stefaneran.github.io/organizer"

- Change version: Where #.#.# are [Major Iteration].[Major feature].[Minor changes commit]
  - Go to src/app/store/reducer.ts
  - Change "version" property in initialState

- Change baseUrl to remote
  - Go to src/store/baseUrl.ts
  - Change default export to 'baseUrlRemote' if not already

- In 'webpack.config.js' change 
  publicPath: '/' to publicPath: './'

- Run "yarn build"

- Run "yarn deploy"