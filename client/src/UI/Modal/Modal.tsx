import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MaterialModal from '@mui/material/Modal';
import { ModalProps } from '@mui/material/Modal';
import { FC } from 'react';

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

const Modal: FC<ModalProps> = ({ children, open, title }) => {
  return (
    <MaterialModal open={open}>
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
