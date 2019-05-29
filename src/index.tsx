import * as React from 'react';
//import { testRows1 } from '../example/testTable';
interface IProps {
  rows: { [key: string]: string | number }[];
  columns: { key: string; title: string }[];
}

interface IState {
  sortKey: string;
  sortStatus: 'ASC' | 'DESC' | 'DEFAULT';
  showRow: IProps['rows'];
  rowsGroup: IProps['rows'][];
  currentPage: number;
  inputString: string;
  inputValue: number;
}
class MyTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      sortKey: '',
      sortStatus: 'DEFAULT',
      showRow: this.grouping(this.props.rows)[0],
      rowsGroup: this.grouping(this.props.rows),
      currentPage: 0,
      inputString: '1',
      inputValue: 1,
    };
  }

  private getNextStatus = () => {
    switch (this.state.sortStatus) {
      case 'ASC':
        return 'DESC';
      case 'DESC':
        return 'DEFAULT';
      default:
        return 'ASC';
    }
  };

  private grouping = (rows: IProps['rows']) => {
    let tempRows: IProps['rows'] = [];
    let tempRowsGroup: IProps['rows'][] = [];
    rows.forEach((row, i) => {
      if (i === rows.length - 1) {
        tempRows.push(row);
        tempRowsGroup.push(tempRows);
        tempRows = [];
      } else if (i % 10 !== 9) tempRows.push(row);
      else {
        tempRows.push(row);
        tempRowsGroup.push(tempRows);
        tempRows = [];
      }
    });
    return tempRowsGroup;
  };

  private handleSort = (sortKey: string) => {
    if (this.state.sortStatus === 'DESC' && this.state.sortKey === sortKey) {
      this.setState({
        sortKey: '',
        sortStatus: this.getNextStatus(),
        showRow: this.grouping(this.props.rows)[this.state.currentPage],
      });
    } else {
      const nextSortState =
        this.state.sortKey !== sortKey ? 'ASC' : this.getNextStatus();
      const nextShowRow = Array.from(this.props.rows);
      nextShowRow.sort((rowA, rowB) => {
        const [a, b] =
          nextSortState === 'ASC'
            ? [rowA[sortKey], rowB[sortKey]]
            : [rowB[sortKey], rowA[sortKey]];

        return typeof a === 'number'
          ? a - (b as number)
          : a.localeCompare(b as string);
      });
      const nextRowsGroup = this.grouping(nextShowRow);
      this.setState({
        sortKey: sortKey,
        sortStatus: nextSortState,
        rowsGroup: nextRowsGroup,
        showRow: nextRowsGroup[this.state.currentPage],
      });
    }
  };

  private handlePageInputChange = (value: string) => {
    const newText =
      parseInt(value, 0).toString() === 'NaN'
        ? ''
        : parseInt(value, 0).toString();
    this.setState({
      inputString: newText,
      inputValue: parseInt(value, 0) || 1,
    });
  };

  private inputPageChange = () => {
    const input = this.state.inputValue - 1;
    const nextPage =
      input > this.state.rowsGroup.length - 1
        ? this.state.rowsGroup.length - 1
        : input;
    this.setState({
      showRow: this.state.rowsGroup[nextPage],
      currentPage: nextPage,
      inputString: (nextPage + 1).toString(),
      inputValue: nextPage + 1,
    });
  };

  private buttonPageChange = (change: string) => {
    const nextPage = this.state.currentPage + (change === 'prev' ? -1 : 1);
    this.setState({
      showRow: this.state.rowsGroup[nextPage],
      currentPage: nextPage,
      inputString: (nextPage + 1).toString(),
      inputValue: nextPage + 1,
    });
  };

  render() {
    const { columns } = this.props;
    const {
      showRow,
      sortKey,
      sortStatus,
      inputString,
      currentPage,
      rowsGroup,
    } = this.state;
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
                    <a
                      href="#"
                      className={
                        'sort-by' +
                        (col.key === sortKey ? ' ' + sortStatus : '')
                      }
                    />
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
        <div className="myTable-bottom">
          <div className="myTable-pagination">
            <span
              className={currentPage === 0 ? 'pagebutton-disabled' : ''}
              onClick={() => this.buttonPageChange('prev')}
            >
              &#60;
            </span>
            <input
              value={inputString}
              id={'page-input'}
              onChange={e => this.handlePageInputChange(e.target.value)}
              onBlur={() =>
                this.setState({
                  inputString: (currentPage + 1).toString(),
                  inputValue: currentPage + 1,
                })
              }
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.inputPageChange();
                }
              }}
            />{' '}
            / {rowsGroup.length}
            <span
              className={
                currentPage === rowsGroup.length - 1
                  ? 'pagebutton-disabled'
                  : ''
              }
              onClick={() => this.buttonPageChange('next')}
            >
              &#62;
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default MyTable;
