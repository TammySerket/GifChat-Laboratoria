window.onload = ()=>{
    firebase.auth().onAuthStateChange((user)=>{
        if(user){
            loggedIn.style.display = "block";
            loggedOut.style.display = "none";
        }else{
            loggedIn.style.display = "none";
            loggedOut.style.display = "block";
        }
        console.log("User >"+JSON.stringify(user));
    });
}

function registerWithFirebase(){
  const emailValue = email.value;
  const passwordValue = password.value;

  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
  .then(()=>{
     console.log("usuario creado con exito")
  })
  .catch((error)=>{
     console.log("Error de Firebase > Código >"+error.code);
     console.log("Error de Firebase > Mensaje >"+error.message);
  })
}

function loginWithFirebase(){
    const emailValue = email.value;
    const passwordValue = password.value;

    firebase.auth().singInWithEmailAndPassword(emailValue, passwordValue)
    .then(()=>{
      console.log("Usuario inicio sesion con exito")
    })
    .catch((error)=>{
        console.log("Error de Firebase > Código >"+error.code);
        console.log("Error de Firebase > Mensaje >"+error.message);
    })
}

function logoutWithFirebase(){
    firebase.auth().singOut()
    .then(()=>{
        console.log("usuario finalizó sesion con exito")
    })
    .catch((error)=>{
        console.log("Error de Firebase > Código >"+error.code);
        console.log("Error de Firebase > Mensaje >"+error.message);
    })
}

function facebookLoginWithFirebase(){
    const provider = new firebase.auth.facbookAuthProvider();

    provider.setCustomParameters({
        "display" : "popup"
    })
    firebase.auth().signInWithPopup(provider)
    .then(()=>{
        console.log("Login con Facebook exitoso")
    })
    .catch((error)=>{
        console.log("Error de Firebase > Código >"+error.code);
        console.log("Error de Firebase > Mensaje >"+error.message);
    })
}