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
import { ClientService } from '../service/ClientService';
import { Link } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import axios from 'axios'
const Client = () => {
    let emptyClient = {
        idClient: null,
        nomCl: '',
        prenom: '',
        tel: null,
        email: '',
        adresse: '',
        cin: '',
        numPermis: '',
        paysEmssCin: '',
        dateEmissionPermis: '',
        dateEmssCin: '',
        dateExpCin: '',
        dateExpPermis: ''
    };

    const [clients, setClients] = useState(null);
    const [clientDialog, setClientDialog] = useState(false);
    const [deleteClientDialog, setDeleteClientDialog] = useState(false);
    const [deleteClientsDialog, setDeleteClientsDialog] = useState(false);
    const [client, setClient] = useState(emptyClient);
    const [selectedClients, setSelectedClients] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const Clientservice = new ClientService();
        Clientservice.getClients().then(data => setClients(data));
    }, []);


    const openNew = () => {
        setClient(emptyClient);
        setSubmitted(false);
        setClientDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setClientDialog(false);
    }

    const hideDeleteClientDialog = () => {
        setDeleteClientDialog(false);
    }

    const hideDeleteClientsDialog = () => {
        setDeleteClientsDialog(false);
    }

    const saveClient = () => {
        setSubmitted(true);
        if (client.nomCl.trim()) {
          const clientService = new ClientService();
          let _clients = [...clients]; // declare _clients here
          if (client.idClient) {
            clientService
              .putClient(client)
              .then(response => {
                const index = findIndexById(client.idClient);
                _clients[index] = response.data;
                toast.current.show({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Client Updated',
                  life: 3000,
                });
              })
          } else {
            clientService
              .addClient(client)
              .then(response => {
                const newClient = response.data;
                newClient.idClient = newClient.idClient;
                _clients.push(newClient);
            

                toast.current.show({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Client Created',
                  life: 3000,
                });
              })
          }
          setClients(_clients);
          setClientDialog(false);
          setClient(emptyClient);
        }
      };
      
    const editClient = (client) => {
        setClient({ ...client });
        setClientDialog(true);
    }

    const confirmDeleteClient = (client) => {
        setClient(client);
        setDeleteClientDialog(true);
    }

    const deleteClient = () => {
        const Clientservice = new ClientService();

        Clientservice.deleteClient(client.idClient)
            .then(response => {
                // handle successful response
                let _clients = clients.filter(val => val.idClient !== client.idClient);
                setClients(_clients);
                setDeleteClientDialog(false);
                setClient(emptyClient);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Client Deleted', life: 3000 });
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }



    const findIndexById = (idClient) => {
        let index = -1;
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].idClient === idClient) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let idClient = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            idClient += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return idClient;
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteClientsDialog(true);
    }

    const deleteSelectedClients = () => {
        let _clients = clients.filter(val => !selectedClients.includes(val));
        setClients(_clients);
        setDeleteClientsDialog(false);
        setSelectedClients(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Clients Deleted', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _client = { ...client };
        _client['category'] = e.value;
        setClient(_client);
    }

    const onInputChange = (e, nomCl) => {
        const val = (e.target && e.target.value) || '';
        let _client = { ...client };
        _client[`${nomCl}`] = val;

        setClient(_client);
    }





    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger mr-2" onClick={confirmDeleteSelected} disabled={!selectedClients || !selectedClients.length} />
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



    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nom</span>
                {rowData.nomCl}
            </>
        );
    }

    const prenomBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Prenom</span>
                {rowData.prenom}
            </>
        );
    }



    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    }




    const telBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Téléphone</span>
                {rowData.tel}
            </>
        );
    }


    const usernameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Username</span>
                {rowData.username}
            </>
        );
    }

    const adresseBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Adresse</span>
                {rowData.adresse}
            </>
        );
    }
    const dateEmissBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Date emisson Permis</span>
                {rowData.dateEmissionPermis}
            </>
        );
    }


    const numBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Numero Permis</span>
                {rowData.num_permis}
            </>
        );
    }





    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editClient(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteClient(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Liste des Clients</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const clientDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveClient} />
        </>
    );
    const deleteClientDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteClientDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteClient} />
        </>
    );
    const deleteClientsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteClientsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedClients} />
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
                        value={clients}
                        selection={selectedClients}
                        onSelectionChange={(e) => setSelectedClients(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} clients"
                        globalFilter={globalFilter}
                        globalFilterFields={['nomCl', 'prenom', 'email']} // Add this line
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
                        <Column field="nomCl" header="Nom" sortable body={nameBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column field="prenom" header="Prenom" sortable body={prenomBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column field="dateEmissionPermis" header="dateEmissionPermis" sortable body={dateEmissBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>


                    <Dialog visible={clientDialog} style={{ width: '450px' }} header="Client Details" modal className="p-fluid" footer={clientDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="nomCl">Name</label>
                            <InputText id="nomCl" value={client.nomCl} onChange={(e) => onInputChange(e, 'nomCl')} required autoFocus className={classNames({ 'p-invalid': submitted && !client.nomCl })} />
                            {submitted && !client.nomCl && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="prenom">Prénom</label>
                            <InputText id="prenom" value={client.prenom} onChange={(e) => onInputChange(e, 'prenom')} required autoFocus className={classNames({ 'p-invalid': submitted && !client.prenom })} />
                            {submitted && !client.prenom && <small className="p-invalid">First Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="tel">Téléphone</label>
                            <InputText id="tel" value={client.tel} onChange={(e) => onInputChange(e, 'tel')} required autoFocus className={classNames({ 'p-invalid': submitted && !client.tel })} />
                            {submitted && !client.tel && <small className="p-invalid">First Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="adresse">Adresse</label>
                            <InputText id="adresse" value={client.adresse} onChange={(e) => onInputChange(e, 'adresse')} required rows={3} cols={20} />
                            {submitted && !client.adresse && <small className="p-invalid">Adresse is required.</small>}

                        </div>

                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={client.email} onChange={(e) => onInputChange(e, 'email')} required rows={3} cols={20} />
                            {submitted && !client.email && <small className="p-invalid">Email is required.</small>}

                        </div>

                        <div className="field">
                            <label htmlFor="cin">CIN</label>
                            <InputText id="cin" value={client.cin} onChange={(e) => onInputChange(e, 'cin')} required autoFocus className={classNames({ 'p-invalid': submitted && !client.cin })} />
                            {submitted && !client.cin && <small className="p-invalid">CIN is required.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="numPermis">Numéro de permis</label>
                            <InputText id="numPermis" value={client.numPermis} onChange={(e) => onInputChange(e, 'numPermis')} required className={classNames({ 'p-invalid': submitted && !client.numPermis })} />
                            {submitted && !client.numPermis && <small className="p-invalid">Le numéro de permis est requis.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="paysEmssCin">Pays émetteur de la CIN</label>
                            <InputText id="paysEmssCin" value={client.paysEmssCin} onChange={(e) => onInputChange(e, 'paysEmssCin')} required className={classNames({ 'p-invalid': submitted && !client.paysEmssCin })} />
                            {submitted && !client.paysEmssCin && <small className="p-invalid">Le pays émetteur de la CIN est requis.</small>}
                        </div>


                        <div className="field">
                            <label htmlFor="dateEmissionPermis">Date d'émission du permis</label>
                            <Calendar
                                id="dateEmissionPermis"
                                value={client.dateEmissionPermis}
                                onChange={(e) => onInputChange(e, 'dateEmissionPermis')}
                                showIcon={true}
                                dateFormat="yy-mm-dd"
                                className={classNames({ 'p-invalid': submitted && !client.dateEmissionPermis })}
                            />


                            {submitted && !client.dateEmissionPermis && <small className="p-invalid">La date d'émission du permis est requise.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="dateEmssCin">Date d'émission de la CIN</label>
                            <Calendar id="dateEmssCin" value={client.dateEmssCin} onChange={(e) => onInputChange(e, 'dateEmssCin')} showIcon={true} dateFormat="yy-mm-dd" className={classNames({ 'p-invalid': submitted && !client.dateEmssCin })} />
                            {submitted && !client.dateEmssCin && <small className="p-invalid">La date d'émission de la CIN est requise.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="dateExpCin">Date d'expiration de la CIN</label>
                            <Calendar id="dateExpCin" value={client.dateExpCin} onChange={(e) => onInputChange(e, 'dateExpCin')} showIcon={true} dateFormat="yy-mm-dd" className={classNames({ 'p-invalid': submitted && !client.dateExpCin })} />
                            {submitted && !client.dateExpCin && <small className="p-invalid">La date d'expiration de la CIN est requise.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="dateExpPermis">Date d'expiration du permis</label>
                            <Calendar id="dateExpPermis" value={client.dateExpPermis} onChange={(e) => onInputChange(e, 'dateExpPermis')} showIcon={true} dateFormat="yy-mm-dd" className={classNames({ 'p-invalid': submitted && !client.dateExpPermis })} />
                            {submitted && !client.dateExpPermis && <small className="p-invalid">La date d'expiration du permis est requise.</small>}
                        </div>



                    </Dialog>

                    <Dialog visible={deleteClientDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteClientDialogFooter} onHide={hideDeleteClientDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {client && <span>Are you sure you want to delete <b>{client.nomCl}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteClientsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteClientsDialogFooter} onHide={hideDeleteClientsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {client && <span>Are you sure you want to delete the selected clients?</span>}
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

export default React.memo(Client, comparisonFn);