import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Table } from '../.';
import '../style/index.css';

const App = () => {
  return (
    <div>
      <Table />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
