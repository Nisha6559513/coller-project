// NAV scroll
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  });

  // REVEAL on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // FORM submit
  function submitEnquiry() {
    const fname = document.getElementById('f-fname').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const collection = document.getElementById('f-collection').value;

    if (!fname || !email || !collection) {
      alert('Please fill in your name, email, and select a collection.');
      return;
    }

    const lname = document.getElementById('f-lname').value.trim();
    const phone = document.getElementById('f-phone').value.trim();
    const message = document.getElementById('f-message').value.trim();

    // Send email via Formspree with formatted data
    const formData = new FormData();
    formData.append('name', `${fname} ${lname}`);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('collection', collection);
    formData.append('message', message);

    fetch('https://formspree.io/f/xdayprya', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      document.getElementById('enquiry-form-wrap').style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error sending enquiry. Please try again.');
    });
  }
