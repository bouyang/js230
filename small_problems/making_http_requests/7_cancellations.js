document.addEventListener('DOMContentLoaded', () => {
  function cancelSchedule(scheduleId) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `./api/schedules/${scheduleId}`);
    xhr.send();
    xhr.addEventListener('load', event => {
      if (xhr.status === 204) {
        console.log('deleted');
      } else {
        console.log('failed');
      }
    })
  }

  function cancelBooking(bookingId) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `./api/bookings/${bookingId}`);
    xhr.send();

    xhr.addEventListener('load', event => {
      if (xhr.status === 204) {
        console.log('canceled');
      } else {
        console.log('failed');
      }
    })
  }
});