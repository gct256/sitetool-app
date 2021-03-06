import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../app';
import { getRuntime } from '../bridge';
import { openSelectConfig, openSelectDir } from '../utils';
import { RecentFileList } from './RecentFileList';

function mapStateToProps(state: AppState) {
  return {
    visible: !state.ui.opened
  };
}

type Props = ReturnType<typeof mapStateToProps>;

class EmptyClass extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleSelectDirectory = this.handleSelectDirectory.bind(this);
    this.handleSelectConfigFile = this.handleSelectConfigFile.bind(this);
  }

  public async handleSelectDirectory() {
    const filePath: string | null = await openSelectDir();
    if (filePath !== null) {
      await getRuntime().openDirectory(filePath);
    }
  }

  public async handleSelectConfigFile() {
    const filePath: string | null = await openSelectConfig();
    if (filePath !== null) {
      await getRuntime().openConfigFile(filePath);
    }
  }

  public render() {
    const { visible } = this.props;

    if (!visible) return null;

    return (
      <>
        <div className="section">
          <div className="notification">
            <p className="is-unselectable">
              Select or drag-drop directory or config file (sitetool.config.js)
            </p>
          </div>
          <div className="buttons is-centered">
            <button
              className="button is-link"
              type="button"
              onClick={this.handleSelectDirectory}
            >
              <span className="icon">
                <FontAwesomeIcon icon="folder" />
              </span>
              <span>Select directory</span>
            </button>
            <button
              className="button is-link"
              type="button"
              onClick={this.handleSelectConfigFile}
            >
              <span className="icon">
                <FontAwesomeIcon icon="file" />
              </span>
              <span>Select config file</span>
            </button>
          </div>
        </div>
        <div className="section">
          <RecentFileList />
        </div>
      </>
    );
  }
}

export const Empty = connect(mapStateToProps)(EmptyClass);
