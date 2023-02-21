import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PropTypes from 'prop-types';

function Informations({ infoTrajets }) {
  return (
    <Box>
      <Accordion>
        <AccordionSummary sx={{ boxShadow: '9px 8px 13px -3px rgba(0,0,0,0.3)' }} expandIcon={<ArrowDropDownIcon />}>
          <Typography variant="h6">Informations Trajets</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <br />
            {infoTrajets[0].line1}
            <br />
            <br />
            {infoTrajets[0].line2}
            <br />
            <br />
            {infoTrajets[0].line3}
            <br />
            <br />
            {infoTrajets[0].line4}
            <br />
            <br />
            {infoTrajets[0].line5}
            <br />
            <br />
            {infoTrajets[0].line6}
            <br />
            <br />
            {infoTrajets[0].line7}
            <br />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary sx={{ boxShadow: '0px 5px 5px grey' }} expandIcon={<ArrowDropDownIcon />}>
          <Typography variant="h6">Qui sommes-nous</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: 'center' }} variant="h6">
            VTC STRASBOURG <br /> CHAUFFEUR PRIVÉ 7j/7 & 24h/24{' '}
          </Typography>
          <br />
          <br />
          <Typography>
            VTC Strasbourg met à votre disposition un chauffeur privé pour vos trajets dans Strasbourg et sa région.{' '}
            <br />
            <br />
            VTC Strasbourg est une entreprise de transport locale à taille humaine prête pour répondre à toutes vos
            demandes de transports de personnes.
            <br />
            <br />
            Nos véhicules haut de gamme vous permettent de voyager en toute tranquillité. Un service et une écoute plus
            adaptée qu'un service de taxi Strasbourg classique, votre trajet est un moment agréable, le tarif est fixe
            et sans surprise.
            <br />
            <br />
            Prestation haut de gamme avec un accueil attentionné et une ponctualité garantie. La satisfaction de nos
            clients est une priorité.
            <br />
            <br />
            Votre chauffeur privé Strasbourgeois est disponible pour vos déplacements.
            <br />
            <br />
            Les Véhicules de Tourisme avec Chauffeur ou appelé plus communément VTC, vous permettent d’être véhiculé ou
            vous souhaitez, grâce à un chauffeur privé. Nos prix sont définis avant de faire appel à nos services. Nous
            vous offrons un service de qualité à bord de nos véhicules privés.
            <br />
            <br />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary sx={{ boxShadow: '0px 5px 5px grey' }} expandIcon={<ArrowDropDownIcon />}>
          <Typography variant="h6">Vehicule</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ position: 'relative' }}>
            <Typography
              sx={{
                position: 'absolute',
                color: 'white',
                marginTop: '5%',
                fontSize: { xs: '0.6em', sm: '1em', md: '1.5em' },
                left: '10%',
              }}
            >
              Profitez d’un service...
            </Typography>
            <Typography
              sx={{
                position: 'absolute',
                color: 'white',
                marginTop: '6%',
                fontSize: { xs: '0.8em', sm: '1.2em', md: '1.7em' },
                left: '60%',
              }}
            >
              Haut de gamme
            </Typography>
            <Typography
              sx={{
                position: 'absolute',
                color: 'white',
                marginTop: '13%',
                fontSize: { xs: '0.6em', sm: '1em', md: '1.5em' },
                left: '20%',
              }}
            >
              avec de nombreux services à bord de notre...
            </Typography>
            <Typography
              sx={{
                position: 'absolute',
                color: 'white',
                marginTop: '20%',
                fontSize: { xs: '0.8em', sm: '1.2em', md: '1.7em' },
                left: '35%',
              }}
            >
              Mercedes Class C noir.
            </Typography>
          </Box>
          <Box
            component="img"
            sx={{
              maxWidth: '100%',
            }}
            alt="Voiture"
            src="https://vtc-strasbourg.fr/assets/images/voiture.jpg"
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

Informations.propTypes = {
  infoTrajets: PropTypes.any.isRequired,
};

export default Informations;
