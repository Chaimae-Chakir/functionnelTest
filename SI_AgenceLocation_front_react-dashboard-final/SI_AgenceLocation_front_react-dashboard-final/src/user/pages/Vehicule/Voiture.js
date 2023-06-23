import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { VoitureService } from '../../service/VoitureService';
import { Link } from 'react-router-dom';

const Voiture = () => {
    let emptyVoiture = {
        idVoiture: null,
        nom: '',
        modele: '',
        imageV: null,
        disponibilite: false,
        place: '',
        port: '',
        couleur: '',
        sacs: '',
        fuelType: '',
        gamme: {
            idGamme: null,
            nom: "",
        },
        groupe: {
            idGroup: null,
            nom: "",
            abv: ""
        }
    };

    const [voitures, setVoitures] = useState(null);
    const [voitureDialog, setVoitureDialog] = useState(false);
    const [deleteVoitureDialog, setDeleteVoitureDialog] = useState(false);
    const [deleteVoituresDialog, setDeleteVoituresDialog] = useState(false);
    const [voiture, setVoiture] = useState(emptyVoiture);
    const [selectedVoitures, setSelectedVoitures] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [gammeData, setGammeData] = useState([]);
    const [gammes, setGammes] = useState([]);
    const [selectedGammeId, setSelectedGammeId] = useState("");
    const [selectedGroupeId, setSelectedGroupeId] = useState("");
    const [dialogVisible, setDialogVisible] = useState(false);
    const [gammeNom, setGammeNom] = useState('');
    const [groupeNom, setGroupeNom] = useState("");
    const [groupeAbv, setGroupeAbv] = useState("");
    const [groupes, setGroupes] = useState([]);
    const [gammeDialogVisible, setGammeDialogVisible] = useState(false);
    const [groupeDialogVisible, setGroupeDialogVisible] = useState(false);



    const [newGamme, setNewGamme] = useState({
        nom: ''
    });
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const Voitureservice = new VoitureService();
        Voitureservice.getVoitures().then(data => setVoitures(data));
        Voitureservice.getGroupes().then(data => setGroupes(data));

        Voitureservice.getGammes().then(data => {
            setGammes(data);
            console.log(data); // check value of gammes array
        });
    }, []);


    const openNew = () => {
        setVoiture(emptyVoiture);
        setSubmitted(false);
        setVoitureDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setVoitureDialog(false);
    }

    const hideDeleteVoitureDialog = () => {
        setDeleteVoitureDialog(false);
    }

    const hideDeleteVoituresDialog = () => {
        setDeleteVoituresDialog(false);
    }
    const saveVoiture = () => {
        setSubmitted(true);
        if (voiture.nom.trim() && selectedGammeId && selectedGroupeId) {
          const voitureService = new VoitureService();
          let _voitures = [...voitures];
      
          // Get the selected gamme object from the gammes array
          const selectedGamme = gammes.find(gamme => gamme.idGamme == selectedGammeId);
          alert(selectedGammeId)

          const voitureWithGamme = { ...voiture, gamme: selectedGamme };
      
          // Get the selected groupe object from the groupes array
          const selectedGroupe = groupes.find(groupe => groupe.idGroup == selectedGroupeId);
          const voitureWithGammeAndGroupe = { ...voitureWithGamme, groupe: selectedGroupe };
          // Add the selected gamme and groupe to the voiture object
          if (voiture.idVoiture) {
            voitureService.putVoiture(voitureWithGammeAndGroupe).then((response) => {
              const index = findIndexById(voiture.idVoiture);
              _voitures[index] = response.data;
              toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "Voiture Updated",
                life: 3000,
              });
            });
          } else {
            voitureService.addVoiture(voitureWithGammeAndGroupe).then((response) => {
              const newVoiture = response.data;
              newVoiture.idVoiture = newVoiture.idVoiture;
              _voitures.push(newVoiture);
      
              toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "Voiture Created",
                life: 3000,
              });
            });
          }
      
          setVoitures(_voitures);
          setVoitureDialog(false);
          setVoiture(emptyVoiture);
        }
      };
      

    const editVoiture = (voiture) => {
        setVoiture({ ...voiture });
        setVoitureDialog(true);
    }

    const confirmDeleteVoiture = (voiture) => {
        setVoiture(voiture);
        setDeleteVoitureDialog(true);
    }

    const deleteVoiture = () => {
        const Voitureservice = new VoitureService();

        Voitureservice.deleteVoiture(voiture.idVoiture)
            .then(response => {
                // handle successful response
                let _voitures = voitures.filter(val => val.idVoiture !== voiture.idVoiture);
                setVoitures(_voitures);
                setDeleteVoitureDialog(false);
                setVoiture(emptyVoiture);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Voiture Deleted', life: 3000 });
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }






    const findIndexById = (idVoiture) => {
        let index = -1;
        for (let i = 0; i < voitures.length; i++) {
            if (voitures[i].idVoiture === idVoiture) {
                index = i;
                break;
            }
        }

        return index;
    }
    ////// this is to save a new gamme 
    const saveGamme = () => {
        const newGamme = { nom: gammeNom };
        const voitureService = new VoitureService();
        voitureService.createGamme(newGamme)
            .then(createdGamme => {
                setGammes([...gammes, createdGamme]);
                setGammeNom('');
                setDialogVisible(false);
                toast.current.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Gamme Created',
                    life: 3000,
                });
            }).catch(error => {
                console.log(error);
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to create gamme',
                    life: 3000,
                });
            });
    };
    ///////////////////// This is to save a new gamme
    const saveGroupe = () => {
        const newGroupe = { nom: groupeNom, abv: groupeAbv };
        const voitureService = new VoitureService();
        voitureService.createGroupe(newGroupe)
            .then(createdGroupe => {
                setGroupes([...groupes, createdGroupe]);
                setGroupeNom('');
                setGroupeAbv('');
                setDialogVisible(false);
                toast.current.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Groupe Created',
                    life: 3000,
                });
            }).catch(error => {
                console.log(error);
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to create groupe',
                    life: 3000,
                });
            });
    };

    const createId = () => {
        let idVoiture = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            idVoiture += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return idVoiture;
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteVoituresDialog(true);
    }

    const deleteSelectedVoitures = () => {
        let _voitures = voitures.filter(val => !selectedVoitures.includes(val));
        setVoitures(_voitures);
        setDeleteVoituresDialog(false);
        setSelectedVoitures(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Voitures Deleted', life: 3000 });
    }

    const onCategoryChange = (e, fieldName) => {
        const value = e.target.value;
        setVoiture((prevVoiture) => ({
          ...prevVoiture,
          [fieldName]: value
        }));
      }

    const onInputChange = (e, nom) => {
        const val = (e.target && e.target.value) || '';
        let _voiture = { ...voiture };
        _voiture[nom] = val;
        console.log(_voiture); // check value of voiture object
        setVoiture(_voiture);
    };





    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger mr-2" onClick={confirmDeleteSelected} disabled={!selectedVoitures || !selectedVoitures.length} />
                </div>

            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }



    const nomBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nom</span>
                {rowData.nom}
            </>
        );
    }

    const modeleBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Modéle</span>
                {rowData.modele}
            </>
        );
    }





    const disponibiliteBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Disponibilite</span>
                {rowData.disponibilite ? 'yes' : 'no'}
            </>
        );
    }

    const placeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre des Places</span>
                {rowData.place}
            </>
        );
    }

    const portBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre des Ports</span>
                {rowData.port}
            </>
        );
    }

    const couleurBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title"> couleur</span>
                {rowData.couleur}
            </>
        );
    }

    const gammeBodyTemplate = (rowData) => {
        const gamme = gammes.find(g => g.idGamme === rowData.gamme.idGamme); // find corresponding gamme record
        const nomGamme = gamme ? gamme.nom : ''; // get the name of the gamme record

        return (
            <>
                <span className="p-column-title">Gamme</span>
                {nomGamme} {/* display nom and nomGamme */}
            </>
        );
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editVoiture(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteVoiture(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Liste des Voitures</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const voitureDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveVoiture} />
        </>
    );
    const deleteVoitureDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteVoitureDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteVoiture} />
        </>
    );
    const deleteVoituresDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteVoituresDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedVoitures} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={voitures}
                        selection={selectedVoitures}
                        onSelectionChange={(e) => setSelectedVoitures(e.value)}
                        dataKey="idVoiture"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} voitures"
                        globalFilter={globalFilter}
                        globalFilterFields={['nom', 'modele', 'place', 'couleur', 'disponibilite']} // Add this line
                        emptyMessage={
                            <div style={{ textAlign: 'center', paddingTop: '2em' }}>
                                <img src={`assets/layout/images/logo.png`} alt="No results found" />
                                <p style={{ fontWeight: 'bold', marginTop: '1em' }}>
                                    Désolé, aucun résultat ne correspond à votre recherche…
                                </p>
                            </div>
                        } header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="nom" header="nom" sortable body={nomBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column field="modele" header="Modele" sortable body={modeleBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column field="disponibilite" header="Disponibilite" sortable body={disponibiliteBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column field="place" header="Nombre des Places" sortable body={placeBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={voitureDialog} style={{ width: '450px' }} header="voiture Details" modal className="p-fluid" footer={voitureDialogFooter} onHide={hideDialog}>
                        {voiture.imageV && <img src={`assets/demo/images/product/${voiture.imageV}`} alt={voiture.imageV} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field-select col-12">
                            <label htmlFor="nom">Nom</label>
                            <InputText id="nom" value={voiture.nom} onChange={(e) => onInputChange(e, 'nom')} required autoFocus className={classNames({ 'p-invalid': submitted && !voiture.nom })} />
                            {submitted && !voiture.nom && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field-select col-12">
                            <label htmlFor="modele">Modéle</label>
                            <InputText id="modele" value={voiture.modele} onChange={(e) => onInputChange(e, 'modele')} required autoFocus className={classNames({ 'p-invalid': submitted && !voiture.modele })} />
                            {submitted && !voiture.modele && <small className="p-invalid">Modele is required.</small>}
                        </div>
                        <div className="field-select col-12">
                            <label htmlFor="prix">Prix</label>
                            <InputText id="prix" value={voiture.prix} onChange={(e) => onInputChange(e, 'prix')} required autoFocus  className={classNames({ 'p-invalid': submitted && !voiture.nom })} />
                            {submitted && !voiture.prix && <small className="p-invalid">Price is required.</small>}
                        </div>

                        <div className="field2">
                            <label className="mb-3">Type</label>
                            <div className="formgrid grid">
                                <div className="field-select col-12">
                                    <select id="fuelType" name="fuelType" onChange={(e) => onCategoryChange(e, "fuelType")} value={voiture.fuelType} className="disponibilite-select">
                                        <option value="typefl">Type 1</option>
                                        <option value="typefl">Type 2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field2">
                            <label className="mb-3">Disponibilite</label>
                            <div className="formgrid grid">
                                <div className="field-select col-12">
                                    <select id="disponibilite" name="disponibilite" onChange={(e) => onCategoryChange(e, "disponibilite")} value={voiture.disponibilite} className="disponibilite-select">
                                        <option value="true">Yes</option>
                                        <option value="false">Non</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field2">
                            <label className="mb-3">Couleur</label>
                            <div className="formgrid grid">
                                <div className="field-select col-12">
                                    <select id="couleur" name="couleur" onChange={(e) => onCategoryChange(e, "couleur")} value={voiture.couleur} className="disponibilite-select">
                                        <option value="Noir">Noir</option>
                                        <option value="blanc">Blanc</option>
                                        <option value="rouge">Rouge</option>

                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field2">
                            <label className="mb-3">Nombre des Places</label>
                            <div className="formgrid grid">
                                <div className="field-select col-12">
                                    <select id="place" name="place" onChange={(e) => onCategoryChange(e, "place")} value={voiture.place} className="disponibilite-select">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field2">
                            <label className="mb-3">Nombre des Ports</label>
                            <div className="formgrid grid">
                                <div className="field-select col-12">
                                    <select id="port" name="port" onChange={(e) => onCategoryChange(e, "port")} value={voiture.port} className="disponibilite-select">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>

                                    </select>
                                </div>
                            </div>
                        </div>



                        <div className="field2">
                            <label className="mb-3">Nombre des Sacs</label>
                            <div className="formgrid grid">
                                <div className="field-select col-12">
                                    <select id="sacs" name="sacs" onChange={(e) => onCategoryChange(e, "sacs")} value={voiture.sacs} className="disponibilite-select">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>

                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field2">
                            <label className="mb-3">Gamme</label>
                            <div className="formgrid grid">
                                <div className="field-select col-11" style={{ position: "relative" }}>
                                <i className="pi pi-plus-circle" onClick={() => setGammeDialogVisible(true)} style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: "-40px", cursor: "pointer", zIndex: "1", backgroundColor: "orange", borderRadius: "50%", padding: "10px" }} />
                                    <select value={selectedGammeId} onChange={(e) => setSelectedGammeId(e.target.value)} className="disponibilite-select" style={{ paddingRight: "50px" }}>
                                        <option value="">-- Select Gamme --</option>
                                        {gammes.map(gamme => (
                                            <option key={gamme.idGamme} value={gamme.idGamme}>{gamme.nom}</option>
                                        ))}
                                    </select>
                                    <Dialog visible={gammeDialogVisible} onHide={() => setGammeDialogVisible(false)}>
                                        <div className="p-dialog-header">
                                            <h3>Add New Gamme</h3>
                                        </div>
                                        <div className="p-dialog-content">
                                            <div className="p-fluid">
                                                <div className="p-field">
                                                    <label htmlFor="gammeNom">Nom</label>
                                                    <input id="gammeNom" type="text" value={gammeNom} onChange={(e) => setGammeNom(e.target.value)} className="p-inputtext p-component" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-dialog-footer">
                                            <Button label="Cancel" icon="pi pi-times" onClick={() => setGammeDialogVisible(false)} />
                                            <Button label="Save" icon="pi pi-check" onClick={saveGamme} />
                                        </div>
                                    </Dialog>

                                </div>
                            </div>
                        </div>

                        <div className="field2">
                            <label className="mb-3">Groupe</label>
                            <div className="formgrid grid">
                                <div className="field-select col-11" style={{ position: "relative" }}>
                                <i className="pi pi-plus-circle" onClick={() => setGroupeDialogVisible(true)} style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: "-40px", cursor: "pointer", zIndex: "1", backgroundColor: "orange", borderRadius: "50%", padding: "10px" }} />
                                    <select value={selectedGroupeId} onChange={(e) => setSelectedGroupeId(e.target.value)} className="disponibilite-select" style={{ paddingRight: "50px" }}>
                                        <option value="">-- Select Groupe --</option>
                                        {groupes.map(groupe => (
                                            <option key={groupe.idGroup} value={groupe.idGroup}>{groupe.nom}</option>
                                        ))}
                                    </select>
                                    <Dialog visible={groupeDialogVisible} onHide={() => setGroupeDialogVisible(false)}>
                                        <div className="p-dialog-header">
                                            <h3>Add New Groupe</h3>
                                        </div>
                                        <div className="p-dialog-content">
                                            <div className="p-fluid">
                                                <div className="p-field">
                                                    <label htmlFor="groupeNom">Nom</label>
                                                    <input id="groupeNom" type="text" value={groupeNom} onChange={(e) => setGroupeNom(e.target.value)} className="p-inputtext p-component" />
                                                </div>
                                                <div className="p-field">
                                                    <label htmlFor="groupeAbv">Abv</label>
                                                    <input id="groupeAbv" type="text" value={groupeAbv} onChange={(e) => setGroupeAbv(e.target.value)} className="p-inputtext p-component" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-dialog-footer">
                                            <Button label="Cancel" icon="pi pi-times" onClick={() => setGroupeDialogVisible(false)} />
                                            <Button label="Save" icon="pi pi-check" onClick={saveGroupe} />

                                        </div>
                                    </Dialog>

                                </div>
                            </div>
                        </div>

                    </Dialog>

                    <Dialog visible={deleteVoitureDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteVoitureDialogFooter} onHide={hideDeleteVoitureDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {voiture && <span>Are you sure you want to delete <b>{voiture.nom}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteVoituresDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteVoituresDialogFooter} onHide={hideDeleteVoituresDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {voiture && <span>Are you sure you want to delete the selected voitures?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Voiture, comparisonFn);