import * as React from 'react';

import { sendToClipboard, showUrl } from '../utils';

type Props = {
  label: string;
  url: string | null | undefined;
};

export class URLField extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  public handleOpen() {
    showUrl(this.props.url);
  }

  public handleCopy() {
    sendToClipboard(this.props.url);
  }

  public render() {
    const { label, url } = this.props;
    const hasUrl = url !== null && url !== undefined;

    return (
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">{label}</label>
        </div>
        <div className="field-body">
          <div className="field is-expanded">
            <div className="field has-addons">
              <p className="control">
                <button
                  className="button is-small"
                  onClick={this.handleOpen}
                  disabled={!hasUrl}
                >
                  <span className="icon">
                    <i className="fas fa-globe" />
                  </span>
                </button>
              </p>
              <p className="control">
                <button
                  className="button is-small"
                  onClick={this.handleCopy}
                  disabled={!hasUrl}
                >
                  <span className="icon">
                    <i className="fas fa-clipboard" />
                  </span>
                </button>
              </p>
              <p className="control is-expanded">
                <input
                  type="text"
                  className="input is-small"
                  readOnly={true}
                  disabled={!hasUrl}
                  value={hasUrl ? `${url}` : ''}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
