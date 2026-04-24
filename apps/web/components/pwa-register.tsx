'use client';

import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Workbox } from 'workbox-window';

export function PwaRegister() {
  const [waitingWorker, setWaitingWorker] = useState<Workbox | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') return;

    const workbox = new Workbox('/sw.js');

    workbox.addEventListener('waiting', () => {
      setWaitingWorker(workbox);
    });

    workbox.addEventListener('controlling', () => {
      window.location.reload();
    });

    workbox.register().catch((error) => {
      console.warn('Service worker registration failed', error);
    });
  }, []);

  const activateUpdate = () => {
    waitingWorker?.messageSkipWaiting();
    setWaitingWorker(null);
  };

  return (
    <Snackbar open={waitingWorker !== null} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert
        severity="info"
        variant="filled"
        action={<Button color="inherit" size="small" onClick={activateUpdate}>Refresh</Button>}
      >
        A new Fractureline version is ready.
      </Alert>
    </Snackbar>
  );
}
