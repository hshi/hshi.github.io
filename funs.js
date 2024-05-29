//Click hamburger to show navigation
//Click naviagtion is stack hamburger
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.h-nav');
    const navLinks = document.querySelectorAll('.h-nav .h-a');

    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });
});


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