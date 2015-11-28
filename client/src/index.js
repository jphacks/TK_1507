var React = require('react')
var ReactDOM = require('react-dom')
var reactRouter = require('react-router')
var Router = reactRouter.Router
var Route = reactRouter.Route
var Redirect = reactRouter.Redirect
var history = require('history')
var createHistory = history.createHistory
var useBasename = history.useBasename

// Page components
var Layout = require('./components/page/Layout.js')

// Project components
var Search = require('./components/project/Search.js')
var Browse = require('./components/project/Browse.js')
var Result = require('./components/project/Result.js')

function onUpdateHandler() {
  window.scrollTo(0, 0)
}

onUpdateHandler()

ReactDOM.render((
  <Router>
    <Route path="" component={Layout}>
      <Route path="/search" component={Search} />
      <Route path="/browse" component={Browse} />
      <Route path="/result/:resultId" component={Result} />
    </Route>
    <Redirect from="/" to="/search" />
  </Router>
), document.getElementById('react-root'))
