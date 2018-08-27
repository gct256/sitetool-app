import * as React from 'react';

type Props = {
  disabled: boolean;
  white?: boolean;
  children?: React.ReactNode;

  onClick(): void;
};

export const NavbarButton: React.SFC<Props> = ({
  disabled,
  white,
  children,
  onClick
}: Props) => (
  <button
    className={`button is-small is-white ${white ? '' : 'is-outlined'}`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
