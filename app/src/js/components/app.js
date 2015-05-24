
var React = require("react");

var strings = [];

var StringList = React.createClass({

  deleteString: function(string) {
    strings.splice(strings.indexOf(string), 1);
    this.forceUpdate();
  },

  render: function() {
    var that = this;
    return (
      <ul className="StringList"> 
       {strings.map(function (string, i) {
          return (
            <li className="StringList-item" key={i}
            onClick={that.deleteString.bind(null, string)}>
            {strings.indexOf(string)+1}. {string.text}</li>
          )
        })} 
      </ul>
    )
  }
})

var EntryForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var newString = this.refs.newString.getDOMNode().value;

    if (isNaN(newString)) {

        this.refs.EntryForm.getDOMNode().reset();

        strings.push({
            "text": newString
        });

        this.setState({
            strings: strings
        })
    }
},

  render: function() {
    return (
      <div>
         <form ref="EntryForm" className="EntryForm" onSubmit={this.handleSubmit}>
            <h1 className="EntryForm-heading"> Add a string to the list of strings.</h1> 
            <input className="EntryForm-input" type="text" ref="newString" placeholder="Enter a string"/>
            <button className="EntryForm-button" type="submit">Add</button>
         </form> 
         <StringList strings={strings}></StringList> 
      </div>
    )
  }
})

React.render(<EntryForm strings={strings}></EntryForm>, document.body);