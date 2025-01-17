import { Button, Dialog, DialogTitle ,DialogContent,DialogActions,TextField} from '@mui/material'
import React from 'react'
import { dokumentPonudeLinkTemplate } from '../../api/josnTemplates/JSONTemplates'
import { postDokumentPonudeLinkForPonuda } from '../../api/apiFunctions/ApiFunctions'

function DodajDokumentLinkDialog({ponudaId}) {
    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const [dokumentLink, setDokumentLink] = React.useState({...dokumentPonudeLinkTemplate,uneoKorisnik:localStorage.getItem("korisnik")})

    const handleDodaj = () => {
        postDokumentPonudeLinkForPonuda(ponudaId, dokumentLink)
        setDokumentLink(dokumentPonudeLinkTemplate)
        setOpen(false)
        window.location.reload()
    }

  return (
    <>
    <Button onClick={handleClickOpen} variant="contained" color="primary" size="large" style={{margin: "10px"}}>Dodaj dokument</Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dodaj dokument</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="naziv"
                label="Naziv"
                type="text"
                fullWidth
                value={dokumentLink.naziv}
                onChange={(e) => setDokumentLink({...dokumentLink, naziv: e.target.value})}
            />
            <TextField
                margin="dense"
                id="link"
                label="Link"
                type="text"
                fullWidth
                value={dokumentLink.link}
                onChange={(e) => setDokumentLink({...dokumentLink, link: e.target.value})}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Odustani
            </Button>
            <Button onClick={handleDodaj} color="primary">
                Dodaj
            </Button>
        </DialogActions>
    </Dialog>
    </>
  )
}

export default DodajDokumentLinkDialog