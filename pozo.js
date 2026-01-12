async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const width = urlParams.get('width');
  const height = urlParams.get('height');

  if (width) document.documentElement.setAttribute('data-width', width);
  if (height) document.documentElement.setAttribute('data-height', height);

  getUser();
}

init();


async function getUser() {
  try {
    const response = await axios.get('https://apitinka.alacoohperu.pe/api/tinka');
    const text_monto = response.data.data.premios.text;
    console.log(text_monto)
    localStorage.setItem('montoFinal', JSON.stringify(text_monto));
    const montoFinal = JSON.parse(localStorage.getItem('montoFinal'));
    innerHTML(montoFinal);
  } catch (error) {
    const montoFinal = JSON.parse(localStorage.getItem('montoFinal'));
    innerHTML(montoFinal);
  }
}

function innerHTML(text_monto) {
  const pozoMid = document.getElementById('monto');
  const resto = document.getElementById('resto');
  const millonesId = document.getElementById('millones');

  const mm = text_monto.split("'"); // ["15", "341,500"]
  const parteEntera = mm[0];
  const parteDecimal = mm[1]; // puede ser undefined si no hay apóstrofo

  let monto = parteEntera;

  if (parteDecimal) {
    monto += '.' + parteDecimal.substring(0, 1); // dos primeros dígitos
    const width = document.documentElement.getAttribute('data-width');
    if (!width || (width !== '800' && width !== '768' && width !== '720')) {
      pozoMid.style.left = '27.5%';
    }
  }

  pozoMid.innerHTML = monto;
  // resto.innerHTML = parteDecimal.substring(1);
  // millonesId.innerHTML = " MILLONES";

  // Clase condicional según primer dígito del decimal
  pozoMid.className = (parteDecimal && parteDecimal.charAt(0) === '0')
    ? 'pozoUnidad'
    : 'pozo2digitos';
}
