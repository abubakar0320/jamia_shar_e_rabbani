fetch('http://localhost:5000/api/admin/admission-requirements?t=' + Date.now())
  .then(res => res.text())
  .then(text => console.log(text.substring(0, 200)))
  .catch(err => console.error(err));
