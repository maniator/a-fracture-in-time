import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SiteNav } from '@/components/site-nav';
import { PwaRegister } from '@/components/pwa-register';

const sections = [
  {
    title: 'Who you are',
    body: 'You move between Xav Reivax in 874cy, a University of Brinkton student inside Cybol’s polished society, and Zelda Adlez in 23ac, a survivor searching the ruins of old Brinkton after Cybol’s fall.',
  },
  {
    title: 'What Ayker is',
    body: 'Ayker is a small lush planet shaped by Cybol, Diderram, and the mystery of how an apparent utopia became Zelda’s dystopian future.',
  },
  {
    title: 'How choices work',
    body: 'Choices shift both eras. Xav’s decisions in the past can change what Zelda remembers, what ruins exist, and which version of history is trying to become permanent.',
  },
  {
    title: 'Local saves',
    body: 'Use Save progress and Load progress on the play page. Saves are stored locally on your device, so you can resume without making an account.',
  },
  {
    title: 'Ambience',
    body: 'The ambience control in the bottom corner is optional. Use the mute button or volume slider if you want the background sound quieter or off.',
  },
  {
    title: 'Reading the stats',
    body: 'Stability, Control, Rebellion, Memory, and Entropy are not scores. They show what kind of timeline your choices are shaping.',
  },
];

export default function HelpPage() {
  return (
    <Box component="main" sx={{ minHeight: '100vh', color: 'text.primary' }}>
      <PwaRegister />
      <SiteNav />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="overline" color="secondary" sx={{ letterSpacing: '0.35em' }}>
          Player Guide
        </Typography>
        <Typography component="h1" variant="h2" sx={{ mt: 2, fontSize: { xs: '2.75rem', md: '4.5rem' } }}>
          How to play Fractureline
        </Typography>
        <Typography sx={{ mt: 3, maxWidth: 820, color: 'text.secondary', fontSize: { xs: '1.05rem', md: '1.2rem' }, lineHeight: 1.8 }}>
          Fractureline is a dual-era narrative game about history, family, and the cost of saving a future that may not want to stay saved. Read each scene, choose what the character does next, and watch the timeline bend around those choices.
        </Typography>
        <Grid container spacing={3} sx={{ mt: 5 }}>
          {sections.map((section) => (
            <Grid key={section.title} size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography component="h2" variant="h5" sx={{ fontWeight: 700 }}>
                    {section.title}
                  </Typography>
                  <Typography sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.8 }}>
                    {section.body}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Stack spacing={1.25} sx={{ mt: 5, color: 'text.secondary' }}>
          <Typography variant="body2">Tip: read the homepage briefing first if the world feels unfamiliar.</Typography>
          <Typography variant="body2">Tip: there is no single correct route. Chapter 1 is about deciding how much official history you are willing to disturb.</Typography>
        </Stack>
      </Container>
    </Box>
  );
}
