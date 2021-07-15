# To run locally


- In 'webpack.config.js' change:
  publicPath: './' 
  to 
  publicPath: '/'

- Run "yarn"

- Run "yarn build"

- Accessible now on "localhost:3420"

# To test

Unit tests:

- yarn test

# To deploy to "https://stefaneran.github.io/organizer"

- Change version: Where #.#.# are [Major Iteration].[Major feature].[Minor changes commit]
  - Go to src/app/store/reducer.ts
  - Change "version" property in initialState

- Double check default app on load - Don't show works in progress
  - Go to src/core/defaultWebApp.ts
  - Choose default app to show that is not a work in progress

- Change baseUrl to remote
  - Go to src/core/baseUrl.ts
  - Change default export to 'baseUrlRemote' if not already

- In 'webpack.config.js' change 
  publicPath: '/' 
  to 
  publicPath: './'

- Run "yarn build"

- Run "yarn deploy"

# To add an alias path

- Add it to webpack like this

resolve: {
  alias: {
    "@alias_name": path.resolve(__dirname, './src/alias_name')
  }
}

- Add it to tsconfig

"paths": {
	"@the_alias/*": ["src/the_alias/*"],
}

- Finally, add it to package.json so Jest can resolve it during unit tests

"jest": {
  "moduleNameMapper": {
    "^@the_alias(.*)$": "<rootDir>/src/the_alias$1"
  }
}

# Untracking files in the .gitignore

Note: Commit all changes first!

git rm -r --cached .;
git add .;
git commit -m "Untracked files issue resolved to fix .gitignore";