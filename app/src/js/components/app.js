/** @jsx React.DOM */


var React = require("react");
var strings = [{
    "text": "My First String"
}, {
    "text": "My Second String"
}];


var StringList = React.createClass({

  deleteString: function (string) {
    this.props.strings.splice(this.props.strings.indexOf(string), 1);
    this.setState();
  },
    
    render: function() {
      var that = this;
        return ( 
            <ul> 
               {this.props.strings.map(function (string, i) {
                  return (
                      <li key={i} onClick={that.deleteString.bind(null, string)}> {strings.indexOf(string)+1}. {string.text}</li>
                    )
                })} 
               </ul>
               )
            }
        })


 var InputForm = React.createClass({
             handleSubmit: function(e) {
                 e.preventDefault();
                 var text = React.findDOMNode(this.refs.text).value;
                 var trimText = text.trim();
                 strings.push({"text": trimText});
                 text = '';
                 this.setState({strings:strings})
             },
     render: function() {
         return ( 
          <div>
             <form className="inputForm" onSubmit={this.handleSubmit}>
                <h1> Add a string to the list of strings.</h1> 
                <input type="text" ref="text" placeholder="Enter a string"/>
                <input type="submit" value="Add String"/>
             </form> 
             <StringList strings={strings}></StringList> 
          </div>
         )
     }
 })

  React.render(<InputForm></InputForm>, document.body);
