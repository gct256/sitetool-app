import * as React from 'react';

import { connect } from 'react-redux';
import { AppState } from '../app';
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
    }
  };
}

type Props = ReturnType<typeof mapStateToProps>;

class NavbarClass extends React.Component<Props> {
  public render() {
    const { opened, close, clean, distribute } = this.props;

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
              <div className="buttons">
                <NavbarButton disabled={!opened} onClick={distribute}>
                  Distribute
                </NavbarButton>
                <NavbarButton disabled={!opened} onClick={clean}>
                  Clean
                </NavbarButton>
                <NavbarButton disabled={!opened} onClick={close} white={true}>
                  Close
                </NavbarButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const Navbar = connect(mapStateToProps)(NavbarClass);
