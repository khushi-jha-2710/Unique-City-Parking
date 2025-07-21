document.addEventListener('DOMContentLoaded', () => {
  const city = 'New Delhi, India';
  const cityInfo = document.getElementById('city-info');
  const statusDiv = document.getElementById('status');
  const form = document.getElementById('reservation-form');

  cityInfo.textContent = `Current city: ${city}`;

  const map = L.map('map').setView([28.6139, 77.2090], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const marker = L.marker([28.6139, 77.2090]).addTo(map)
    .bindPopup('Parking Available Here')
    .openPopup();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const reservation = {
      name: form.name.value,
      vehicleNumber: form['vehicle-number'].value,
      date: form.date.value,
      time: form.time.value,
      city,
    };

    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));

    statusDiv.textContent = `✅ Reservation confirmed for ${reservation.date} at ${reservation.time}`;

    form.reset();
  });

  console.info('INFO: Reservation system initialized');
});
