import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminTours = () => {
  const [vols, setVols] = useState([]);
  const [newVol, setNewVol] = useState({
    volNumber: '',
    datedepart: new Date(),
    dateretour: new Date(),
    classe: '',
    destination: {
      aller: '',
      arriver: '',
    },
  });

  useEffect(() => {
    // Fetch vols data from your backend
    axios.get('http://localhost:3006/vols')
      .then(response => {
        console.log(response.data); // Log the API response
        setVols(response.data);
      })
      .catch(error => console.error('Error fetching vols:', error));
  }, [])

  const addVol = async () => {
    try {
      // Add new vol to the backend
      const response = await axios.post('http://localhost:3006/vols', newVol);
      setVols([...vols, response.data]);
      setNewVol({
        volNumber: '',
        datedepart: new Date(),
        dateretour: new Date(),
        classe: '',
        destination: {
          aller: '',
          arriver: '',
        },
      });
    } catch (error) {
      console.error('Error adding vol:', error);
    }
  };
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({
    cin: '',
    volNumber: '',
  });

  useEffect(() => {
    // Fetch reservations data from your backend
    axios.get('http://localhost:3006/reservations')
      .then(response => setReservations(response.data))
      .catch(error => console.error('Error fetching reservations:', error));
  }, []);

  const addReservation = async () => {
    try {
      // Add new reservation to the backend
      await axios.post('http://localhost:3006/reservations', newReservation);
      // Refresh the reservations list
      const updatedReservations = await axios.get('http://localhost:3006/reservations');
      setReservations(updatedReservations.data);
      // Reset the form
      setNewReservation({
        cin: '',
        volNumber: '',
      });
    } catch (error) {
      console.error('Error adding reservation:', error);
    }
  };

  const deleteReservation = async (reservationNumber) => {
    try {
      // Delete reservation from the backend
      await axios.delete(`http://localhost:3006/reservations/${reservationNumber}`);
      // Refresh the reservations list
      const updatedReservations = await axios.get('http://localhost:3006/reservations');
      setReservations(updatedReservations.data);
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };
  return (
    <div>
      <h2>Admin Tours - Manage Vols</h2>

      {/* Form to add a new vol */}
      <form>
        <label>Vol Number: <input type="text" value={newVol.volNumber} onChange={(e) => setNewVol({ ...newVol, volNumber: e.target.value })} /></label>
        <label>Date Depart: <input type="date" value={newVol.datedepart} onChange={(e) => setNewVol({ ...newVol, datedepart: e.target.value })} /></label>
        <label>Date Retour: <input type="date" value={newVol.dateretour} onChange={(e) => setNewVol({ ...newVol, dateretour: e.target.value })} /></label>
        <label>Classe: <input type="text" value={newVol.classe} onChange={(e) => setNewVol({ ...newVol, classe: e.target.value })} /></label>
        <label>Aller: <input type="text" value={newVol.destination.aller} onChange={(e) => setNewVol({ ...newVol, destination: { ...newVol.destination, aller: e.target.value } })} /></label>
        <label>Arriver: <input type="text" value={newVol.destination.arriver} onChange={(e) => setNewVol({ ...newVol, destination: { ...newVol.destination, arriver: e.target.value } })} /></label>
        <button type="button" onClick={addVol}>Add Vol</button>
      </form>

      {/* Display existing vols */}
      <ul>
        {Array.isArray(vols) && vols.length > 0 ? (
          vols.map((vol) => (
            <li key={vol._id}>
              <p>Vol Number: {vol.volNumber}</p>
              <p>Date Depart: {vol.datedepart}</p>
              <p>Date Retour: {vol.dateretour}</p>
              <p>Classe: {vol.classe}</p>
              <p>Aller: {vol.destination.aller}</p>
              <p>Arriver: {vol.destination.arriver}</p>
            </li>
          ))
        ) : (
          <p>No vols available</p>
        )}
      </ul>
      <div>
        <h2>Manage Reservations</h2>
         {/* Form to add a new reservation */}
      <form>
        <label>CIN: <input type="text" value={newReservation.cin} onChange={(e) => setNewReservation({ ...newReservation, cin: e.target.value })} /></label>
        <label>Vol Number: <input type="text" value={newReservation.volNumber} onChange={(e) => setNewReservation({ ...newReservation, volNumber: e.target.value })} /></label>
        <button type="button" onClick={addReservation}>Add Reservation</button>
      </form>

      {/* Display existing reservations */}
      <ul>
        {Array.isArray(reservations) && reservations.length > 0 ? (
          reservations.map((reservation) => (
            <li key={reservation.reservationNumber}>
              <p>CIN: {reservation.cin}</p>
              <p>Vol Number: {reservation.volNumber}</p>
              <button type="button" onClick={() => deleteReservation(reservation.reservationNumber)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No reservations available</p>
        )}
      </ul>
      </div>
    </div>

  );
};

export default AdminTours;
