import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../app';
import { Log } from '../app/logs';
import { LogViewItem } from './LogViewItem';

function mapStateToProps(state: AppState) {
  return {
    logs: state.logs
  };
}

type Props = ReturnType<typeof mapStateToProps>;

class LogViewClass extends React.Component<Props> {
  public render() {
    const { logs } = this.props;
    const reverseLogs = logs.slice(-200);
    reverseLogs.reverse();
    const children = reverseLogs.map((log: Log) => (
      <LogViewItem key={log.time} log={log} />
    ));

    return <div className="log-view">{children}</div>;
  }
}

export const LogView = connect(mapStateToProps)(LogViewClass);
