import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MyTable from 'mytable';
import { testRows1, testColumns1 } from './testTable';
import 'mytable/style/index.css';

const App = () => {
	return (
		<div style={{ width: 960 }}>
			<MyTable rows={testRows1} columns={testColumns1} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
