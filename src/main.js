import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIkw3ED6Ow7LyHhls-Rpjm-vNsQJq99eA",
  authDomain: "fit5032-ad9a9.firebaseapp.com",
  projectId: "fit5032-ad9a9",
  storageBucket: "fit5032-ad9a9.firebasestorage.app",
  messagingSenderId: "476518862976",
  appId: "1:476518862976:web:6c4ea367b9cf11c710d665",
  measurementId: "G-F9PQMXKCV6"
};
initializeApp(firebaseConfig)

createApp(App)
  .use(router)
  .use(PrimeVue, { theme: { preset: Aura } })
  .mount('#app')
