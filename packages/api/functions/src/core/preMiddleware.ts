import updateUserLastUpdateValue from '../core/updateUserLastUpdateValue';

function preMiddleware(app) {
  // Update the "lastUpdate" for user to current time
  app.use(updateUserLastUpdateValue);
}

export default preMiddleware;