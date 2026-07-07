import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
getFirestore,
collection,
addDoc,
getDocs
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


import {
getStorage,
ref,
uploadBytes,
getDownloadURL
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";



const firebaseConfig = {

apiKey:"COLOQUE_AQUI",

authDomain:"COLOQUE_AQUI",

projectId:"COLOQUE_AQUI",

storageBucket:"COLOQUE_AQUI",

messagingSenderId:"COLOQUE_AQUI",

appId:"COLOQUE_AQUI"

};



const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

const storage = getStorage(app);



window.postar = async function(){


let titulo =
document.getElementById("titulo").value;


let descricao =
document.getElementById("descricao").value;


let arquivo =
document.getElementById("imagem").files[0];



if(!arquivo){

alert("Escolha uma imagem");

return;

}



let caminho =
ref(storage,"imagens/"+arquivo.name);



await uploadBytes(caminho,arquivo);



let url =
await getDownloadURL(caminho);



await addDoc(collection(db,"posts"),{

titulo:titulo,

descricao:descricao,

imagem:url

});



alert("Post criado!");

mostrarPosts();


}



async function mostrarPosts(){


let area =
document.getElementById("posts");


area.innerHTML="";



let dados =
await getDocs(collection(db,"posts"));



dados.forEach((post)=>{


let p = post.data();



area.innerHTML += `

<div class="post">

<h2>${p.titulo}</h2>

<img src="${p.imagem}">

<p>${p.descricao}</p>

</div>

`;


});


}



mostrarPosts();
