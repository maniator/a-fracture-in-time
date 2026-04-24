import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { SceneRenderer } from '@/components/scene-renderer';
import { SiteNav } from '@/components/site-nav';
import { PwaRegister } from '@/components/pwa-register';

export default function PlayPage() {
  return (
    <Box component="main" sx={{ minHeight: '100vh', color: 'text.primary' }}>
      <PwaRegister />
      <SiteNav />
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <SceneRenderer />
      </Container>
    </Box>
  );
}
