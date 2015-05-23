/** @jsx React.DOM */


var React = require("react");
var strings = [{
    "text": "My First String"
}, {
    "text": "My Second String"
}];


var StringList = React.createClass({

            deleteString: function(string) {
                this.prop.strings.splice(this.props.strings.indexOf(string), 1);
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


 var EntryForm = React.createClass({

             handleSubmit: function(e) {
                 e.preventDefault();

                 var newString = this.refs.newString.getDOMNode().value;

                 console.log(newString);
                 
                 strings.push({
                     "text": newString
                 });
                 
                 this.setState({
                     strings: strings
                 })
                 

             },
             render: function() {
                     return (

                <div>
                   <form className="EntryForm" onSubmit={this.handleSubmit}>
                      <h1> Add a string to the list of strings.</h1> 
                      <input type="text" ref="newString" placeholder="Enter a string"/>
                      <button type="submit">Add String</button>
                   </form> 
                   <StringList strings={strings}></StringList> 
                </div>
         )
     }
 })

  React.render(<EntryForm strings={strings}></EntryForm>, document.body);
