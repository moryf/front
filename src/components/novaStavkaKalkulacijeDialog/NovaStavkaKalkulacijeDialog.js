import { Button, Dialog, DialogContent, DialogTitle, TextField , Paper, Container, DialogActions, Select, FormGroup, FormControlLabel, Switch} from '@mui/material'
import React, { useEffect, useState } from 'react'
import PretragaProizvodaDialog from './pretragaProizvodaDialog/PretragaProizvodaDialog'
import { proizvodTemplate, stavkaKalkulacijeTemplate } from '../../api/josnTemplates/JSONTemplates'
import NoviProizvod from '../noviProizvod/NoviProizvod'


export default function NovaStavkaKalkulacijeDialog({open, handleClose,mode,izmenaStavka,addStavka,visinaProizvoda,duzinaProizvoda,dubinaProizvoda, koriscenjeCene,cinkovanje,farbanje,montaza,izrada}) {

    const stavkaTemplateLoadValues = {
        ...stavkaKalkulacijeTemplate,
        cinkovanje: cinkovanje,
        farbanje: farbanje,
        montaza: montaza,
        izrada: izrada,
    }


    //Proizvod
    const[proizvod, setProizvod] = useState(mode === "IZMENA" ? izmenaStavka.proizvod : proizvodTemplate);
    const [proizvodLoaded, setProizvodLoaded] = useState(mode === "IZMENA" ? true : false);
// Da li je merna jedinica proizvoda komadi true ako jeste, false ako je metarski proizvod
    const [jmKomada, setJmKomada] = useState(mode === "IZMENA" ? (izmenaStavka.proizvod.jedinicaMere === "KOMAD" ? true : false) : true);
// Nacin racunanja duzine komada
    const[nacinRacunanjaDuzineKomada, setNacinRacunanjaDuzineKomada] = useState(mode==="IZMENA"? izmenaStavka.nacinRacunanjaDuzineKomada : "UPISANO");
// Nacin racunanja komada
    const[nacinRacunanjaKomada, setNacinRacunanjaKomada] = useState(mode === "IZMENA" ? izmenaStavka.nacinRacunanjaKomada : "KOMAD");
// Vrednosti za stavku kalkulacije
    const[sacuvano,setSacuvano] = useState(false);
    const[stavkaKalkulacije, setStavkaKalkulacije] = useState(mode === "IZMENA" ? izmenaStavka : stavkaTemplateLoadValues);

    function setProizvodState(proizvod) {
        setProizvodLoaded(true);
        setProizvod(proizvod);
        setStavkaKalkulacije(prevState => ({
            ...prevState,
            proizvod: proizvod,
        }));
        if(koriscenjeCene === "VELEPRODAJNA_CENA"){
            setStavkaKalkulacije(prevState => ({
                ...prevState,
                cena: proizvod.veleprodajnaCena,
            }));
        }else{
            setStavkaKalkulacije(prevState => ({
                ...prevState,
                cena: proizvod.cenaA,
            }));
        }
        if (proizvod.jedinicaMere === "KOMAD") {
            setJmKomada(true);
        } else {
            setJmKomada(false);
        }
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = event.target;
        setStavkaKalkulacije(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    const handleNacinRacunanjaDuzineKomada = (e) => {
        setNacinRacunanjaDuzineKomada(e.target.value);
        handleInputChange(e);
    }

    const handleNacinRacunanjaKomada = (e) => {
        setNacinRacunanjaKomada(e.target.value);
        handleInputChange(e);
    }

    const preracunajKolicinuKomada = () => {
        let kolicinaKomada = 0;
        let razmak = parseFloat(stavkaKalkulacije.razmak);
        let multiplikator = parseFloat(stavkaKalkulacije.multiplikator);
        let rucniDodatak = parseFloat(stavkaKalkulacije.rucniDodatak);
        if(nacinRacunanjaKomada === "KOMAD"){
            kolicinaKomada = parseFloat(stavkaKalkulacije.kolicinaKomada);
        }else if(nacinRacunanjaKomada === "PO_DUZNOM_METRU"){
            kolicinaKomada =(Math.floor(duzinaProizvoda/razmak+rucniDodatak)*multiplikator);
        }else if(nacinRacunanjaKomada === "PO_VISINSKOM_METRU"){
            kolicinaKomada =(Math.floor(visinaProizvoda/razmak + rucniDodatak)*multiplikator);
        }else if(nacinRacunanjaKomada === "PO_DUBINSKOM_METRU"){
            kolicinaKomada =(Math.floor(dubinaProizvoda/razmak + rucniDodatak)*multiplikator);
        }
        setStavkaKalkulacije(prevState => ({
            ...prevState,
            kolicinaKomada: kolicinaKomada,
        }));
    }

    const preracunajDuzinuKomada = () => {
        let duzinaKomada = 0;
        let razlikaDuzine = parseFloat(stavkaKalkulacije.razlikaDuzine);
        let referentnaDuzina=0;
        if(nacinRacunanjaDuzineKomada === "UPISANO"){
            referentnaDuzina = 0;
            duzinaKomada = parseFloat(stavkaKalkulacije.duzinaKomada);
        }
        else if (nacinRacunanjaDuzineKomada === "DUZINA"){
            referentnaDuzina = parseFloat(duzinaProizvoda);
            duzinaKomada = referentnaDuzina + razlikaDuzine;
        }else if (nacinRacunanjaDuzineKomada === "VISINA"){
            referentnaDuzina = parseFloat(visinaProizvoda);
            duzinaKomada = referentnaDuzina + razlikaDuzine;
        } else if (nacinRacunanjaDuzineKomada === "DUBINA"){
            referentnaDuzina = parseFloat(dubinaProizvoda);
            duzinaKomada = referentnaDuzina + razlikaDuzine;
        }
        
        setStavkaKalkulacije(prevState => ({
            ...prevState,
            duzinaKomada: duzinaKomada,
            referentnaDuzina: referentnaDuzina,
        }));
    }

    const preracunajKolicinu = () => {
        let kolicina = 0;
        let duzinaKomada = parseFloat(stavkaKalkulacije.duzinaKomada);
        let kolicinaKomada = parseFloat(stavkaKalkulacije.kolicinaKomada);
        if(jmKomada){
            kolicina = kolicinaKomada;
        }else{
            kolicina = duzinaKomada*kolicinaKomada;
        }
        setStavkaKalkulacije(prevState => ({
            ...prevState,
            kolicina: kolicina,
        }));
    }

    useEffect(() => {
        preracunajKolicinuKomada();
        preracunajDuzinuKomada();
        preracunajKolicinu();
        if(mode === "NOVI"){
            setStavkaKalkulacije(prevState => ({
                ...prevState,
                cinkovanje: cinkovanje,
                farbanje: farbanje,
                montaza: montaza,
                izrada: izrada,
            }));
        }
    }
    ,[cinkovanje,farbanje,montaza,izrada,nacinRacunanjaDuzineKomada,nacinRacunanjaKomada,stavkaKalkulacije.multiplikator, stavkaKalkulacije.razlikaDuzine,stavkaKalkulacije.razmak,stavkaKalkulacije.rucniDodatak,stavkaKalkulacije.kolicinaKomada,stavkaKalkulacije.duzinaKomada ]);

    const dodajStavku = () => {
        addStavka(stavkaKalkulacije);
        setSacuvano(true);
        handleClose();
        setStavkaKalkulacije(stavkaKalkulacijeTemplate);
        setProizvod(proizvodTemplate);
        setProizvodLoaded(false);
        return;
    }

    const handleClickClose = () => {
        handleClose();
        setStavkaKalkulacije(stavkaKalkulacijeTemplate);
        setProizvod(proizvodTemplate);
        setProizvodLoaded(false);
        return;
    }


  return (
    <>
    
    <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Nova Stavka Kalkulacije</DialogTitle>
        <DialogContent>
            <PretragaProizvodaDialog setProizvodState={setProizvodState} />
            <NoviProizvod setProizvodState={setProizvodState}/>
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
                    label="Opis"
                    margin="normal"
                    name="opis"
                    type="text"
                    value={proizvod.opis}
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
                            value={stavkaKalkulacije.referentnaDuzina}
                            fullWidth
                            disabled
                        />
                        <TextField
                            sx={{ margin: 1}}
                            label="Razlika duzine"
                            margin="normal"
                            name="razlikaDuzine"
                            type="number"
                            value={stavkaKalkulacije.razlikaDuzine}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            sx={{ margin: 1}}
                            label="Duzina komada"
                            margin="normal"
                            name="duzinaKomada"
                            type="number"
                            value={stavkaKalkulacije.duzinaKomada}
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
                        value={stavkaKalkulacije.duzinaKomada}
                        onChange={handleInputChange}
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
                            value={stavkaKalkulacije.razmak}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    <TextField
                        sx={{ margin: 1}}
                        label="Multiplikator"
                        margin="normal"
                        name="multiplikator"
                        type="number"
                        value={stavkaKalkulacije.multiplikator}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        sx={{ margin: 1}}
                        label="Rucni dodatak"
                        margin="normal"
                        name="rucniDodatak"
                        type="number"
                        value={stavkaKalkulacije.rucniDodatak}
                        onChange={handleInputChange}
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
                        value={stavkaKalkulacije.kolicinaKomada}
                        onChange={handleInputChange}
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
                    value={stavkaKalkulacije.kolicina}
                    disabled
                    fullWidth
                    
                />
                <TextField
                    sx={{ margin: 1}}
                    label="Cena"
                    margin="normal"
                    name="cena"
                    type="number"
                    value={stavkaKalkulacije.cena}
                    fullWidth
                    disabled
                />

                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={stavkaKalkulacije.cinkovanje} onChange={handleInputChange} name="cinkovanje" />}
                        label="Cinkovanje"
                    />
                    <FormControlLabel
                        control={<Switch checked={stavkaKalkulacije.farbanje} onChange={handleInputChange} name="farbanje" />}
                        label="Farbanje"
                    />
                    <FormControlLabel
                        control={<Switch checked={stavkaKalkulacije.montaza} onChange={handleInputChange} name="montaza" />}
                        label="Montaza"
                    />
                    <FormControlLabel
                        control={<Switch checked={stavkaKalkulacije.izrada} onChange={handleInputChange} name="izrada" />}
                        label="Izrada"
                    />
                    {/* Repeat for other boolean fields */}
                </FormGroup>

                    
                </Container>
                : null

            }


        </DialogContent>

        <DialogActions>
            <Button onClick={handleClickClose}>Odustani</Button>
            <Button onClick={dodajStavku}>Dodaj</Button>
        </DialogActions>
    </Dialog>
    </>
  )
}
