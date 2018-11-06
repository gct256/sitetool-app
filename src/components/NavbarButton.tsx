import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

type Props = {
  disabled: boolean;
  white?: boolean;
  count?: number;
  icon?: IconProp;
  children?: React.ReactNode;

  onClick(): void;
};

function renderIcon(icon?: IconProp) {
  if (icon === undefined) return null;

  return (
    <span className="icon">
      <FontAwesomeIcon icon={icon} />
    </span>
  );
}

export const NavbarButton: React.SFC<Props> = ({
  disabled,
  white,
  count,
  icon,
  children,
  onClick
}: Props) => {
  const className = `button is-small is-white ${white ? '' : 'is-outlined'} ${
    count !== undefined && count > 0 ? 'badge is-badge-danger' : ''
  }`;
  const attr: { [key: string]: string | number } = {};
  if (count !== undefined) attr['data-badge'] = count;

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...attr}
    >
      {renderIcon(icon)}
      <span>{children}</span>
    </button>
  );
};
