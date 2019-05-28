# SCB UI Coding Project

# Introduction

React Table Component

## Development

```
npm install
npm start
```

## Example

Under example folder, run

```
npm install
npm start
```

## Usage

```js
import MyTable from 'MyTable';
import 'MyTable/dist/style/index.css';

const rows = [
  {
    username: 'User 1',
    roles: 'Admin 1, User, Reporter',
    firstName: 'Apple',
    lastName: 'Z',
    accountName: 'Account 1',
    age: 25,
  },
  {
    username: 'User 2',
    roles: 'Admin 2, User, Reporter',
    firstName: 'Banana',
    lastName: 'D',
    accountName: 'Account 2',
    age: 28,
  },
];

const columns = [
  { key: 'username', title: 'Username' },
  { key: 'roles', title: 'Roles' },
  { key: 'firstName', title: 'First Name' },
  { key: 'lastName', title: 'Last Name' },
  { key: 'accountName', title: ' Account Name' },
  { key: 'age', title: ' Age' },
];

React.render(<MyTable rows={rows} colums={columns} />, mountNode);
```

## License

Copying, sharing or publishing is not allowed.
