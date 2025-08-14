document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  // Fields to display
  const fields = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email Address' },
    { key: 'mobilePhone', label: 'Mobile Phone' },
    { key: 'businessName', label: 'Business/Organization Name' },
    { key: 'timestamp', label: 'Submission Date/Time' }
  ];

  const dl = document.getElementById('formData');

  fields.forEach(field => {
    const value = params.get(field.key) || '(Not provided)';
    const dt = document.createElement('dt');
    dt.textContent = field.label;
    const dd = document.createElement('dd');
    dd.textContent = field.key === 'timestamp' ? new Date(value).toLocaleString() : value;

    dl.appendChild(dt);
    dl.appendChild(dd);
  });
});