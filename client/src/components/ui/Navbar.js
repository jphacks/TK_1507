var React = require('react')
var reactRouter = require('react-router')
var Link = reactRouter.Link

var Navbar = React.createClass({
  render() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <div className="container">
          <Link className="navbar-brand" to="/search" >
            TK_07-client
          </Link>
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/search" activeClassName="active">Search</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/browse" activeClassName="active">Browse</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
})

module.exports = Navbar
