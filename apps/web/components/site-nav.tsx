import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export function SiteNav() {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
          <Typography
            component={Link}
            href="/"
            variant="overline"
            sx={{ color: 'text.primary', letterSpacing: '0.3em', textDecoration: 'none', fontWeight: 700 }}
          >
            Fractureline
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button component={Link} href="/play" color="inherit">Play</Button>
            <Button component={Link} href="/help" color="inherit">Help</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
