window.onload = ()=>{
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){ //Si está logeado, mostraremos la opción loggedIn
            loggedIn.style.display = "block";
            loggedOut.style.display = "none";
            username.innerText = user.displayName;
        }else{ //Si NO está logeado, mostraremos la opción loggedOut
            loggedIn.style.display = "none";
            loggedOut.style.display = "block";
        }
        console.log("User > "+JSON.stringify(user));
    });

    firebase.database().ref("gifs")
      .limitToLast(3)
      .once("value")
      .then((gifs)=>{
          console.log("Gifs >"+JSON.stringify(gifs));
      })
      .catch((error)=>{
          console.log("database error >"+error);
      });

    firebase.database().ref("gifs")
      .limitToLast(2)
      .on("child_added", (newGif)=>{
         gifContainer.innerHTML +=`
         <p>${newGif.val().creatorName}</p>
         <img style="widht:200px" src="${newGif.val().gifURL}">
         </img>`;
      });
}

//Registro
function registerWithFirebase(){
    const emailValue = email.value;
    const passwordValue = password.value;

    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
        .then(()=>{
            console.log("Usuario creado con éxito");
        })
        .catch((error)=>{
            console.log("Error de firebase > Código > "+error.code); //error.code nos mostrará el código de error para informarnos qué pasó
            console.log("Error de firebase > Mensaje > "+error.message); //error.message nos mostrará el mensaje de firebase del mismo error
        });
}
//Login
function loginWithFirebase(){
    const emailValue = email.value;
    const passwordValue = password.value;

    firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
        .then(()=>{
            console.log("Usuario inició sesión con éxito");
        })
        .catch((error)=>{
            console.log("Error de firebase > Código > "+error.code); //error.code nos mostrará el código de error para informarnos qué pasó
            console.log("Error de firebase > Mensaje > "+error.message); //error.message nos mostrará el mensaje de firebase del mismo error
        });
}

function logoutWithFirebase(){
    firebase.auth().signOut()
        .then(()=>{
            console.log("Usuario finalizó su sesión");
        })
        .catch((error)=>{
            console.log("Error de firebase > Código > "+error.code); //error.code nos mostrará el código de error para informarnos qué pasó
            console.log("Error de firebase > Mensaje > "+error.message); //error.message nos mostrará el mensaje de firebase del mismo error
        });
}
//Login con Facebook
function facebookLoginWithFirebase(){
    const provider = new firebase.auth.FacebookAuthProvider(); // creamos un nuevo objeto 

    provider.setCustomParameters({ // le decimos que haga un login con facebook y enlace un popup
        'display' : 'popup'
    });

    firebase.auth().signInWithPopup(provider)
        .then(()=>{
            console.log("Login con facebook exitoso");
        })
        .catch((error)=>{
            console.log("Error de firebase > Código > "+error.code); //error.code nos mostrará el código de error para informarnos qué pasó
            console.log("Error de firebase > Mensaje > "+error.message); //error.message nos mostrará el mensaje de firebase del mismo error
        });                        
}

function sendGif(){
    const gifValue = gifArea.value;
    const newGifKey = firebase.database().ref().child("gifs").push().key;
    const currentUser = firebase.auth().currentUser;
    firebase.database().ref(`gifs/${newGifKey}`).set({
        gifURL : gifValue,
        creatorName : currentUser.displayName,
        creator : currentUser.uid
    });
}