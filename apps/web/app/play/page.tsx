import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
        <Card component="section" aria-labelledby="briefing-title" sx={{ mb: 4, border: '1px solid rgba(255,255,255,0.14)' }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
              <Chip label="Before you start" color="secondary" variant="outlined" />
              <Chip label="Chapter 1" variant="outlined" />
            </Stack>
            <Typography id="briefing-title" component="h1" variant="h3" sx={{ fontSize: { xs: '2rem', md: '3.25rem' } }}>
              You are entering Lattice.
            </Typography>
            <Typography sx={{ mt: 3, color: 'text.secondary', fontSize: { xs: '1.05rem', md: '1.2rem' }, lineHeight: 1.8 }}>
              Lattice is a future city that calls itself peaceful. Hunger is gone. War is gone. Most fear is gone. But the city keeps that peace by correcting memories, rewriting records, and quietly removing choices that might destabilize the future.
            </Typography>
            <Divider sx={{ my: 4 }} />
            <Stack spacing={3}>
              <CharacterBrief initials="MV" name="Mira Vale" role="The Protector" tone="Order, duty, and the cost of safety" description="Mira is an officer of Lattice's memory order. She preserves civic stability, escorts public corrections, and believes the city is worth protecting even when its methods begin to disturb her." />
              <CharacterBrief initials="SQ" name="Soren Quill" role="The Dissenter" tone="Freedom, doubt, and the danger of rewriting history" description="Soren is a covert time-traveler from the hidden edge of the future. He exposes buried truth, disrupts memory control, and risks breaking the timeline to stop Lattice from becoming permanent." />
              <Box>
                <Typography component="h2" variant="h6" sx={{ fontWeight: 700 }}>How to read your choices</Typography>
                <Typography sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.7 }}>
                  Choices are not just good or bad. Some protect stability. Some reveal hidden memories. Some increase magical pressure on the timeline. The stats below each scene show what kind of future your choices are building.
                </Typography>
              </Box>
            </Stack>
            <Button sx={{ mt: 4 }} color="secondary" variant="contained" size="large" href="#first-scene">
              Jump to the first scene
            </Button>
          </CardContent>
        </Card>
        <Box id="first-scene">
          <SceneRenderer />
        </Box>
      </Container>
      <AmbienceControl />
    </Box>
  );
}

function CharacterBrief({ initials, name, role, tone, description }: { initials: string; name: string; role: string; tone: string; description: string }) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ alignItems: { sm: 'center' } }}>
      <Box aria-hidden="true" sx={{ width: 78, height: 78, borderRadius: '50%', display: 'grid', placeItems: 'center', flexShrink: 0, background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.28), rgba(126,87,194,0.36) 42%, rgba(8,7,11,0.95) 78%)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 18px 48px rgba(0,0,0,0.35)' }}>
        <Typography sx={{ fontWeight: 800, letterSpacing: '0.08em' }}>{initials}</Typography>
      </Box>
      <Box>
        <Typography component="h2" variant="h6" sx={{ fontWeight: 800 }}>{name}</Typography>
        <Typography sx={{ mt: 0.25, color: 'secondary.main', fontWeight: 700 }}>{role}</Typography>
        <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary', fontStyle: 'italic' }}>{tone}</Typography>
        <Typography sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.7 }}>{description}</Typography>
      </Box>
    </Stack>
  );
}
