import * as React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppDispatch, AppState } from '../app';
import { Log, logs } from '../app/logs';
import { ui } from '../app/ui';
import { LogViewItem } from './LogViewItem';

function mapStateToProps(state: AppState) {
  return {
    opened: state.ui.opened,
    logArray: state.logs,
    logAll: state.ui.logAll
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    errorOnly() {
      dispatch(ui.setLogAll(false));
    },
    allLog() {
      dispatch(ui.setLogAll(true));
    },
    clearLog() {
      dispatch(logs.clear());
    }
  };
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    limit: number;
  };

class LogViewClass extends React.Component<Props> {
  public render() {
    const { opened, logArray, logAll, limit, clearLog } = this.props;

    if (!opened) return null;

    const reverseLogs = (logAll
      ? logArray
      : logArray.filter((x: Log) => x.error !== false)
    ).slice(-limit);
    reverseLogs.reverse();

    const children = reverseLogs.map((x: Log) => (
      <LogViewItem key={x.serial} log={x} />
    ));

    return (
      <>
        <div className="lower box is-radiusless">
          <div className="log-view">{children}</div>
          <div className="log-buttons buttons">
            {this.renderLogModeButton()}
            <button className="button is-light is-small" onClick={clearLog}>
              <span className="icon">
                <FontAwesomeIcon icon="ban" />
              </span>
              <span>Clear</span>
            </button>
          </div>
        </div>
      </>
    );
  }

  private renderLogModeButton() {
    const { logAll, errorOnly, allLog } = this.props;

    return (
      <button
        className={`button is-light is-small ${logAll ? '' : 'is-inverted'}`}
        onClick={logAll ? errorOnly : allLog}
      >
        <span className="icon">
          <FontAwesomeIcon icon="filter" />
        </span>
        <span>Error only</span>
      </button>
    );
  }
}

export const LogView = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogViewClass);
