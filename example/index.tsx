import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MyTable from '../.';
import '../style/index.css';

const App = () => {
  return (
    <div>
      <MyTable />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
