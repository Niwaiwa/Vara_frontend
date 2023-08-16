
import React, { useState } from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../globalRedux/store';
import { setMessageSnackBarState, setMessageInfo, setSnackPack, setOpen } from '../globalRedux/features/snackbar/messageSnackBarSlice';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const MessageSnackBar: React.FC = () => {

    const dispatch = useDispatch();

    const snackPack = useSelector((state: RootState) => state.messageSnackBar.snackPack);
    const messageInfo = useSelector((state: RootState) => state.messageSnackBar.messageInfo);
    const open = useSelector((state: RootState) => state.messageSnackBar.open);

    const handleExited = () => {
        dispatch(setMessageInfo(undefined));
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        } else {
            dispatch(setOpen(false));
            handleExited();
        }
    };

    React.useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            dispatch(setMessageInfo({...snackPack[0]}));
            dispatch(setSnackPack(snackPack.slice(1)));
            dispatch(setOpen(true));
        } else if (snackPack.length && messageInfo && open) {
            // Close an active snack when a new one is added
            dispatch(setOpen(false));
        }
      }, [snackPack, messageInfo, open, dispatch]);

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
                open={open}
                TransitionProps={{ onExited: handleExited }}
                onClose={handleClose}
                message={messageInfo ? messageInfo.message : undefined}
                key={messageInfo ? messageInfo.key : undefined}
                action={
                    <React.Fragment>
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        sx={{ p: 0.5 }}
                        onClick={handleClose}
                      >
                        <CloseIcon />
                      </IconButton>
                    </React.Fragment>
                }
            />
        </>
    );
}

export default MessageSnackBar;