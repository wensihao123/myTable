import * as React from 'react';

interface IProps {
  rows: { [key: string]: string | number }[];
  columns: { key: string; title: string }[];
}

interface IState {
  sortKey: string;
  sortStatus: 'ASC' | 'DESC' | 'DEFAULT';
  showRow: IProps['rows'];
}
class MyTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      sortKey: '',
      sortStatus: 'DEFAULT',
      showRow: this.props.rows,
    };
  }

  getNextStatus = () => {
    switch (this.state.sortStatus) {
      case 'ASC':
        return 'DESC';
      case 'DESC':
        return 'DEFAULT';
      default:
        return 'ASC';
    }
  };

  private handleSort = (sortKey: string) => {
    if (this.state.sortStatus === 'DESC' && this.state.sortKey === sortKey) {
      this.setState({
        sortKey: '',
        sortStatus: this.getNextStatus(),
        showRow: this.props.rows,
      });
    } else {
      const nextSortState =
        this.state.sortKey !== sortKey ? 'ASC' : this.getNextStatus();
      const nextShowRow = Array.from(this.state.showRow);
      nextShowRow.sort((rowA, rowB) => {
        const [a, b] =
          nextSortState === 'ASC'
            ? [rowA[sortKey], rowB[sortKey]]
            : [rowB[sortKey], rowA[sortKey]];

        return typeof a === 'number'
          ? a - (b as number)
          : a.localeCompare(b as string);
      });
      this.setState({
        sortKey: sortKey,
        sortStatus: nextSortState,
        showRow: nextShowRow,
      });
    }
  };

  render() {
    const { columns } = this.props;
    const { showRow, sortKey, sortStatus } = this.state;
    const sortArrow =
      sortStatus === 'DEFAULT' ? '<>' : sortStatus === 'ASC' ? '<' : '>';
    return (
      <div className="myTable">
        <table>
          <thead className="myTable-thead">
            <tr className="myTable-tr">
              {columns.map(col => (
                <th
                  className={
                    'myTable-th' + (sortKey === col.key ? ' sorted-col' : '')
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
