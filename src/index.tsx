import * as React from 'react';

interface IProps {
  rows: { [key: string]: string | number }[];
  columns: { key: string; title: string }[];
}

interface IState {
  sortKey: string;
  sortState: number;
  showRow: object[];
}
class MyTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      sortKey: '',
      sortState: 0,
      showRow: this.props.rows,
    };
  }

  private handleSort = (sortKey: string) => {
    if (this.state.sortState === 2 && this.state.sortKey === sortKey)
      this.setState({ sortKey: '', sortState: 0, showRow: this.props.rows });
    else {
      const nextSortState =
        this.state.sortKey !== sortKey ? 1 : this.state.sortState + 1;
      let nextShowRow: object[] = [];
      this.state.showRow.forEach(row => nextShowRow.push(row));
      nextShowRow.sort((rowA, rowB) => {
        if (nextSortState === 1)
          return typeof rowA[sortKey] === 'number'
            ? rowA[sortKey] - rowB[sortKey]
            : rowA[sortKey].localeCompare(rowB[sortKey]);
        else
          return typeof rowA[sortKey] === 'number'
            ? rowB[sortKey] - rowA[sortKey]
            : rowB[sortKey].localeCompare(rowA[sortKey]);
      });
      this.setState({
        sortKey: sortKey,
        sortState: nextSortState,
        showRow: nextShowRow,
      });
    }
  };

  render() {
    const { columns } = this.props;
    const { showRow, sortKey, sortState } = this.state;
    const sortArrow = sortState === 0 ? '<>' : sortState === 1 ? '<' : '>';
    return (
      <div className="myTable">
        <table>
          <thead className="myTable-thead">
            <tr className="myTable-tr">
              {columns.map(col => (
                <th
                  className={
                    'myTable-th ' + (sortKey === col.key ? 'sorted-col' : '')
                  }
                  key={col.key}
                  onClick={() => this.handleSort(col.key)}
                >
                  <div className="myTable-th-div">
                    {col.title}
                    <span className="sort-arrow">
                      {sortKey === col.key ? sortArrow : '<>'}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="myTable-tbody">
            {showRow.map((row, i) => (
              <tr className="myTable-tr" key={i}>
                {columns.map(col => (
                  <td className="myTable-td" key={col.key}>
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MyTable;
