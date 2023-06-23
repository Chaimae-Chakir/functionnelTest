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
import { UtilisateurService } from '../service/UtilisateurService';
import { Link } from 'react-router-dom';
const Utilisateur = () => {
    let emptyUtilisateur = {
        userId: null,
        lastName: '',
        firstName: '',
        picture: null,
        tele: null,
        username: '',
        email: '',
        password: '',
        roles: 'ASSISTANT',
        statut:false
    };

    const [utilisateurs, setUtilisateurs] = useState(null);
    const [utilisateurDialog, setUtilisateurDialog] = useState(false);
    const [deleteUtilisateurDialog, setDeleteUtilisateurDialog] = useState(false);
    const [deleteUtilisateursDialog, setDeleteUtilisateursDialog] = useState(false);
    const [utilisateur, setUtilisateur] = useState(emptyUtilisateur);
    const [selectedUtilisateurs, setSelectedUtilisateurs] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const Utilisateurservice = new UtilisateurService();
        Utilisateurservice.getUtilisateurs().then(data => setUtilisateurs(data));
    }, []);


    const openNew = () => {
        setUtilisateur(emptyUtilisateur);
        setSubmitted(false);
        setUtilisateurDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setUtilisateurDialog(false);
    }

    const hideDeleteUtilisateurDialog = () => {
        setDeleteUtilisateurDialog(false);
    }

    const hideDeleteUtilisateursDialog = () => {
        setDeleteUtilisateursDialog(false);
    }

    const saveUtilisateur = () => {
        setSubmitted(true);
      
        // Check if email already exists
        const existingUtilisateur = utilisateurs.find((utilisateur) => utilisateur.email === utilisateur.email);
        if (existingUtilisateur && existingUtilisateur.email === utilisateur.email && !utilisateur.userId) {
          toast.current.show({ severity: "error", summary: "Error Message", detail: "Email already exists", life: 3000 });
          return;
        }
      
        if (utilisateur.lastName.trim() && utilisateur.firstName.trim() && utilisateur.email.trim()) {
          const utilisateurService = new UtilisateurService();
          if (utilisateur.userId) {
            utilisateurService.putUtilisateur(utilisateur)
              .then(response => {
                const index = findIndexById(utilisateur.userId);
                const _utilisateurs = [...utilisateurs];
                _utilisateurs[index] = response.data;
                setUtilisateurs(_utilisateurs);
                toast.current.show({ severity: "success", summary: "Successful", detail: "Utilisateur Updated", life: 3000 });
              })
              .catch(error => {
                console.log(error);
                toast.current.show({ severity: "error", summary: "Error Message", detail: "Failed to update utilisateur", life: 3000 });
              });
          } else {
            utilisateurService.addUtilisateur(utilisateur)
              .then(response => {
                const newUtilisateur = response.data;
                const _utilisateurs = [...utilisateurs];
                _utilisateurs.push(newUtilisateur);
                setUtilisateurs(_utilisateurs);
                toast.current.show({ severity: "success", summary: "Successful", detail: "Utilisateur Created", life: 3000 });
              })
              .catch(error => {
                console.log(error);
                toast.current.show({ severity: "error", summary: "Error Message", detail: "Failed to create utilisateur", life: 3000 });
              });
          }
          setUtilisateurDialog(false);
          setUtilisateur(emptyUtilisateur);
        }
      };
      

    const editUtilisateur = (utilisateur) => {
        setUtilisateur({ ...utilisateur });
        setUtilisateurDialog(true);
    }

    const confirmDeleteUtilisateur = (utilisateur) => {
        setUtilisateur(utilisateur);
        setDeleteUtilisateurDialog(true);
    }
    const deleteUtilisateur = () => {
        const Utilisateurservice = new UtilisateurService();

        Utilisateurservice.deleteUtilisateur(utilisateur.userId)
            .then(response => {
                let _utilisateurs = utilisateurs.filter(val => val.userId!== utilisateur.userId);
                setUtilisateurs(_utilisateurs);
                setDeleteUtilisateurDialog(false);
                setUtilisateur(emptyUtilisateur);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Utilisateur Deleted', life: 3000 });
            })
            .catch(error => {
                console.log(error);
            });
    }

   

  
    

    const findIndexById = (userId) => {
        let index = -1;
        for (let i = 0; i < utilisateurs.length; i++) {
            if (utilisateurs[i].userId=== userId) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let userId= '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            userId+= chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return userId;
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteUtilisateursDialog(true);
    }

    const deleteSelectedUtilisateurs = () => {
        let _utilisateurs = utilisateurs.filter(val => !selectedUtilisateurs.includes(val));
        setUtilisateurs(_utilisateurs);
        setDeleteUtilisateursDialog(false);
        setSelectedUtilisateurs(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Utilisateurs Deleted', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _utilisateur = { ...utilisateur };
        _utilisateur['category'] = e.value;
        setUtilisateur(_utilisateur);
    }

    const onInputChange = (e, lastName) => {
        const val = (e.target && e.target.value) || '';
        let _utilisateur = { ...utilisateur };
        _utilisateur[`${lastName}`] = val;

        setUtilisateur(_utilisateur);
    }

    



    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger mr-2" onClick={confirmDeleteSelected} disabled={!selectedUtilisateurs || !selectedUtilisateurs.length} />
                    <Link to="/archive-users">
                        <Button label="Archive Users" icon="pi pi-user-minus" className="p-button-secondary ml-2"  />
                    </Link>                </div>

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
                {rowData.lastName}
            </>
        );
    }

    const prenomBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Prenom</span>
                {rowData.firstName}
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


    const rolesBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">roles</span>
                {rowData.roles}
            </>
        );
    }

    const teleBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Téléphone</span>
                {rowData.tele}
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

 



    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editUtilisateur(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteUtilisateur(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Liste des Utilisateurs</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const utilisateurDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveUtilisateur} />
        </>
    );
    const deleteUtilisateurDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUtilisateurDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteUtilisateur} />
        </>
    );
    const deleteUtilisateursDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUtilisateursDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedUtilisateurs} />
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
                        value={utilisateurs}
                        selection={selectedUtilisateurs}
                        onSelectionChange={(e) => setSelectedUtilisateurs(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} utilisateurs"
                        globalFilter={globalFilter}
                        globalFilterFields={['lastName', 'firstName', 'email', 'username', 'roles']} // Add this line
                        emptyMessage={
                            <div style={{ textAlign: 'center', paddingTop: '2em' }}>
                                <img src={`assets/layout/images/logo.png`} alt="No results found" />
                                <p style={{ fontWeight: 'bold', marginTop: '1em' }}>
                                    Désolé, aucun résultat ne correspond à votre recherche…
                                </p>
                            </div>
                        }                          header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="lastName" header="Name" sortable body={nameBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column field="firstName" header="First Name" sortable body={prenomBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column field="roles" header="roles" sortable body={rolesBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column field="username" header="Username" sortable body={usernameBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>


                    <Dialog visible={utilisateurDialog} style={{ width: '450px' }} header="Utilisateur Details" modal className="p-fluid" footer={utilisateurDialogFooter} onHide={hideDialog}>
                        {utilisateur.picture && <img src={`assets/demo/images/product/${utilisateur.picture}`} alt={utilisateur.picture} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field">
                            <label htmlFor="lastName">Name</label>
                            <InputText id="lastName" value={utilisateur.lastName} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !utilisateur.lastName})} />
                            {submitted && !utilisateur.lastName&& <small className="p-invalid">Last Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="firstName">Prénom</label>
                            <InputText id="firstName" value={utilisateur.firstName} onChange={(e) => onInputChange(e, 'prenom')} required autoFocus className={classNames({ 'p-invalid': submitted && !utilisateur.firstName})} />
                            {submitted && !utilisateur.firstName&& <small className="p-invalid">First Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="tele">Téléphone</label>
                            <InputText id="tele" value={utilisateur.tele} onChange={(e) => onInputChange(e, 'tele')} required autoFocus className={classNames({ 'p-invalid': submitted && !utilisateur.tele })} />
                            {submitted && !utilisateur.tele && <small className="p-invalid">First Name is required.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <Password id="password" value={utilisateur.password} onChange={(e) => onInputChange(e, 'password')} required autoFocus className={classNames({ 'p-invalid': submitted && !utilisateur.password })} />
                            {submitted && !utilisateur.password && <small className="p-invalid">Password is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="roles">Email</label>
                            <InputText id="email" value={utilisateur.email} onChange={(e) => onInputChange(e, 'email')} required rows={3} cols={20} />
                            {submitted && !utilisateur.email && <small className="p-invalid">Email is required.</small>}

                        </div>
                        <div className="field">
                            <label htmlFor="username">Username</label>
                            <InputText id="username" value={utilisateur.username} onChange={(e) => onInputChange(e, 'username')} required autoFocus className={classNames({ 'p-invalid': submitted && !utilisateur.username })} />
                            {submitted && !utilisateur.username && <small className="p-invalid">Username is required.</small>}
                        </div>

                        <div className="field">
                            <label className="mb-3">roles</label>
                            <div className="formgrid grid">
                                <div className="field-select col-6">
                                    <select id="category" name="roles" onChange={onCategoryChange} value={utilisateur.roles} className="roles-select">
                                        <option value="ADMIN">Admin</option>
                                        <option value="ASSISTANT">Assistant</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                    </Dialog>

                    <Dialog visible={deleteUtilisateurDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUtilisateurDialogFooter} onHide={hideDeleteUtilisateurDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {utilisateur && <span>Are you sure you want to delete <b>{utilisateur.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUtilisateursDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUtilisateursDialogFooter} onHide={hideDeleteUtilisateursDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {utilisateur && <span>Are you sure you want to delete the selected utilisateurs?</span>}
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

export default React.memo(Utilisateur, comparisonFn);