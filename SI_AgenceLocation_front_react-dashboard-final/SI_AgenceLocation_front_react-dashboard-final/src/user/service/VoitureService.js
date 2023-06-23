import axios from 'axios'

export class VoitureService {

    getVoitures() {
        return axios.get('http://localhost:8080/voitures/afficher')
            .then(res => res.data);
    }

    getGammes() {
        return axios.get('http://localhost:8080/gammes/afficher')
            .then(res => res.data);
    }

    getGroupes() {
        return axios.get('http://localhost:8080/groupes/afficher')
            .then(res => res.data);
    }

    deleteVoiture(idVoiture) {
        return axios.delete(`http://localhost:8080/voitures/delete/${idVoiture}`)
          .then(res => res.data);
      }

      addVoiture(voiture) {
        return axios.post('http://localhost:8080/voitures/create', voiture)
        .then(res => res.data);
      }

      createGamme = (gamme) => {
        return axios.post('http://localhost:8080/gammes/create', gamme)
          .then(res => res.data);
      }

      createGroupe = (groupe) => {
        return axios.post('http://localhost:8080/groupes/create', groupe)
          .then(res => res.data);
      }
      
      addVoiture(voiture) {
        return axios.post('http://localhost:8080/voitures/create', voiture)
        .then(res => res.data);
      }

      putVoiture(voiture) {
        const { idVoiture } = voiture;
        return axios.put(`http://localhost:8080/voitures/modifier/${idVoiture}`, voiture)
            .then(res => res.data);
    }
}