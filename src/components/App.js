import React from 'react';
import Contact from './Contact';

export default class App extends React.Component {
  render() {
    return (
      <Contact/>
    );
  }
}

// in before es6
// module.export = App;
// in es6
// export default App;
// now use 'export default class App ~~'
