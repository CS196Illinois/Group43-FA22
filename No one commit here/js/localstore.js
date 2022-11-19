function webset() {
  'use strict';
  localStorage.setItem('key', JSON.stringify({id:5, name:'notgood'}));
  //sessionStorage.removeItem('key');
  //console.log(sessionStorage.getItem('key'));
  //document.write(localStorage.getItem('key'));
  //document.write(JSON.parse(localStorage.getItem('key'))); //.id .name
  //localStorage.setItem('key', 'value');
  //console.log(localStorage.getItem('key'));
}

function webstore() {
  document.write(localStorage.getItem('key'));
}

function webclear() {
  localStorage.clear()
}