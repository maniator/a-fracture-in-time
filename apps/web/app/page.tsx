import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SiteNav } from '@/components/site-nav';
import { PwaRegister } from '@/components/pwa-register';

export default function HomePage() {
  return (
    <Box component="main" sx={{ minHeight: '100vh', color: 'text.primary' }}>
      <PwaRegister />
      <SiteNav />
      <Container maxWidth="lg" sx={{ minHeight: 'calc(100vh - 88px)', display: 'flex', alignItems: 'center', py: 10 }}>
        <Box sx={{ maxWidth: 900 }}>
          <Typography variant="overline" color="secondary" sx={{ letterSpacing: '0.35em' }}>
            Dual timeline narrative game
          </Typography>
          <Typography component="h1" variant="h1" sx={{ mt: 2, fontSize: { xs: '3rem', md: '5.5rem' }, lineHeight: 0.95 }}>
            Two choices. Two futures. One fractureline.
          </Typography>
          <Typography sx={{ mt: 4, maxWidth: 720, color: 'text.secondary', fontSize: { xs: '1.125rem', md: '1.35rem' }, lineHeight: 1.7 }}>
            Alternate between the Protector and the Dissenter as each choice reshapes the other timeline. Preserve the beautiful lie, uncover the hidden truth, or find a third path forward.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 6 }}>
            <Button component={Link} href="/play" prefetch={false} color="secondary" variant="contained" size="large">
              Start Chapter 1
            </Button>
            <Button component={Link} href="/help" color="inherit" variant="outlined" size="large">
              How it works
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
