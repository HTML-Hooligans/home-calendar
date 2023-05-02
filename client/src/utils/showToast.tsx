import React from 'react';
import { toast, TypeOptions } from 'react-toastify';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

const getIcon = (type: TypeOptions | undefined) => {
  let Icon;
  let color;
  switch (type) {
    case 'error':
      Icon = ErrorIcon;
      color = 'error';
      break;
    case 'warning':
      Icon = WarningIcon;
      color = 'warning';
      break;
    case 'success':
      Icon = CheckCircleIcon;
      color = 'success';
      break;
    default:
      Icon = InfoIcon;
      color = 'info';
      break;
  }

  return <Icon color={color as any} width={32} height={32} />;
};

export const showToast = (type: TypeOptions | undefined, message: string) => {
  toast(message, { type, icon: () => getIcon(type) });
};
