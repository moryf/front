import { Accordion, AccordionDetails, AccordionSummary, Typography, TextField, AccordionActions, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect } from 'react'
import { getAllPodrazumevaneVrednosti,updateKorisnik } from '../../api/apiFunctions/ApiFunctions';

function Podesavanja() {
    const korisnikStorage = JSON.parse(sessionStorage.getItem('korisnik'));

    const [korisnik, setKorisnik] = React.useState(korisnikStorage);

    const [podrazumevaneVrednosti, setPodrazumevaneVrednosti] = React.useState(null);

    async function fetchPodrazumevaneVrednosti(){
        const podrazumevaneVrednosti = await getAllPodrazumevaneVrednosti();
        setPodrazumevaneVrednosti(podrazumevaneVrednosti);
    }

    async function azurirajkorisnikovePodatke(){
        const ime = document.getElementsByName('ime')[0].value;
        const prezime = document.getElementsByName('prezime')[0].value;
        const korisnickoIme = document.getElementsByName('korisnickoIme')[0].value;
        await updateKorisnik(ime,prezime,korisnickoIme);
        let korisnik = JSON.parse(sessionStorage.getItem('korisnik'));
        korisnik.ime = ime;
        korisnik.prezime = prezime;
        korisnik.korisnickoIme = korisnickoIme;
        sessionStorage.setItem('korisnik', JSON.stringify(korisnik));
    }

    useEffect(() => {
        fetchPodrazumevaneVrednosti();
    }, [])

    if(korisnikStorage === null || podrazumevaneVrednosti === null){
        return <>Loading...</>
    }

  return (
    <>
    <Accordion sx={{margin:2}} >
        <AccordionSummary  expandIcon={<ExpandMoreIcon />}  >
            <Typography variant="h5">Detalji o korisniku</Typography>
        </AccordionSummary  >
        <AccordionDetails>
            <TextField
                fullWidth
                label="Ime"
                margin="normal"
                name="ime"
                value={korisnik.ime}
                
            />
            <TextField
                fullWidth
                label="Prezime"
                margin="normal"
                name="prezime"
                value={korisnik.prezime}
            />
            <TextField
                fullWidth
                label="Korisnicko Ime"
                margin="normal"
                name="korisnickoIme"
                value={korisnik.korisnickoIme}

            />
        </AccordionDetails>
        <AccordionActions>
            <Button size="small" onClick={azurirajkorisnikovePodatke}>Sacuvaj</Button>
        </AccordionActions>
    </Accordion>
    <Accordion sx={{margin:2}}>
        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">Podesavanje podrazumevanih vrednosti</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {podrazumevaneVrednosti.map((vrednost, index) => {
                return (
                    <TextField
                        key={index}
                        fullWidth
                        label={vrednost.oznaka}
                        margin="normal"
                        name={vrednost.oznaka}
                        value={vrednost.vrednost}
                    />
                )
            }
            )}
        </AccordionDetails>
        <AccordionActions>
            <Button size="small">Sacuvaj</Button>
        </AccordionActions>
    </Accordion>   
    </>
  )
}

export default Podesavanja