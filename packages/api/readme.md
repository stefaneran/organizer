### Initial setup ###

npm install -g firebase-tools

cd packages/api

yarn

firebase init functions

# Answer "n" when asked to overwrite tsconfig and package.json 

### To run (in watch mode) ###

On two separate consoles:

yarn serve

yarn watch


### To deploy ###

yarn deploy