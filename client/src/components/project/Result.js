var React = require('react')

var Result = React.createClass({
  getInitialState: function() {
    return {
      result: []
    };
  },
  componentWillMount: function() {
    var self = this;
    fetch('http://jphacks.進捗.jp/api/v1/results/' + this.props.params.resultId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      return response.json();
    }).then(function(response) {
      if (response !== null) {
        console.log(response)
        self.setState({result: response})
      }
    })
  },
  render: function() {
    return (
      <div className='container'>
        <h1>Result</h1>
        <hr />
        <p>#{this.props.params.resultId}</p>

        {
          this.state.result.map(function(item, index) {
            return (
              <div className='col-xs-12 card' key={index}>
                <div className='card-clock' key={index}>
                  <p key={index}>{item.node_id}</p>
                  <p key={index+999}>{item.created_at}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
})

module.exports = Result
