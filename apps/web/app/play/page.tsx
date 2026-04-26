import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { AmbienceControl } from '@/components/ambience-control';
import { SceneRenderer } from '@/components/scene-renderer';
import { SiteNav } from '@/components/site-nav';
import { PwaRegister } from '@/components/pwa-register';

export default function PlayPage() {
  return (
    <Box component="main" sx={{ minHeight: '100vh', color: 'text.primary' }}>
      <PwaRegister />
      <SiteNav />
      <Container maxWidth="lg" sx={{ py: 5, pb: { xs: 20, sm: 16 } }}>
        <SceneRenderer />
      </Container>
      <AmbienceControl />
    </Box>
  );
}
