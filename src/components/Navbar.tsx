import * as React from 'react';

import { connect } from 'react-redux';
import { AppDispatch, AppState } from '../app';
import { Log } from '../app/logs';
import { ui } from '../app/ui';
import { getRuntime } from '../bridge';
import { NavbarButton } from './NavbarButton';

function mapStateToProps(state: AppState) {
  return {
    opened: state.ui.opened,
    close() {
      getRuntime().close();
    },
    async clean() {
      await getRuntime().clean();
      getRuntime().build();
    },
    distribute() {
      getRuntime().distribute();
    },
    errorCount: state.logs.filter((x: Log) => x.error !== false).length
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    showLog() {
      dispatch(ui.setLog(true));
    }
  };
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class NavbarClass extends React.Component<Props> {
  public render() {
    const {
      opened,
      close,
      clean,
      distribute,
      errorCount,
      showLog
    } = this.props;

    return (
      <div className="navbar is-success">
        <div className="navbar-brand">
          <div className="navbar-item">
            <h1 className="title has-text-white is-unselectable">sitetool</h1>
          </div>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <NavbarButton
                disabled={false}
                count={errorCount}
                icon="file-alt"
                onClick={showLog}
              >
                Log
              </NavbarButton>
            </div>
            <div className="navbar-item">
              <div className="buttons has-addons">
                <NavbarButton
                  disabled={!opened}
                  icon="archive"
                  onClick={distribute}
                >
                  Distribute
                </NavbarButton>
                <NavbarButton disabled={!opened} icon="broom" onClick={clean}>
                  Clean
                </NavbarButton>
              </div>
            </div>
            <div className="navbar-item">
              <NavbarButton
                disabled={!opened}
                icon="times"
                white={true}
                onClick={close}
              >
                Close
              </NavbarButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarClass);
