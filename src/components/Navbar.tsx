import { remote } from 'electron';
import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../app';
import { Log } from '../app/logs';
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

type Props = ReturnType<typeof mapStateToProps>;

class NavbarClass extends React.Component<Props> {
  public componentWillMount() {
    this.updateBadge();
  }

  public componentDidUpdate() {
    this.updateBadge();
  }

  public render() {
    const { opened, close, clean, distribute } = this.props;

    if (!opened) {
      return (
        <div className="navbar is-success">
          <div className="navbar-item">
            <h1 className="title has-text-white is-size-4">sitetool.app</h1>
          </div>
        </div>
      );
    }

    return (
      <div className="navbar is-success">
        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <NavbarButton
                disabled={false}
                icon="chevron-left"
                onClick={close}
              >
                Back
              </NavbarButton>
            </div>
          </div>
          <div className="navbar-end">
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
          </div>
        </div>
      </div>
    );
  }

  private updateBadge() {
    const { errorCount } = this.props;
    if (errorCount > 0) {
      remote.app.setBadgeCount(errorCount);
    } else {
      remote.app.setBadgeCount(0);
    }
  }
}

export const Navbar = connect(mapStateToProps)(NavbarClass);
