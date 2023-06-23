import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { UtilisateurService } from '../service/UtilisateurService';
import SessionService from '../service/SessionService';

const Utilisateur = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const toast = useRef(null);
  const [utilisateurDialog, setUtilisateurDialog] = useState(false);
  const [utilisateur, setUtilisateur] = useState({});
  const emptyUtilisateur = {};

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const fetchUtilisateurs = async () => {
    try {
      const sessionToken = SessionService.getToken();
      const response = await fetch('http://localhost:8081/api/users/', {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      });
      const data = await response.json();
      console.log(data);
      setUtilisateurs(data);
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Failed to fetch utilisateurs',
        life: 3000
      });
    }
  };

  const saveUtilisateur = async () => {
    setUtilisateurDialog(false);
    setUtilisateur(emptyUtilisateur);
  };

  const deleteUser = async (userId) => {
    try {
      const sessionToken = SessionService.getToken();
      const response = await fetch(`http://localhost:8081/api/accounts/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      });
      if (response.ok) {
        setUtilisateurs(utilisateurs.filter(user => user.userId !== userId));
        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'User deleted successfully',
          life: 3000
        });
      } else {
        toast.current.show({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Failed to delete user',
          life: 3000
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <DataTable value={utilisateurs}>
        <Column field="userId" header="User ID"></Column>
        <Column field="username" header="Username"></Column>
        <Column field="email" header="Email"></Column>
        <Column
          field="roles"
          header="Role"
          body={(rowData) => rowData.roles[0].libelle}
        ></Column>
        <Column header="Actions" body={(rowData) => (
          <div>
            <Button icon="pi pi-trash" className="p-button-danger" onClick={() => deleteUser(rowData.userId)} />
          </div>
        )}></Column>
      </DataTable>
    </div>
  );
};

export default Utilisateur;