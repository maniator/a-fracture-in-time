import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SiteNav } from '@/components/site-nav';
import { PwaRegister } from '@/components/pwa-register';

const sections = [
  {
    title: 'How choices work',
    body: 'Every choice can adjust timeline variables, set story flags, unlock codex notes, and move the active scene forward.',
  },
  {
    title: 'The two viewpoints',
    body: 'Protector scenes lean toward order and preservation. Dissenter scenes lean toward memory, disruption, and uncovering hidden causes.',
  },
  {
    title: 'Offline play',
    body: 'The app is structured as an installable PWA. After the first visit, the shell and offline page can be cached by the service worker.',
  },
  {
    title: 'Testing strategy',
    body: 'Unit tests cover the narrative engine. Playwright e2e tests cover the home page, help page, play flow, PWA manifest, and screenshot captures.',
  },
];

export default function HelpPage() {
  return (
    <Box component="main" sx={{ minHeight: '100vh', color: 'text.primary' }}>
      <PwaRegister />
      <SiteNav />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="overline" color="secondary" sx={{ letterSpacing: '0.35em' }}>
          Help
        </Typography>
        <Typography component="h1" variant="h2" sx={{ mt: 2, fontSize: { xs: '2.75rem', md: '4.5rem' } }}>
          Playing Fractureline
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
      </Container>
    </Box>
  );
}
