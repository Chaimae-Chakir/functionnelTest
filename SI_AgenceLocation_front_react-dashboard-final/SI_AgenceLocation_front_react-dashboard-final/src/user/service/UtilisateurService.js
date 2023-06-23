import axios from 'axios'

export class UtilisateurService {

    getUtilisateurs() {
        return axios.get('http://localhost:8080/api/users/')
            .then(res => res.data);
    }

    deleteUtilisateur(userId) {
        return axios.delete(`http://localhost:8080/api/users/supprimer/${userId}`)
          .then(res => res.data);
      }

      addUtilisateur(utilisateur) {
        return axios.post('http://localhost:8080/api/users/create', utilisateur)
        .then(res => res.data);
      }

      putUtilisateur(utilisateur) {
        const { userId } = utilisateur;
        return axios.put(`http://localhost:8080/api/users/modifier/${userId}`, utilisateur)
            .then(res => res.data);
    }
}