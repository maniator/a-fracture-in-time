import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SiteNav } from '@/components/site-nav';
import { PwaRegister } from '@/components/pwa-register';

const setupCards = [
  {
    title: 'Xav Reivax',
    eyebrow: 'Past · 874cy',
    body: 'A University of Brinkton student whose broken com and family notebook become the first bridge to a future he was never supposed to hear.',
  },
  {
    title: 'Yve Ettevy',
    eyebrow: 'Past · Brinkton',
    body: 'Xav’s sharp, skeptical classmate. She understands Cybol well enough to notice when its perfect history starts sounding rehearsed.',
  },
  {
    title: 'Zelda Adlez',
    eyebrow: 'Future · 23ac',
    body: 'A survivor in the ruins of old Brinkton who contacts Xav from after Cybol’s fall and discovers their family lines are connected.',
  },
  {
    title: 'Ayker',
    eyebrow: 'World',
    body: 'A small lush planet shaped by Cybol, Diderram, and the unanswered question of how a near-utopia became a dystopia.',
  },
];

export default function HomePage() {
  return (
    <Box component="main" sx={{ minHeight: '100vh', color: 'text.primary' }}>
      <PwaRegister />
      <SiteNav />
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ maxWidth: 940 }}>
          <Typography variant="overline" color="secondary" sx={{ letterSpacing: '0.35em' }}>
            Dual timeline narrative game
          </Typography>
          <Typography component="h1" variant="h1" sx={{ mt: 2, fontSize: { xs: '3rem', md: '5.5rem' }, lineHeight: 0.95 }}>
            A utopia in the past. A dystopia in the future. One signal between them.
          </Typography>
          <Typography sx={{ mt: 4, maxWidth: 760, color: 'text.secondary', fontSize: { xs: '1.125rem', md: '1.35rem' }, lineHeight: 1.7 }}>
            Play across two eras of Ayker. In 874cy, Xav Reivax and Yve Ettevy study inside Cybol’s polished world. In 23ac, Zelda Adlez searches the ruins of old Brinkton for the moment that turned that world into a warning.
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

        <Box component="section" aria-labelledby="before-you-start-title" sx={{ mt: 9 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
            <Chip label="Before you start" color="secondary" variant="outlined" />
            <Chip label="Chapter 1" variant="outlined" />
          </Stack>
          <Typography id="before-you-start-title" component="h2" variant="h3" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            You are entering Ayker.
          </Typography>
          <Typography sx={{ mt: 2, maxWidth: 840, color: 'text.secondary', fontSize: { xs: '1.05rem', md: '1.18rem' }, lineHeight: 1.8 }}>
            Cybol teaches that it brought peace to Ayker. Diderram’s history suggests something darker. Chapter 1 begins at the University of Brinkton, where an ordinary exam, a broken com, and an old family notebook open a conversation across time.
          </Typography>
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {setupCards.map((card) => (
              <Grid key={card.title} size={{ xs: 12, md: 6 }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="overline" color="secondary" sx={{ letterSpacing: '0.16em' }}>
                      {card.eyebrow}
                    </Typography>
                    <Typography component="h3" variant="h5" sx={{ mt: 1, fontWeight: 800 }}>
                      {card.title}
                    </Typography>
                    <Typography sx={{ mt: 1.5, color: 'text.secondary', lineHeight: 1.75 }}>
                      {card.body}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography sx={{ mt: 4, maxWidth: 820, color: 'text.secondary', lineHeight: 1.75 }}>
            Your choices are not simple good-or-bad answers. Some preserve stability. Some challenge official history. Some help Zelda remember a future that time is already trying to rewrite.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
