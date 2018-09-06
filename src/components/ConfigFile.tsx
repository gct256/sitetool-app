import * as React from 'react';

type Props = {
  filePath: string | null;
  show(): void;
  copy(): void;
  generate(): void;
};

function renderGenerateButton(
  filePath: string | null,
  generate: () => void
): React.ReactNode {
  if (filePath !== null) return null;

  return (
    <p className="control">
      <button className="button is-rounded is-link is-small" onClick={generate}>
        <span className="icon">
          <i className="fas fa-magic" />
        </span>
        <span>Generate</span>
      </button>
    </p>
  );
}

export const ConfigFile: React.SFC<Props> = ({
  filePath,
  show,
  copy,
  generate
}: Props) => (
  <div className="field is-horizontal">
    <div className="field-label">
      <label className="label">Config file</label>
    </div>
    <div className="field-body">
      <div className="field is-expanded">
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input
              type="text"
              className="input is-static is-small"
              value={filePath || ''}
              readOnly={true}
            />
          </p>
          {renderGenerateButton(filePath, generate)}
          <div className="control">
            <div className="buttons has-addons running-buttons">
              <button className="button is-rounded is-small" onClick={show}>
                <span className="icon">
                  <i className="fas fa-folder-open" />
                </span>
                <span>Show</span>
              </button>
              <button className="button is-rounded is-small" onClick={copy}>
                <span className="icon">
                  <i className="fas fa-clipboard" />
                </span>
                <span>Copy</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
