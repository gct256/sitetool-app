import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../app';
import { getRuntime } from '../bridge';
import { sendToClipboard, showFile } from '../utils';
import { ConfigFile } from './ConfigFile';
import { RootDirectory } from './RootDirectory';
import { StatusField } from './StatusField';
import { URLField } from './URLField';

function mapStateToProps(state: AppState) {
  return {
    visible: state.ui.opened,
    root: state.ui.root,
    configFile: state.ui.configFile,
    watcher: state.ui.watcher,
    server: state.ui.server,
    urls: state.ui.urls
  };
}

type Props = ReturnType<typeof mapStateToProps>;

class RunningClass extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleShowRoot = this.handleShowRoot.bind(this);
    this.handleCopyRoot = this.handleCopyRoot.bind(this);

    this.handleShowConfig = this.handleShowConfig.bind(this);
    this.handleCopyConfig = this.handleCopyConfig.bind(this);
    this.handleGenerateConfig = this.handleGenerateConfig.bind(this);

    this.handleWatcherPause = this.handleWatcherPause.bind(this);
    this.handleWatcherResume = this.handleWatcherResume.bind(this);
    this.handleWatcherRestart = this.handleWatcherRestart.bind(this);

    this.handleServerPause = this.handleServerPause.bind(this);
    this.handleServerResume = this.handleServerResume.bind(this);
    this.handleServerRestart = this.handleServerRestart.bind(this);
  }

  public handleShowRoot() {
    showFile(
      getRuntime()
        .getConfig()
        .getRoot()
    );
  }

  public handleCopyRoot() {
    sendToClipboard(
      getRuntime()
        .getConfig()
        .getRoot()
    );
  }

  public handleShowConfig() {
    showFile(
      getRuntime()
        .getConfig()
        .getConfigFile()
    );
  }

  public handleCopyConfig() {
    sendToClipboard(
      getRuntime()
        .getConfig()
        .getConfigFile()
    );
  }

  public handleGenerateConfig() {
    //
  }

  public handleWatcherPause() {
    getRuntime().stopWatcher();
  }

  public handleWatcherResume() {
    getRuntime().startWatcher();
  }

  public handleWatcherRestart() {
    //
  }

  public handleServerPause() {
    getRuntime().stopServer();
  }

  public handleServerResume() {
    getRuntime().startServer();
  }

  public handleServerRestart() {
    //
  }

  // tslint:disable-next-line:max-func-body-length
  public render() {
    const { visible, root, configFile, watcher, server, urls } = this.props;

    if (!visible) return null;

    return (
      <div className="section">
        <RootDirectory
          filePath={root}
          show={this.handleShowRoot}
          copy={this.handleCopyRoot}
        />
        <ConfigFile
          filePath={configFile}
          show={this.handleShowConfig}
          copy={this.handleCopyConfig}
          generate={this.handleGenerateConfig}
        />
        <StatusField
          label="File watcher"
          status={watcher}
          pause={this.handleWatcherPause}
          resume={this.handleWatcherResume}
          restart={this.handleWatcherRestart}
        />
        <StatusField
          label="Local server"
          status={server}
          pause={this.handleServerPause}
          resume={this.handleServerResume}
          restart={this.handleServerRestart}
        />
        <hr />
        <URLField label="URL (local)" url={urls !== null ? urls.local : null} />
        <URLField
          label="URL (local)"
          url={urls !== null ? urls.external : null}
        />
      </div>
    );
  }
}

export const Running = connect(mapStateToProps)(RunningClass);
