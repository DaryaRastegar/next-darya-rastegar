import Cookies from 'js-cookie';

function setCookie(name, value) {
  const maxAge = 30 * 24 * 60 * 60;
  Cookies.set(name, value, {expires: maxAge, path:"/"});
}

function getCookie(name) {
  return Cookies.get(name);
}

function removeCookie() {
  console.log("clear cookie")
  
  Cookies.remove('token');
}

export { setCookie, getCookie, removeCookie };
