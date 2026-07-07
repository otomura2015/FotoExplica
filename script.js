let posts = JSON.parse(localStorage.getItem("posts")) || [];

mostrar();

function postar(){

    let titulo = document.getElementById("titulo").value;
    let descricao = document.getElementById("descricao").value;
    let arquivo = document.getElementById("imagem").files[0];

    if(!titulo || !descricao || !arquivo){
        alert("Preencha tudo.");
        return;
    }

    let leitor = new FileReader();

    leitor.onload = function(){

        posts.push({
            titulo:titulo,
            descricao:descricao,
            imagem:leitor.result
        });

        localStorage.setItem("posts", JSON.stringify(posts));

        mostrar();

        document.getElementById("titulo").value="";
        document.getElementById("descricao").value="";
        document.getElementById("imagem").value="";
    }

    leitor.readAsDataURL(arquivo);

}

function mostrar(){

    let div=document.getElementById("posts");

    div.innerHTML="";

    posts.reverse().forEach(post=>{

        div.innerHTML+=`
        <div class="post">
            <h2>${post.titulo}</h2>
            <img src="${post.imagem}">
            <p>${post.descricao}</p>
        </div>
        `;

    });

    posts.reverse();

}
