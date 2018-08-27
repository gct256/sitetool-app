import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../app';
import { getRuntime } from '../bridge';
import { showFile } from '../utils';
import { Link } from './Link';
import { LogView } from './LogView';
import { QRCode } from './QRCode';
import { StatusButton } from './StatusButton';
import { StatusText } from './StatusText';

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
    this.handleShowConfig = this.handleShowConfig.bind(this);
    this.handleWatcher = this.handleWatcher.bind(this);
    this.handleServer = this.handleServer.bind(this);
  }

  public handleShowRoot() {
    showFile(
      getRuntime()
        .getConfig()
        .getRoot()
    );
  }

  public handleShowConfig() {
    const configFile = getRuntime()
      .getConfig()
      .getConfigFile();
    if (configFile !== null) showFile(configFile);
  }

  public handleWatcher() {
    if (this.props.watcher === 'idle') {
      getRuntime().startWatcher();
    } else if (this.props.watcher === 'running') {
      getRuntime().stopWatcher();
    }
  }

  public handleServer() {
    if (this.props.server === 'idle') {
      getRuntime().startServer();
    } else if (this.props.server === 'running') {
      getRuntime().stopServer();
    }
  }

  public render() {
    const { visible, root, configFile, watcher, server } = this.props;

    if (!visible) return null;

    return (
      <div className="section">
        <div className="content">
          <table>
            <tbody>
              <tr>
                <th className="is-unselectable">Root Directory</th>
                <td className="is-unselectable file-path">{root}</td>
                <td>
                  <button
                    className="button is-small is-fullwidth"
                    onClick={this.handleShowRoot}
                  >
                    Show
                  </button>
                </td>
              </tr>
              <tr>
                <th className="is-unselectable">Config file</th>
                <td className="is-unselectable file-path">
                  {configFile === null ? '(no config)' : configFile}
                </td>
                <td>
                  <button
                    className="button is-small is-fullwidth"
                    disabled={configFile === null}
                    onClick={this.handleShowConfig}
                  >
                    Show
                  </button>
                </td>
              </tr>
              <tr>
                <th className="is-unselectable">File watcher</th>
                <td className="is-unselectable">
                  <StatusText status={watcher} />
                </td>
                <td>
                  <StatusButton status={watcher} onClick={this.handleWatcher} />
                </td>
              </tr>
              <tr>
                <th className="is-unselectable">
                  <p>Local server</p>
                  <QRCode url={this.getUrl('external')} />
                </th>
                <td className="is-unselectable">
                  <StatusText status={server} />
                  <div className="buttons">
                    <Link url={this.getUrl('local')} />
                    <Link url={this.getUrl('external')} />
                  </div>
                </td>
                <td>
                  <StatusButton status={server} onClick={this.handleServer} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <LogView />
      </div>
    );
  }

  private getUrl(name: string): string | null {
    const { urls } = this.props;

    if (urls === null) return null;

    const url = urls.get(name);

    return url === undefined ? null : url;
  }
}

export const Running = connect(mapStateToProps)(RunningClass);
