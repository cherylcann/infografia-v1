let card = document.querySelector('.card');
let icon = document.querySelector('.fa-user')
let background = document.querySelectorAll(".crd");

card.addEventListener('click', function(){
    document.querySelector('.pagina-2').scrollIntoView({ behavior: 'smooth' });
})

card.addEventListener('mouseenter', function () {
  icon.classList.add('fa-bounce');

  background.forEach((e) => {
    console.log(e.style.filter)
    e.style.filter = "grayscale(0%) blur(0px)"
  });
});

card.addEventListener('mouseleave', function () {
  icon.classList.remove('fa-bounce');

  background.forEach((e) => {
    e.style.filter = "grayscale(90%) blur(4px)"
  });
});



let card2 = document.querySelector('.card2');
let icon2 = document.querySelector('.fa-cog');
let background2 = document.querySelector(".card2-background");

card2.addEventListener('click', function(){
    document.querySelector('.pagina-3').scrollIntoView({ behavior: 'smooth' });
})

card2.addEventListener('mouseenter', function () {
  icon2.classList.add('fa-spin');

  background2.style.filter = 'blur(0px) grayscale(0%)'

});

card2.addEventListener('mouseleave', function () {
  icon2.classList.remove('fa-spin');


  background2.style.filter = 'blur(8px) grayscale(0%)'
});
