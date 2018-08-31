import * as React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppDispatch, AppState } from '../app';
import { Log, logs } from '../app/logs';
import { ui } from '../app/ui';
import { LogViewItem } from './LogViewItem';

function mapStateToProps(state: AppState) {
  return {
    logArray: state.logs,
    log: state.ui.log,
    logAll: state.ui.logAll
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    hideLog() {
      dispatch(ui.setLog(false));
    },
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
    const { logArray, log, logAll, limit, hideLog, clearLog } = this.props;

    if (!log) return null;

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
        <div className="log-view-background" />
        <div className="box log-view is-paddingless is-radiusless">
          <div className="navbar is-small is-info">
            <div className="navbar-menu">
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    {this.renderLogModeButton()}
                    <button
                      className="button is-small is-outlined is-white"
                      onClick={clearLog}
                    >
                      <span className="icon">
                        <FontAwesomeIcon icon="ban" />
                      </span>
                      <span>Clear</span>
                    </button>
                  </div>
                </div>
                <div className="navbar-item">
                  <button className="delete" onClick={hideLog} />
                </div>
              </div>
            </div>
          </div>
          <div className="log-view-body">{children}</div>
        </div>
      </>
    );
  }

  private renderLogModeButton() {
    const { logAll, errorOnly, allLog } = this.props;

    return (
      <button
        className="button is-small is-outlined is-white"
        onClick={logAll ? errorOnly : allLog}
      >
        <span className="icon">
          <FontAwesomeIcon icon="filter" />
        </span>
        <span>{logAll ? 'show error only' : 'show all log'}</span>
      </button>
    );
  }
}

export const LogView = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogViewClass);
