// Menu filter (menu.html)
document.querySelectorAll('.chip').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var f = btn.dataset.filter;
    document.querySelectorAll('.chip').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b === btn));
    });
    document.querySelectorAll('.cat').forEach(function (c) {
      c.hidden = !(f === 'all' || c.dataset.cat === f);
    });
  });
});

// Booking form (contact.html)
var form = document.getElementById('book');
if (form) {
  var dateInput = document.getElementById('date');
  var t = new Date();
  t.setDate(t.getDate() + 1);
  var iso = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
  dateInput.min = iso;
  dateInput.value = iso;

  var err = document.getElementById('err');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var phone = form.elements.phone.value.trim();
    if (!name || !phone || !dateInput.value) {
      err.hidden = false;
      err.textContent = 'Add your name, phone number and date to continue.';
      return;
    }
    err.hidden = true;

    // TODO: send this data to your server or email service here.
    var booking = {
      name: name,
      phone: phone,
      date: dateInput.value,
      time: form.elements.time.value,
      guests: form.elements.guests.value,
      notes: form.elements.notes.value.trim()
    };
    console.log('Booking request:', booking);

    var when = new Date(booking.date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    document.getElementById('done-text').textContent =
      name + ', table for ' + booking.guests + ' on ' + when + ' at ' + booking.time + '.';
    form.hidden = true;
    document.getElementById('done').hidden = false;
  });
}