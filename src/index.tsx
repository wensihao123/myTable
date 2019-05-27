import * as React from 'react';

import PropTypes from 'prop-types';

const Table = () => (
  <div className="myTable">
    <div>TODO: replace your implementation here</div>
    <div>Feel free to break your component into small piece if necessary</div>
  </div>
);

Table.propTypes = {
  /**
   * Table rows data.
   */
  rows: PropTypes.array.isRequired,

  /**
   * Table columns data.
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * id of column, need to be used in row
       */
      key: PropTypes.string.isRequired,

      /**
       * Title of column
       */
      title: PropTypes.string.isRequired
    })
  )
};

Table.defaultProps = {
  rows: [],
  columns: {}
};

export default Table;
