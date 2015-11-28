var React = require('react')
var whatwgFetch = require('whatwg-fetch')
var reactRouter = require('react-router')
var History = reactRouter.History

var SentenceForm = React.createClass({
  mixins: [ History ],
  onClick(e) {
    var self = this;
    fetch('http://www.makky.io', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).then(function(response) {
      return response.json()
    }).then(function(response) {
      console.log(response)
    })
  },
  render() {
    return (
      <form onsubmit="return false;">
        <fieldset className="form-group">
          <div className='form-inline'>
            <fieldset className="col-sm-6">
              <label>From:</label>
              <input type="text" className="form-control" ref="from" placeholder="Enter from" />
            </fieldset>

            <fieldset className="col-sm-6">
              <label>To:</label>
              <input type="text" className="form-control" ref="from" placeholder="Enter to" />
            </fieldset>
          </div>
        </fieldset>

        <fieldset className="form-group">
          <div className="btn btn-primary btn-block" onClick={this.onClick}>Submit</div>
        </fieldset>
      </form>
    )
  }
})

module.exports = SentenceForm
