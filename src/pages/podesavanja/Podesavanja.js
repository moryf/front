import { Accordion, AccordionDetails, AccordionSummary, Typography, TextField, AccordionActions, Button, Select, FormControl, ToggleButtonGroup, FormControlLabel, Switch } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect } from 'react'
import { getAllPodrazumevaneVrednosti,updateKorisnik, updatePodrazumevanaVrednost } from '../../api/apiFunctions/ApiFunctions';
import PromeniSifruDialog from '../../components/promeniSifruDialog/PromeniSifruDialog';
import { registrujKorisnika } from '../../api/apiFunctions/ApiFunctions';

function Podesavanja() {

    const [korisnik, setKorisnik] = React.useState(JSON.parse(sessionStorage.getItem('korisnik')));


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

    async function azurirajPodrazumevaneVrednosti(){
        for(let i = 0; i < podrazumevaneVrednosti.length; i++){
            await updatePodrazumevanaVrednost(podrazumevaneVrednosti[i].oznaka, podrazumevaneVrednosti[i].vrednost);
        }
        confirm("Uspesno azurirane podrazumevane vrednosti");
    }

    const [noviKorisnik, setNoviKorisnik] = React.useState({
        id: null,
        ime: '',
        prezime: '',
        korisnickoIme: '',
        lozinka: '',
        uloge: []
    })


    useEffect(() => {
        fetchPodrazumevaneVrednosti();
    }, [])

    if(korisnik === null || podrazumevaneVrednosti === null){
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
                onChange={(e) => setKorisnik({...korisnik, ime: e.target.value})}
            />
            <TextField
                fullWidth
                label="Prezime"
                margin="normal"
                name="prezime"
                value={korisnik.prezime}
                onChange={(e) => setKorisnik({...korisnik, prezime: e.target.value})}
            />
            <TextField
                fullWidth
                label="Korisnicko Ime"
                margin="normal"
                name="korisnickoIme"
                value={korisnik.korisnickoIme}
                onChange={(e) => setKorisnik({...korisnik, korisnickoIme: e.target.value})}

            />
            <PromeniSifruDialog />
        </AccordionDetails>
        <AccordionActions>
            <Button size="small" onClick={azurirajkorisnikovePodatke}>Sacuvaj</Button>
        </AccordionActions>
    </Accordion>
    {(sessionStorage.getItem('trenutnaUloga') === 'Admin' || sessionStorage.getItem('trenutnaUloga')==='Komercijalista') ?
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
                        type='number'
                        name={vrednost.oznaka}
                        value={vrednost.vrednost}
                        onChange={(e) => {
                            let noveVrednosti = [...podrazumevaneVrednosti];
                            noveVrednosti[index].vrednost = e.target.value;
                            setPodrazumevaneVrednosti(noveVrednosti);
                        }}
                    />
                )
            }
            )}
        </AccordionDetails>
        <AccordionActions>
            <Button onClick={azurirajPodrazumevaneVrednosti} size="small">Sacuvaj</Button>
        </AccordionActions>
    </Accordion>   : null}
    {sessionStorage.getItem('trenutnaUloga') === 'Admin' ?
    <Accordion>
        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">Dodavanje Korisnika</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <TextField
                fullWidth
                label="Ime"
                margin="normal"
                name="ime"
                value={noviKorisnik.ime}
                onChange={(e) => setNoviKorisnik({...noviKorisnik, ime: e.target.value})}
            />
            <TextField
                fullWidth
                label="Prezime"
                margin="normal"
                name="prezime"
                value={noviKorisnik.prezime}
                onChange={(e) => setNoviKorisnik({...noviKorisnik, prezime: e.target.value})}
            />
            <TextField
                fullWidth
                label="Korisnicko Ime"
                margin="normal"
                name="korisnickoIme"
                value={noviKorisnik.korisnickoIme}
                onChange={(e) => setNoviKorisnik({...noviKorisnik, korisnickoIme: e.target.value})}
            />
            <TextField
                fullWidth
                label="Sifra"
                margin="normal"
                name="sifra"
                type="password"
                value={noviKorisnik.lozinka}
                onChange={(e) => setNoviKorisnik({...noviKorisnik, lozinka: e.target.value})}
            />
            <FormControl fullWidth>
                <FormControlLabel
                    control={<Switch
                        name="admin"
                        value={noviKorisnik.uloge.includes('Admin')}
                        onChange={(e) => {
                            let noveUloge = [...noviKorisnik.uloge];
                            if (e.target.checked) {
                                noveUloge.push('Admin');
                            } else {
                                noveUloge = noveUloge.filter((uloga) => uloga !== 'Admin');
                            }
                            setNoviKorisnik({...noviKorisnik, uloge: noveUloge});
                        }}
                    />}
                    label="Admin"
                />
                <FormControlLabel
                    control={<Switch
                        name="komercijalista"
                        value={noviKorisnik.uloge.includes('Komercijalista')}
                        onChange={(e) => {
                            let noveUloge = [...noviKorisnik.uloge];
                            if (e.target.checked) {
                                noveUloge.push('Komercijalista');
                            } else {
                                noveUloge = noveUloge.filter((uloga) => uloga !== 'Komercijalista');
                            }
                            setNoviKorisnik({...noviKorisnik, uloge: noveUloge});
                        }}
                    />}
                    label="Komercijalista"
                />
                <FormControlLabel
                    control={<Switch
                        name="projektant"
                        value={noviKorisnik.uloge.includes('Projektant')}
                        onChange={(e) => {
                            let noveUloge = [...noviKorisnik.uloge];
                            if (e.target.checked) {
                                noveUloge.push('Projektant');
                            } else {
                                noveUloge = noveUloge.filter((uloga) => uloga !== 'Projektant');
                            }
                            setNoviKorisnik({...noviKorisnik, uloge: noveUloge});
                        }}
                    />}
                    label="Projektant"
                />
            </FormControl>


        </AccordionDetails>
        <AccordionActions>
            <Button onClick={async ()=>{console.log(await registrujKorisnika(noviKorisnik))}} size="small">Dodaj</Button>
        </AccordionActions>

    </Accordion>
    : null

}
    </>
  )
}

export default Podesavanja