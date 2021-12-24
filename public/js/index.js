import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { findLocation } from './home';
import { signitup } from './signup';
import { bookRest } from './stripe';
// import { showAlert } from './alerts';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const homeForm = document.querySelector('.form--home');
const formbtn=document.querySelector('.form--signup');
const bookBtn = document.getElementById('book-rest');

// DELEGATION
if (homeForm){
  homeForm.addEventListener('submit', e => {
      e.preventDefault();
      const Search = document.getElementById('Search').value;
      // console.log(Search);
      findLocation(Search);
  });
}

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if(formbtn){
  formbtn.addEventListener('submit',e=>{
      e.preventDefault();
      const name=document.getElementById('name').value;
      const email=document.getElementById('email').value;
      const password=document.getElementById('password').value;
      const passwordConfirm=document.getElementById('passwordConfirm').value;

      signitup(name,email,password,passwordConfirm);
  })
}

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    // console.log(form);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if(bookBtn){
  bookBtn.addEventListener('click', e=>{
    const restid = bookBtn.dataset.restid;
    // console.log('Clicked');
    // console.log(restid);
    e.target.textContent = 'Processing...';
    bookRest(restid);
  });
}