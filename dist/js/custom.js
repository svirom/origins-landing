document.addEventListener('DOMContentLoaded', function() {

  // mobile menu
  let slideUp = function(target) {
    target.classList.add('collapsing');
    
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight; // to make animation workable
    target.style.height = 0;
    
    window.setTimeout(function() {
      target.style.removeProperty('height');
      target.classList.remove('collapsing');
      target.classList.remove('show');
    }, 600);
  }
  
  let slideDown = function(target) {
    target.classList.add('collapsing');
    target.classList.add('show');
    
    let height = target.offsetHeight;
    target.style.height = 0;    
    target.offsetHeight; // to make animation workable
    target.style.height = height + 'px';
    
    window.setTimeout(function() {
      target.style.removeProperty('height');
      target.classList.remove('collapsing');
    }, 600);
  }

  document.getElementById('btn-mobile').addEventListener('click', function() {
    if (this.className.split(' ').indexOf('active') !== -1) { //workable for ie11
      slideUp(document.getElementById('nav-list'));
    } else {
      slideDown(document.getElementById('nav-list'));
    }
    // if (this.classList.contains('active')) {
    //   slideUp(document.getElementById('nav-list'));
    // } else {
    //   slideDown(document.getElementById('nav-list'));
    // }
    this.classList.toggle('active');
  });

})