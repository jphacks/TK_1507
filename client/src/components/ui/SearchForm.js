var React = require('react')
var whatwgFetch = require('whatwg-fetch')
var reactRouter = require('react-router')
var History = reactRouter.History

var SentenceForm = React.createClass({
  mixins: [ History ],
  onClick: function(e) {
    var self = this;

    console.log('From', this.refs.from.value)
    console.log('To', this.refs.to.value)

    // fetch('http://jphacks.進捗.jp:8080/api/v1/search', {
    fetch('http://jphacks.進捗.jp/api/v1/results', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        result: {
          from: this.refs.from.value,
          to: this.refs.to.value
        }
      })
    }).then(function(response) {
      return response.json()
    }).then(function(response) {
      self.history.pushState(undefined, "/result/" + response.id, undefined);
    })
  },
  render: function() {
    return (
      <form className="search-form" onsubmit="return false;">
        <p>気になる単語を入力してください</p>
        <fieldset className="form-group">
          <div className="row">
            <div className="col-sm-6">
              <label>はじめ:</label>
              <input type="text" className="form-control" ref="from" placeholder="はじめの単語" />
            </div>

            <div className="col-sm-6">
              <label>おわり:</label>
              <input type="text" className="form-control" ref="to" placeholder="おわりの単語" />
            </div>
          </div>
        </fieldset>

        <fieldset className="form-group text-xs-center">
          <div className="btn btn-primary" onClick={this.onClick}>探索開始!</div>
        </fieldset>
      </form>
    )
  }
})

module.exports = SentenceForm
