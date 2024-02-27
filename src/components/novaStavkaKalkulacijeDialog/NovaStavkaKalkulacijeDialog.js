import { Button, Dialog, DialogContent, DialogTitle, TextField , Paper, Container, DialogActions, Select} from '@mui/material'
import React, { useEffect, useState } from 'react'
import PretragaProizvodaDialog from './pretragaProizvodaDialog/PretragaProizvodaDialog'
import { proizvodTemplate, stavkaKalkulacijeTemplate } from '../../api/josnTemplates/JSONTemplates'


export default function NovaStavkaKalkulacijeDialog({mode,izmenaStavka,addStavka,visinaProizvoda,duzinaProizvoda,dubinaProizvoda, koriscenjeCene,cinkovanje,farbanje,montaza,izrada}) {




    //Proizvod
    const[proizvod, setProizvod] = useState(proizvodTemplate);
    const [proizvodLoaded, setProizvodLoaded] = useState(false);
// Da li je merna jedinica proizvoda komadi true ako jeste, false ako je metarski proizvod
    const [jmKomada, setJmKomada] = useState(false);
// Nacin racunanja duzine komada
    const[nacinRacunanjaDuzineKomada, setNacinRacunanjaDuzineKomada] = useState("UPISANO");
// Nacin racunanja komada
    const[nacinRacunanjaKomada, setNacinRacunanjaKomada] = useState("KOMAD");
// Vrednosti za stavku kalkulacije
    const[referentnaDuzina, setReferentnaDuzina] = useState(0);
    const[razlikaDuzine, setRazlikaDuzine] = useState(0);
    const[duzinaKomada, setDuzinaKomada] = useState(0);
    const[razmak, setRazmak] = useState(0);
    const[multiplikator, setMultiplikator] = useState(1);
    const[rucniDodatak, setRucniDodatak] = useState(0);
    const[kolicinaKomada, setKolicinaKomada] = useState(0);
    const[kolicina, setKolicina] = useState(0);
    const[cena, setCena] = useState(0);

    const[sacuvano,setSacuvano] = useState(false);


    const[stavkaKalkulacije, setStavkaKalkulacije] = useState(izmenaStavka);

    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function setProizvodState(proizvod) {
        setProizvodLoaded(true);
        setProizvod(proizvod);
        setStavkaKalkulacije(prevState => ({
            ...prevState,
            proizvod: proizvod,
        }));
        if(koriscenjeCene === "VELEPRODAJNA_CENA"){
            setCena(proizvod.veleprodajnaCena);
        }else{
            setCena(proizvod.cenaA);
        }
        if (proizvod.jedinicaMere === "KOMAD") {
            setJmKomada(true);
        } else {
            setJmKomada(false);
        }
    }

    const handleNacinRacunanjaDuzineKomada = (e) => {
        setNacinRacunanjaDuzineKomada(e.target.value);
    }

    const handleNacinRacunanjaKomada = (e) => {
        setNacinRacunanjaKomada(e.target.value);
    }

    const preracunajDuzinuKomada = () => {
        if(nacinRacunanjaDuzineKomada === "UPISANO"){
            setReferentnaDuzina(0);
            setDuzinaKomada(duzinaKomada);
        }else if(nacinRacunanjaDuzineKomada === "DUZINA"){
            setReferentnaDuzina(duzinaProizvoda);
            setDuzinaKomada(duzinaProizvoda + razlikaDuzine);
        }else if(nacinRacunanjaDuzineKomada === "VISINA"){
            setReferentnaDuzina(visinaProizvoda);
            setDuzinaKomada(visinaProizvoda + razlikaDuzine);
        }else if(nacinRacunanjaDuzineKomada === "DUBINA"){
            setReferentnaDuzina(dubinaProizvoda);
            setDuzinaKomada(dubinaProizvoda + razlikaDuzine);
        }
    }

    const preracunajKolicinuKomada = () => {
        if(nacinRacunanjaKomada === "KOMAD"){
            setKolicinaKomada(kolicinaKomada);
        }else if(nacinRacunanjaKomada === "PO_DUZNOM_METRU"){
            setKolicinaKomada(Math.floor(duzinaProizvoda/razmak+ rucniDodatak)*multiplikator );
        }else if(nacinRacunanjaKomada === "PO_VISINSKOM_METRU"){
            setKolicinaKomada(Math.floor(visinaProizvoda/razmak+ rucniDodatak)*multiplikator );
        }else if(nacinRacunanjaKomada === "PO_DUBINSKOM_METRU"){
            setKolicinaKomada(Math.floor(dubinaProizvoda/razmak+ rucniDodatak)*multiplikator );
        }
    }

    const preracunajKolicinu = () => {
        if(jmKomada){
            setKolicina(kolicinaKomada);
        }else{
            setKolicina(kolicinaKomada*duzinaKomada);
        }
    }

    useEffect(() => {
        preracunajDuzinuKomada();
        preracunajKolicinuKomada();
        preracunajKolicinu();
        setSacuvano(false);
    }, [duzinaKomada, razlikaDuzine, razmak, multiplikator, rucniDodatak, kolicinaKomada, cena,nacinRacunanjaDuzineKomada,nacinRacunanjaKomada]);

    const sacuvajPromene = () => {
        setStavkaKalkulacijeState();
        setSacuvano(true);
        return;
    }

    const setStavkaKalkulacijeState = () => {
        setStavkaKalkulacije(prevState => ({
            ...prevState,
            duzinaKomada: duzinaKomada,
            razlikaDuzine: razlikaDuzine,
            razmak: razmak,
            multiplikator: multiplikator,
            rucniDodatak: rucniDodatak,
            kolicinaKomada: kolicinaKomada,
            kolicina: kolicina,
            cena: cena,
            cinkovanje: cinkovanje,
            farbanje: farbanje,
            montaza: montaza,
            izrada: izrada
        }));
    }

    const dodajStavku = () => {
        if(!sacuvano){
            sacuvajPromene();
            alert("Stavka je sacuvana")
            return;
        }
        addStavka(stavkaKalkulacije);
        handleClose();
    }

    if(mode==="IZMENA"){
        if(izmenaStavka == null){
            return null;
        }
        if(proizvodLoaded === false){
            return null;
        }
        if(proizvod === null){
            return null;
        }
    }
    

  return (
    <>
    <Button variant="contained" color="primary" onClick={handleClickOpen}>Nova stavka kalkulacije</Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nova Stavka Kalkulacije</DialogTitle>
        <DialogContent>
            <PretragaProizvodaDialog setProizvodState={setProizvodState} />
            {
                proizvodLoaded ?
                <Container>
                {sacuvano ? <h5 style={{color:"green"}}>Sacuvano</h5> : <h5 style={{color:"red"}}>Nije sacuvano</h5>}
                <TextField
                    sx={{ margin: 1}}
                    label="Sifra"
                    margin="normal"
                    name="sifra"
                    type="text"
                    value={proizvod.sifra}
                    disabled
                    fullWidth
                />
                <TextField
                    sx={{ margin: 1}}
                    label="Naziv"
                    margin="normal"
                    name="naziv"
                    type="text"
                    value={proizvod.naziv}
                    disabled
                    fullWidth
                />
                <TextField
                    sx={{ margin: 1}}
                    label="Jedinica mere"
                    margin="normal"
                    name="jedinicaMere"
                    type="text"
                    value={proizvod.jedinicaMere}
                    disabled
                    fullWidth
                />
                {!jmKomada ?
                <Container>
                    <Select
                        native
                        sx={{ margin: 1}}
                        name='nacinRacunanjaDuzineKomada'
                        value={nacinRacunanjaDuzineKomada}
                        onChange={
                            handleNacinRacunanjaDuzineKomada
                        }>
                        <option value={"UPISANO"}>Upisati</option>
                        <option value={"DUZINA"}>Duzina + razlika</option>
                        <option value={"VISINA"}>Visina + razlika</option>
                        <option value={"DUBINA"}>Dubina + razlika</option>
                    </Select>
                    {nacinRacunanjaDuzineKomada !== "UPISANO" ?
                        <>
                        <TextField
                            sx={{ margin: 1}}
                            label="Referentna duzina"
                            margin="normal"
                            name="referentnaDuzina"
                            type="number"
                            value={referentnaDuzina}
                            fullWidth
                            disabled
                        />
                        <TextField
                            sx={{ margin: 1}}
                            label="Razlika duzine"
                            margin="normal"
                            name="razlikaDuzine"
                            type="number"
                            value={razlikaDuzine}
                            onChange={(e) => setRazlikaDuzine(parseFloat(e.target.value))}
                            fullWidth
                        />
                        <TextField
                            sx={{ margin: 1}}
                            label="Duzina komada"
                            margin="normal"
                            name="duzinaKomada"
                            type="number"
                            value={duzinaKomada}
                            disabled
                            fullWidth
                        />
                    </>: 
                    <TextField
                        sx={{ margin: 1}}
                        label="Duzina komada"
                        margin="normal"
                        name="duzinaKomada"
                        type="number"
                        value={duzinaKomada}
                        onChange={(e) => setDuzinaKomada(parseFloat(e.target.value))}
                        fullWidth/>
                    }
                    
                </Container>
                : null
                }



                <Container>
                    <Select
                        sx={{ margin: 1}}
                        native
                        name='nacinRacunanjaKomada'
                        value={nacinRacunanjaKomada}
                        onChange={handleNacinRacunanjaKomada}>
                        <option value={"KOMAD"}>Komad</option>
                        <option value={"PO_DUZNOM_METRU"}>Po duzini na svakih</option>
                        <option value={"PO_VISINSKOM_METRU"}>Po visini na svakih</option>
                        <option value={"PO_DUBINSKOM_METRU"}>Po dubini na svakih</option>
                    </Select>
                    {nacinRacunanjaKomada!=="KOMAD"?<>
                        <TextField
                            sx={{ margin: 1}}
                            label="Razmak"
                            margin="normal"
                            name="razmak"
                            type="number"
                            value={razmak}
                            onChange={(e) => setRazmak(parseFloat(e.target.value))}
                            fullWidth
                        />
                    <TextField
                        sx={{ margin: 1}}
                        label="Multiplikator"
                        margin="normal"
                        name="multiplikator"
                        type="number"
                        value={multiplikator}
                        onChange={(e) => setMultiplikator(parseFloat(e.target.value))}
                        fullWidth
                    />
                    <TextField
                        sx={{ margin: 1}}
                        label="Rucni dodatak"
                        margin="normal"
                        name="rucniDodatak"
                        type="number"
                        value={rucniDodatak}
                        onChange={(e) => setRucniDodatak(parseFloat(e.target.value))}
                        fullWidth
                    />
                    </>: null
                    
                    }
                    

                    <TextField
                        sx={{ margin: 1}}
                        label="Kolicina komada"
                        margin="normal"
                        name="kolicinaKomada"
                        type="number"
                        value={kolicinaKomada}
                        onChange={(e) => setKolicinaKomada(parseFloat(e.target.value))}
                        fullWidth
                        disabled={nacinRacunanjaKomada !== "KOMAD"}
                    />
                </Container>

                <TextField
                    sx={{ margin: 1}}
                    label="Kolicina"
                    margin="normal"
                    name="kolicina"
                    type="number"
                    value={kolicina}
                    disabled
                    fullWidth
                    
                />
                <TextField
                    sx={{ margin: 1}}
                    label="Cena"
                    margin="normal"
                    name="cena"
                    type="number"
                    value={cena}
                    fullWidth
                    disabled
                />

                    
                </Container>
                : null

            }


        </DialogContent>

        <DialogActions>
            <Button onClick={handleClose}>Odustani</Button>
            <Button onClick={dodajStavku}>Dodaj</Button>
        </DialogActions>
    </Dialog>
    </>
  )
}
