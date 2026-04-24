'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { fracturelineTheme } from '@/lib/theme';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={fracturelineTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
