var React = require('react')

// Component
var SearchForm = require('../ui/SearchForm.js')

var Search = React.createClass({
  render() {
    return (
      <div className='container'>
        <h1>Search</h1>

        <div className='row'>
          <div className='container'>
            <div className='col-sm-8 col-sm-offset-2'>
              <div className='card'>
                <div className='card-block'>
                  <SearchForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Search
