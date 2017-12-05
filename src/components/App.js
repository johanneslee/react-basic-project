import React from 'react';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        name: ''
      };
  }

  render() {
    return (
      <div>
        <button onClick={() => {this.setState({ name: 'Veloport' }); }}>Click Me</button>
        <h1>Hello!!! {this.state.name}</h1>
      </div>
    );
  }
}

// in before es6
// module.export = App;
export default App;
