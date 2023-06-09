import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MaterialModal, { ModalProps } from '@mui/material/Modal';
import { FC, ReactElement } from 'react';

interface Props extends ModalProps {
  children: ReactElement;
  open: boolean;
  title: string;
  onClose: () => void;
}

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};

const Modal: FC<Props> = ({ children, open, title, ...restProps }) => {
  return (
    <MaterialModal open={open} {...restProps}>
      <Box sx={style}>
        <Typography id="modal-modal-title" align="center" variant="h6" component="h2">
          {title}
        </Typography>
        <Box id="modal-modal-container" sx={{ mt: 2 }}>
          {children}
        </Box>
      </Box>
    </MaterialModal>
  );
};

export default Modal;
