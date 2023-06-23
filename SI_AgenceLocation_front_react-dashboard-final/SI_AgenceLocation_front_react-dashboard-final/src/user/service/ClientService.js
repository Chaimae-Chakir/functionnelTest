import axios from 'axios'

export class ClientService {

    getClients() {
        return axios.get('http://localhost:8080/clients/afficher')
            .then(res => res.data);
    }

    deleteClient(idClient) {
        return axios.delete(`http://localhost:8080/clients/supprimer/${idClient}`)
          .then(res => res.data);
      }

      addClient(client) {
        return axios.post('http://localhost:8080/clients/create', client)
        .then(res => res.data);
      }

      putClient(client) {
        const { idClient } = client;
        return axios.put(`http://localhost:8080/clients/modifier/${idClient}`, client)
            .then(res => res.data);
    }
}