import './style.css';

export type ButtonProps = {
  type: 'submit' | 'button';
  btnType: 'delete' | 'done' | 'submit' | 'update';
  disabled?: boolean;
  isActive?: boolean;
  clickHandler?: (e: React.UIEvent) => Promise<void> | void;
  children?: React.ReactNode;
};

const btnClassMap = {
  delete: 'btn-delete',
  done: 'btn-done',
  submit: 'btn-submit',
  update: 'btn-update',
};

export function Button({
  type,
  btnType,
  isActive,
  disabled,
  clickHandler,
  children,
}: ButtonProps) {
  const activeStyle = `${
    btnType === 'done' && isActive
      ? 'done'
      : btnType === 'submit' && isActive
      ? 'active'
      : ''
  }`;

  const disabledStyle = `${disabled ? 'dimmed' : ''}`;

  const btnStyle = `btn ${btnClassMap[btnType]} ${activeStyle} ${disabledStyle}`;

  return (
    <button
      type={type}
      className={btnStyle}
      onClick={clickHandler}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
