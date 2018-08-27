import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../app';

function mapStateToProps(state: AppState) {
  return {
    visible: state.ui.message !== null,
    message: state.ui.message !== null ? state.ui.message : ''
  };
}

type Props = ReturnType<typeof mapStateToProps>;

class MessageClass extends React.Component<Props> {
  public render() {
    const { visible, message } = this.props;

    if (!visible) return null;

    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-content message-modal">
          <div className="message-animation">
            <span className="button is-static is-loading" />
          </div>
          <div className="message-message">{message}</div>
        </div>
      </div>
    );
  }
}

export const Message = connect(mapStateToProps)(MessageClass);
