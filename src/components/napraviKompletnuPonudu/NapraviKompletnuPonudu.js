import { Button, Dialog, DialogActions, DialogContentText, Paper, tableBody, td, tr, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

import { getPonuda,getAllProizvodiPonudeForPonuda,getKalkulacijaByPonudaId } from '../../api/apiFunctions/ApiFunctions'
import { ponudaTemplate } from '../../api/josnTemplates/JSONTemplates'
import { DataGrid } from '@mui/x-data-grid'
import { saveAs } from 'file-saver'
import { Font, Image, pdf, Svg } from '@react-pdf/renderer'
import { Document, Page, Text, View } from '@react-pdf/renderer'
import logo from '../../assets/images/logo.png'
import Monsterat from '../../assets/Rubik-VariableFont_wght.ttf'

function NapraviKompletnuPonudu({ponudaId}) {

    
      


    const [open, setOpen] = React.useState(false);
    const hancleCLickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const[ponuda,setPonuda] = React.useState(ponudaTemplate)
    const[proizvodiPonude,setProizvodiPonude] = React.useState([])
    const[kalkulacije,setKalkulacije] = React.useState([])

    const[ukupnaCenaPonudeBezPdv,setUkupnaCenaPonudeBezPdv] = React.useState(0)
    const[ukupnaCenaPonudeSaPdv,setUkupnaCenaPonudeSaPdv] = React.useState(0)

    async function fetchPonuda(){
        const response = await getPonuda(ponudaId)
        setPonuda(response)
    }

    async function fetchProizvodiPonude(){
        const response = await getAllProizvodiPonudeForPonuda(ponudaId)
        setProizvodiPonude(response)
    }

    async function fetchKalkulacije(){
        const kalkulacije = await getKalkulacijaByPonudaId(ponudaId)
        setKalkulacije(kalkulacije)
    }

    useEffect(() => {
        fetchPonuda()
        fetchProizvodiPonude()
        fetchKalkulacije()
    }, [])

    const [rowselectionModels, setRowSelectionModels] = React.useState([]);
    const [kalkulacijaZaPonudu, setKalkulacijaZaPonudu] = React.useState([])



    useEffect(() => {

        let ukupnaCenaBezPdv = 0
        let ukupnaCenaSaPdv = 0

        for (const [key, value] of Object.entries(rowselectionModels)) {
            if(value.length>0){
                value.forEach((kalkulacijaId) => {
                    const kalkulacija = kalkulacije.find(kalkulacija => kalkulacija.id === kalkulacijaId)
                    ukupnaCenaBezPdv += kalkulacija.ukupnoBezPdv
                    ukupnaCenaSaPdv += kalkulacija.ukupnoSaPdv
                    setUkupnaCenaPonudeBezPdv(ukupnaCenaBezPdv)
                    setUkupnaCenaPonudeSaPdv(ukupnaCenaSaPdv)
                })
            }

        }

        let kalkulacijeZaPonudu = []
        for (const [key, value] of Object.entries(rowselectionModels)) {
            value.forEach((kalkulacijaId) => {
                kalkulacijeZaPonudu.push(kalkulacije.find(kalkulacija => kalkulacija.id === kalkulacijaId))
            })
        }
        setKalkulacijaZaPonudu(kalkulacijeZaPonudu)
    }, [rowselectionModels])

   const napraviPonudu = async () =>{
        console.log('Napravi ponudu')

        if(confirm('Da li ste sigurni da zelite da napravite ponudu?'))
        {
            const blob = await pdf(<PonudaPDF />).toBlob()
            saveAs(blob, ponuda.naziv+'.pdf')
        }

    }

    const styles = {
        page: {
            display: 'flex', // Display the page as a flex container
            justifyContent: 'start', // Center the content horizontally
            fontFamily: 'Montserrat', // Set the font family
            fontWeight: 'bold', // Set the font weight
            flexDirection: 'column',
            backgroundColor: '#FFF', // white background
            padding: 10,
            fontSize: 12, // Adjust font size as needed
            width: '100%', // Set the width to 100% of the page
            height: '100%', // Set the height to 100% of the page
            overflow:"hidden"
        },
        section: {
            margin: 0,
            padding: 5,
            flexGrow: 1
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 5,
            height:"150px",
            borderBottomWidth: 1,
            borderBottomColor: '#000', // Black border at the bottom of the header
        },
        logo: {
            width: '25%', // Logo on the left half of the header
            textAlign: 'left', // Align the text to the left
            paddingRight: 10 // Padding to the right of the logo
        },
        offerNumber: {
            width: '50%', // Offer number on the right half of the header
            textAlign: 'right', // Align the text to the right
            paddingLeft: 10, // Padding to the left of the offer number
            fontSize: 15, // Adjust font size as needed
        },
        title: {
            fontSize: 12, // Adjust font size as needed
            fontWeight: 'bold', // Bold font weight for titles
        },
        table: {
            display: 'table',
            width: 'auto', // Set the table width to auto to use the full width
            borderStyle: 'solid',
            borderColor: '#000', // Black borders for the table
            borderWidth: 1,
            borderCollapse: 'collapse' // Collapse borders for a clean look
        },
        tableRow: {
            flexDirection: 'row',
            borderStyle: 'solid',
            borderColor: '#000', // Black borders for table rows
            borderBottomWidth: 1,
            backgroundColor: '#FFF', // Alternating row color if needed
        },
        tableColHeader: {
            width: '25%', // Equal width for each column header
            borderStyle: 'solid',
            borderColor: '#000', // Black borders for table column headers
            borderWidth: 1,
            backgroundColor: '#F0F0F0', // Grey background for header columns
            textAlign: 'center', // Center align text
            fontWeight: 'bold', // Bold font weight for column headers
        },
        tableCol: {
            width: '25%', // Equal width for each table column
            borderStyle: 'solid',
            borderColor: '#000', // Black borders for table columns
            borderWidth: 1,
            textAlign: 'center', // Center align text
            fontSize: 14, // Adjust font size as needed
        },
        totalSection: {
            flexDirection: 'row',
            justifyContent: 'flex-end', // Align total section to the right
            marginTop: 5,
            marginBottom: 50,
            paddingRight: 10 ,// Padding to the right of the total section
            fontSize: 18, // Adjust font size as needed
        },
        totalLabel: {
            width: '50%', // Half width for labels
            textAlign: 'right', // Align text to the right
            paddingRight: 10 // Padding to the right of the label
        },
        totalValue: {
            width: '50%', // Half width for values
            textAlign: 'left', // Align text to the left
        },
        footer: {
            textAlign: 'center', // Center align footer text
            fontSize: 10, // Adjust font size as needed
        }
    };
    



    const PonudaPDF = () =>{
        Font.register({family: 'Montserrat', src: Monsterat})
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <Image src={logo} />
                    </View>
                    <View style={styles.offerNumber}>
                    <Text style={styles.title}>PONUDA broj: {ponuda.naziv}</Text>
                    <Text style={styles.title}>Joilart Kostil doo</Text>
                    <Text style={styles.title}>Adresa: Bogoljuba Petkovića 1a, Barajevo, 11460</Text>
                    <Text style={styles.title}>PIB: 104054786</Text>
                    <Text style={styles.title}>Maticni broj: 20068680</Text>
                    <Text style={styles.title}>Telefon: 060-0-48-48-48</Text>
                    <Text style={styles.title}>Email: 
                        <Text style={{color: 'blue'}}>
                            kontakt@joilart.org
                        </Text>
                    </Text>


                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Klijent: {ponuda.kupac.imeIPrezime}</Text>
                    <Text style={styles.title}>Datum: {new Date().toLocaleDateString()}</Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeader}>
                        <Text>Artikal</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                        <Text>Kolicina</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                        <Text>Cena</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                        <Text>Ukupno bez PDV-a</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                        <Text>Ukupno sa PDV-om</Text>
                        </View>
                    </View>
                    {/* Table Rows */}
                    {kalkulacijaZaPonudu.map((kalkulacija, index) => (
                        <View style={styles.tableRow} key={index}>
                        <View style={styles.tableCol}>
                            <Text>{kalkulacija.proizvodPonuda.naziv} - {kalkulacija.naziv}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text>{kalkulacija.proizvodPonuda.ukupnoKomada}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text>{(kalkulacija.ukupnoBezPdv/kalkulacija.proizvodPonuda.ukupnoKomada).toFixed(2)}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text>{kalkulacija.ukupnoBezPdv.toFixed(2)}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text>{kalkulacija.ukupnoSaPdv.toFixed(2)}</Text>
                        </View>
                        </View>
                    ))}
                    </View>
                </View>
                <View style={styles.totalSection}>
                    {/* Total Section */}
                    <View style={styles.totalLabel}>
                    <Text>UKUPNO bez pdv-a:</Text>
                    </View>
                    <View style={styles.totalValue}>
                    <Text>{ukupnaCenaPonudeBezPdv.toFixed(2)}</Text>
                    </View>
                    <View style={styles.totalLabel}>
                    <Text>UKUPNO sa pdv-om:</Text>
                    </View>
                    <View style={styles.totalValue}>
                    <Text>{ukupnaCenaPonudeSaPdv.toFixed(2)}</Text>
                    </View>
                </View>
                <Text style={styles.footer}>
                    Ponuda izradjena - Konstil Software {/* Replace with your footer text */}
                </Text>
                </Page>
            </Document>
        )
      }



    if(ponuda === ponudaTemplate || proizvodiPonude===null || kalkulacije===null){
        return <div>Loading...</div>
    }

    

  return (
    <>
        <Button onClick={hancleCLickOpen} variant="contained" color="primary" sx={{margin: 2}}>Napravi kompletnu ponudu</Button>
        <Dialog  open={open} onClose={handleClose}>
            <DialogTitle>Napravi kompletnu ponudu</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Izaberite kalkulacije za svaki pproizvod Ponude
                </DialogContentText>
                <Typography variant="h6">Ponuda: {ponuda.naziv}</Typography>
                <Typography variant="h6">Datum: {new Date(ponuda.datumOtvaranja).toLocaleDateString()}</Typography>
                <Typography variant="h6">Klijent: {ponuda.kupac.imeIPrezime}</Typography>
                <Typography variant="h6">Proizvodi:</Typography>
                {proizvodiPonude.map((proizvodPonude) => {
                    return(
                        <Paper elevation={3} sx={{padding: 2, margin: 2}}>
                            <Typography variant="h6">{proizvodPonude.naziv}</Typography>
                            <Typography variant="h6">Ukupno komada: {proizvodPonude.ukupnoKomada}</Typography>
                            <DataGrid
                                rows={kalkulacije.filter(kalkulacija => kalkulacija.proizvodPonuda.id === proizvodPonude.id)}
                                columns={[
                                    {field: 'id', headerName: 'ID', width: 70},
                                    {field: 'naziv', headerName: 'Naziv', width: 200},
                                    {field: 'ukupnoBezPdv', headerName: 'Bez PDV-a', width: 200},
                                    {field: 'ukupnoSaPdv', headerName: 'Sa PDV-om', width: 200},
                                ]}
                                pageSize={5}
                                checkboxSelection
                                rowSelectionModel={rowselectionModels[proizvodPonude.id]}
                                onRowSelectionModelChange={(newSelection) => {
                                    setRowSelectionModels({
                                        ...rowselectionModels,
                                        [proizvodPonude.id]: newSelection,
                                    });
     

                                
                                }
                                }
                            />
                        </Paper>
                    )
                })}

                <Typography variant="h6">Ukupna cena bez PDV-a: {ukupnaCenaPonudeBezPdv.toFixed(2)}</Typography>
                <Typography variant="h6">Ukupna cena sa PDV-om: {ukupnaCenaPonudeSaPdv.toFixed(2)}</Typography>

                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Zatvori</Button>
                <Button onClick={napraviPonudu} color="primary">Napravi ponudu</Button>
            </DialogActions>
        </Dialog>    
    </>
  )
}

export default NapraviKompletnuPonudu