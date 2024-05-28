//Show Scroll Top Button
document.addEventListener('DOMContentLoaded', function() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 0) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  //If we do not have his function, scrollTopBtn still work.
  //The scrollTopBtn is a link to "#".
  scrollTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});