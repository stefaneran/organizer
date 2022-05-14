# To run locally

- In 'webpack.config.js' change:
  publicPath: './'
  to
  publicPath: '/'

- Run "yarn"

=== Running client

- In first terminal
- cd packages/web
- yarn start

=== Running api

- In second terminal
- cd packages/api
- yarn serve

=== Running api watcher

- In third terminal
- cd packages/api
- yarn watch

- Accessible now on "localhost:3420"

# To test

Unit tests:

- yarn test

or to re-run with every file change

- yarn test:watch

# To deploy front-end to "https://stefaneran.github.io/organizer"

- Double check default app on load - Don't show works in progress

  - Go to src/core/defaultWebApp.ts
  - Choose default app to show that is not a work in progress

- Change baseUrl to remote

  - Go to src/core/baseUrl.ts
  - Change default export to 'baseUrlRemote' if not already

- In 'packages/web/webpack.config.js' change
  mode: from 'development' to "production
  publicPath: from '/' to './'

- cd packages/web

- Run "yarn build"

- Run "yarn deploy"

# To deploy firebase functions (back-end)

- cd packages/api/functions

- Run "yarn deploy" or "firebase deploy"

# To add an alias path

- Add it to webpack like this

resolve: {
alias: {
"@alias_name": path.resolve(\_\_dirname, './src/alias_name')
}
}

- Add it to tsconfig

"paths": {
"@the*alias/*": ["src/the_alias/_"],
}

- Finally, add it to package.json so Jest can resolve it during unit tests

"jest": {
"moduleNameMapper": {
"^@the_alias(.\*)$": "<rootDir>/src/the_alias$1"
}
}

# Untracking files in the .gitignore

Note: Commit all changes first!

Change .gitignore

git rm -r --cached .;
git add .;
git commit -m "Untracked files issue resolved to fix .gitignore";
