// js/firebase.js
// Inicializa Firebase y exporta la base de datos

const firebaseConfig = {
  apiKey: "AIzaSyAsbcsyB4h_AdMI_DZnvdql5CqhdzCNdH4",
  authDomain: "adivina-numero-ranking.firebaseapp.com",
  databaseURL: "https://adivina-numero-ranking-default-rtdb.firebaseio.com",
  projectId: "adivina-numero-ranking",
  storageBucket: "adivina-numero-ranking.appspot.com",
  messagingSenderId: "574261292288",
  appId: "1:574261292288:web:6d6673c104e0e2aa0857e5"
};

// Arranca Firebase
firebase.initializeApp(firebaseConfig);

// Exportamos `db` para usar en otros módulos
export const db = firebase.database();
