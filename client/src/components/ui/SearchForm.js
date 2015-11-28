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
          <label>Text:</label>
          <input type="text" className="form-control" ref="text" placeholder="Enter Text" />
        </fieldset>
        <div className="btn btn-primary" onClick={this.onClick}>Submit</div>
      </form>
    )
  }
})

module.exports = SentenceForm
