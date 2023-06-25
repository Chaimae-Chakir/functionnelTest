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
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:8081/clients/afficher/');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.log(error);
    }
  };

  const openNew = () => {
    setClient(emptyClient);
    setSubmitted(false);
    setClientDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setClientDialog(false);
  };

  const hideDeleteClientDialog = () => {
    setDeleteClientDialog(false);
  };

  const hideDeleteClientsDialog = () => {
    setDeleteClientsDialog(false);
  };

  const saveClient = async () => {
    setSubmitted(true);
    if (client.nomCl.trim()) {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(client)
        };

        let url = 'http://localhost:8081/clients/ajouter';
        if (client.idClient) {
          url = `http://localhost:8081/clients/modifier/${client.idClient}`;
          requestOptions.method = 'PUT';
        }

        const response = await fetch(url, requestOptions);
        if (response.ok) {
          fetchClients();

          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: client.idClient ? 'Client Updated' : 'Client Created',
            life: 3000
          });
        } else {
          throw new Error('Request failed.');
        }
      } catch (error) {
        console.log(error);
      }

      setClientDialog(false);
      setClient(emptyClient);
    }
  };

  const editClient = (client) => {
    setClient({ ...client });
    setClientDialog(true);
  };

  const confirmDeleteClient = (client) => {
    setClient(client);
    setDeleteClientDialog(true);
  };

  const deleteClient = async () => {
    try {
      const requestOptions = {
        method: 'DELETE'
      };

      const response = await fetch(
        `http://localhost:8081/clients/supprimer/${client.idClient}`,
        requestOptions
      );

      if (response.ok) {
        fetchClients();

        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Client Deleted',
          life: 3000
        });
      } else {
        throw new Error('Request failed.');
      }
    } catch (error) {
      console.log(error);
    }

    setDeleteClientDialog(false);
    setClient(emptyClient);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteClientsDialog(true);
  };

  const deleteSelectedClients = async () => {
    try {
      const requestOptions = {
        method: 'DELETE'
      };

      const selectedIds = selectedClients.map((client) => client.idClient);
      const deleteRequests = selectedIds.map((id) =>
        fetch(`http://localhost:8081/clients/supprimer/${id}`, requestOptions)
      );

      const responses = await Promise.all(deleteRequests);
      const successResponses = responses.filter((response) => response.ok);

      if (successResponses.length === selectedIds.length) {
        fetchClients();

        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Clients Deleted',
          life: 3000
        });
      } else {
        throw new Error('Request failed.');
      }
    } catch (error) {
      console.log(error);
    }

    setDeleteClientsDialog(false);
    setSelectedClients(null);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _client = { ...client };
    _client[`${name}`] = val;

    setClient(_client);
  };

  const onDateChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _client = { ...client };
    _client[`${name}`] = val;

    setClient(_client);
  };

  const findIndexById = (id) => {
    let index = -1;
    if (clients) {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].idClient === id) {
          index = i;
          break;
        }
      }
    }

    return index;
  };

  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedClients || !selectedClients.length}
        />
      </>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <>
        <FileUpload
          mode="basic"
          accept="csv"
          chooseLabel="Import"
          className="p-mr-2"
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editClient(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteClient(rowData)}
        />
      </div>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Manage Clients</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const clientDialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveClient}
      />
    </>
  );

  const deleteClientDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteClientDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteClient}
      />
    </>
  );

  const deleteClientsDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteClientsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedClients}
      />
    </>
  );

  return (
    <div className="datatable-crud-demo">
      <div className="card">
        <Toolbar
          className="p-mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={clients}
          selection={selectedClients}
          onSelectionChange={(e) => setSelectedClients(e.value)}
          dataKey="idClient"
          header={header}
          globalFilter={globalFilter}
          emptyMessage="No clients found"
        >
          <Column selectionMode="multiple" style={{ width: '3rem' }} />

          <Column field="idClient" header="ID" sortable></Column>
          <Column field="nomCl" header="Nom" sortable></Column>
          <Column field="prenom" header="Prenom" sortable></Column>
          <Column field="tel" header="Tel" sortable></Column>
          <Column field="email" header="Email" sortable></Column>
          <Column field="adresse" header="Adresse" sortable></Column>
          <Column field="cin" header="CIN" sortable></Column>
          <Column field="numPermis" header="Permis" sortable></Column>
          <Column field="paysEmssCin" header="Pays CIN" sortable></Column>
          <Column field="dateEmissionPermis" header="Date Emission Permis" sortable></Column>
          <Column field="dateEmssCin" header="Date Emss CIN" sortable></Column>
          <Column field="dateExpCin" header="Date Exp CIN" sortable></Column>
          <Column field="dateExpPermis" header="Date Exp Permis" sortable></Column>

          <Column
            body={actionBodyTemplate}
            headerStyle={{ width: '8rem', textAlign: 'center' }}
            bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
          />
        </DataTable>
      </div>

      <Dialog
        visible={clientDialog}
        style={{ width: '450px' }}
        header="Client Details"
        modal
        className="p-fluid"
        footer={clientDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="nomCl">Nom</label>
          <InputText
            id="nomCl"
            value={client.nomCl}
            onChange={(e) => onInputChange(e, 'nomCl')}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !client.nomCl })}
          />
          {submitted && !client.nomCl && (
            <small className="p-error">Nom is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="prenom">Prenom</label>
          <InputText
            id="prenom"
            value={client.prenom}
            onChange={(e) => onInputChange(e, 'prenom')}
            required
            className={classNames({ 'p-invalid': submitted && !client.prenom })}
          />
          {submitted && !client.prenom && (
            <small className="p-error">Prenom is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="tel">Tel</label>
          <InputText
            id="tel"
            value={client.tel}
            onChange={(e) => onInputChange(e, 'tel')}
            required
            className={classNames({ 'p-invalid': submitted && !client.tel })}
          />
          {submitted && !client.tel && (
            <small className="p-error">Tel is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            value={client.email}
            onChange={(e) => onInputChange(e, 'email')}
            required
            className={classNames({ 'p-invalid': submitted && !client.email })}
          />
          {submitted && !client.email && (
            <small className="p-error">Email is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="adresse">Adresse</label>
          <InputText
            id="adresse"
            value={client.adresse}
            onChange={(e) => onInputChange(e, 'adresse')}
            required
            className={classNames({ 'p-invalid': submitted && !client.adresse })}
          />
          {submitted && !client.adresse && (
            <small className="p-error">Adresse is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="cin">CIN</label>
          <InputText
            id="cin"
            value={client.cin}
            onChange={(e) => onInputChange(e, 'cin')}
            required
            className={classNames({ 'p-invalid': submitted && !client.cin })}
          />
          {submitted && !client.cin && (
            <small className="p-error">CIN is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="numPermis">Permis</label>
          <InputText
            id="numPermis"
            value={client.numPermis}
            onChange={(e) => onInputChange(e, 'numPermis')}
            required
            className={classNames({ 'p-invalid': submitted && !client.numPermis })}
          />
          {submitted && !client.numPermis && (
            <small className="p-error">Permis is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="paysEmssCin">Pays CIN</label>
          <InputText
            id="paysEmssCin"
            value={client.paysEmssCin}
            onChange={(e) => onInputChange(e, 'paysEmssCin')}
            required
            className={classNames({ 'p-invalid': submitted && !client.paysEmssCin })}
          />
          {submitted && !client.paysEmssCin && (
            <small className="p-error">Pays CIN is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="dateEmissionPermis">Date Emission Permis</label>
          <Calendar
            id="dateEmissionPermis"
            value={client.dateEmissionPermis}
            onChange={(e) => onDateChange(e, 'dateEmissionPermis')}
            dateFormat="dd/mm/yy"
            required
            className={classNames({
              'p-invalid': submitted && !client.dateEmissionPermis
            })}
          ></Calendar>
          {submitted && !client.dateEmissionPermis && (
            <small className="p-error">Date Emission Permis is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="dateEmssCin">Date Emss CIN</label>
          <Calendar
            id="dateEmssCin"
            value={client.dateEmssCin}
            onChange={(e) => onDateChange(e, 'dateEmssCin')}
            dateFormat="dd/mm/yy"
            required
            className={classNames({ 'p-invalid': submitted && !client.dateEmssCin })}
          ></Calendar>
          {submitted && !client.dateEmssCin && (
            <small className="p-error">Date Emss CIN is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="dateExpCin">Date Exp CIN</label>
          <Calendar
            id="dateExpCin"
            value={client.dateExpCin}
            onChange={(e) => onDateChange(e, 'dateExpCin')}
            dateFormat="dd/mm/yy"
            required
            className={classNames({ 'p-invalid': submitted && !client.dateExpCin })}
          ></Calendar>
          {submitted && !client.dateExpCin && (
            <small className="p-error">Date Exp CIN is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="dateExpPermis">Date Exp Permis</label>
          <Calendar
            id="dateExpPermis"
            value={client.dateExpPermis}
            onChange={(e) => onDateChange(e, 'dateExpPermis')}
            dateFormat="dd/mm/yy"
            required
            className={classNames({ 'p-invalid': submitted && !client.dateExpPermis })}
          ></Calendar>
          {submitted && !client.dateExpPermis && (
            <small className="p-error">Date Exp Permis is required.</small>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteClientDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteClientDialogFooter}
        onHide={hideDeleteClientDialog}
      >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
          {client && (
            <span>
              Are you sure you want to delete <b>{client.nomCl}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteClientsDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteClientsDialogFooter}
        onHide={hideDeleteClientsDialog}
      >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
          {client && (
            <span>
              Are you sure you want to delete the selected clients?
            </span>
          )}
        </div>
      </Dialog>

      <Toast ref={toast} />

      <style jsx>{`
        .datatable-crud-demo .p-inputtext {
          width: 100%;
        }

        .datatable-crud-demo .table-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .datatable-crud-demo .p-button-help {
          margin-left: auto;
        }

        .datatable-crud-demo .actions {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 0.5rem;
        }

        .datatable-crud-demo .p-button-rounded {
          margin: 0 0.5rem;
        }

        .confirmation-content {
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          padding: 1rem;
        }

        .confirmation-content i {
          margin-right: 1rem;
        }
      `}</style>
    </div>
  );
}

export default Client;