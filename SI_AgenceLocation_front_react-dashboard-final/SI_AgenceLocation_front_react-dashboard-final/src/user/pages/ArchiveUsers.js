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
const Archive = () => {

    const [utilisateurs, setUtilisateurs] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const Utilisateurservice = new UtilisateurService();
        Utilisateurservice.getUtilisateurs().then(data => setUtilisateurs(data.filter(u => u.isDeleted === 1)));
    }, []);

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                   
                    <Link to="/utilisateur">
                        <Button label="Go Back" icon="pi pi-angle-double-left" className="p-button-secondary ml-2"  />
                    </Link>                </div>

            </React.Fragment>
        )
    }


    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nom</span>
                {rowData.name}
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

    const roleBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Role</span>
                {rowData.role}
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

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Liste des Utilisateurs archivés</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
            </span>
        </div>
    );
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-sync" className="p-button-rounded p-button-warning mr-2" />
            </div>
        );
    }

        return (
            <div className="grid crud-demo">
                <div className="col-12">
                    <div className="card">
                        <Toast ref={toast} />
                        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                        <DataTable
                            ref={dt}
                            value={utilisateurs}
                            dataKey="id"
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 25]}
                            className="datatable-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} utilisateurs"
                            header={header}
                            responsiveLayout="scroll"
                        >
                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                            <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                            <Column field="prenom" header="Prenom" sortable body={prenomBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                            <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                            <Column field="role" header="Role" sortable body={roleBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                            <Column field="username" header="Username" sortable body={usernameBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                            <Column body={actionBodyTemplate}></Column>

                        </DataTable>
                    </div>
                </div>
            </div>
        )
 
}

export default Archive;




