import React, { FC } from 'react';
import MaterialButton, { ButtonProps } from '@mui/material/Button';
import Loader from '../Loader/Loader';
import * as styles from './Button.styles';

type ButtonColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

type ButtonVariant = 'contained' | 'outlined' | 'text';

type ButtonSize = 'small' | 'medium' | 'large';

interface Props extends ButtonProps {
  color?: ButtonColor;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button: FC<Props> = ({
  fullWidth,
  color,
  loading,
  onClick,
  children,
  disabled,
  variant,
  size = 'large',
  ...restProps
}) => {
  const loaderSize = size === 'large' ? '26.25px' : size === 'medium' ? '24.5px' : '22.75px';

  return (
    <MaterialButton
      color={color || 'primary'}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      onClick={onClick}
      variant={variant || 'contained'}
      size={size || 'large'}
      {...restProps}
    >
      {loading ? (
        <div css={styles.loaderWrapper}>
          <Loader size={loaderSize} />
        </div>
      ) : (
        children
      )}
    </MaterialButton>
  );
};

export default Button;
