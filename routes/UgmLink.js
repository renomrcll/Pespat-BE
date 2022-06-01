const express = require('express');
const { renderLoginPage, renderRedirectPage, exchangeAuthToken, getUgmData } = require('../controllers/ugm-link');
const checkAuth = require('../middleware/check-auth');

const ugmLinkPageRouter = express.Router();
ugmLinkPageRouter.get('/login', renderLoginPage);
ugmLinkPageRouter.get('/handle-redirect', renderRedirectPage);

const ugmLinkApiRouter = express.Router();
ugmLinkApiRouter.post('/exchange-auth-token', exchangeAuthToken);
ugmLinkApiRouter.get('/users/:id/ugm-data', checkAuth, getUgmData);

module.exports = {
  ugmLinkPageRouter,
  ugmLinkApiRouter
}