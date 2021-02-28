const input = document.querySelector('.input_text');
const main = document.querySelector('#name');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');
const clouds = document.querySelector('.clouds');
const button= document.querySelector('.submit');


button.addEventListener('click', function(){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=fe507b51b304484cd7d89990f5339cbf')
.then(response => response.json())
.then(data => {
  const tempValue = data['main']['temp'];
  const nameValue = data['name'];
  const descValue = data['weather'][0]['description'];

  main.innerHTML = nameValue;
  desc.innerHTML = "Description - "+descValue;
  temp.innerHTML = "Temp - "+tempValue;
  input.value ="";

})

.catch(err => alert("Wrong city name!"));
})