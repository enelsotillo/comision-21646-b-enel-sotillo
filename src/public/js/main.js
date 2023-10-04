

const contenedor = document.getElementById('container-row');
const btnCrearForum = document.getElementById('btn-new-forum');
const myModal = new bootstrap.Modal(document.getElementById('myModal'));
const btnSave = document.getElementById('btn-save');
const form = document.getElementById('formulario');

let html = ''
let option = ''
let idForm = ''

const inputTitle = document.getElementById('inputTitle')
const inputDescription = document.getElementById('inputDescription')
const inputPoster = document.getElementById('inputPoster')

btnCrearForum.addEventListener('click', () => {
    option = "new"
    btnSave.textContent = "new"
    inputTitle.value = ""
    inputDescription.value = ""
    inputPoster.value = ""
    myModal.show()
})

document.addEventListener('click', (event) => {
    if (event.target.matches('#btn-delete')) {
        const article = event.target.closest('.col-4')
        const idArticle = article.dataset.id;
        console.log(idArticle);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/api/tasks/${idArticle}`, {
                    method: 'DELETE'

                }).then(res => {
                    if (res.ok) {
                        article.remove()
                    }
                }).catch(err => {
                    console.log(err)
                })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }
})

/*
document.addEventListener('click', (event) =>{
if(event.target.matches('#btn-delete')){
 const article = event.target.closest('.col-4')
 const idArticle = article.dataset.id
 console.log(idArticle);

 fetch(`http://localhost:3000/api/tasks/${idArticle}`,{
     method: 'DELETE'

 }). then(res => {
     if(res.ok){
         article.remove()
     }
 }).catch(err =>{
      console.log(err)
 })

}
})
//console.log(contenedor);
*/

document.addEventListener('click', (event) => {
    if (event.target.matches('#btn-edif')) {
        const article = event.target.closest('.col-4')

        const idArticle = article.dataset.id
        const posterEdif = article.children[0].children[0].src;
        const titleEdif = article.children[0].children[1].children[0].textContent;
        const descrptionEdif = article.children[0].children[1].children[1].textContent;

        idForm = idArticle;
        inputTitle.value = titleEdif;
        inputDescription.value = descrptionEdif;
        inputPoster.value = posterEdif;
        option = "edif"
        btnSave.textContent = "Edit"
        myModal.show();
    }
})

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (option === "new") {
        const taskNew = {
            title: inputTitle.value,
            description: inputDescription.value,
            poster: inputPoster.value
        }
        fetch('http://localhost:3000/api/tasks', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskNew)
        }).then(res => {
            if (res.ok) {
                alert("Task created successfully");
                myModal.hide();
                location.reload();
            }
        });
    }
    if (option === "edif") {
        const taskNew = {
            title: inputTitle.value,
            description: inputDescription.value,
            poster: inputPoster.value
        }
        fetch(`http://localhost:3000/api/tasks/${idForm}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskNew)

        }).then(res => {
            if (res.ok) {
                alert('Task edited successfully')
                myModal.hide();
                location.reload();
            }
        })
    }

})
/*
fetch('http://localhost:3000/api/tasks')
    .then(res => res.json())
    .then(data => {
        data.forEach(task => {
            html += `
         <article class="col-4 d-flex justify-content-center mb-3" data-id="${task.id}">
                    <div class="card" style="width: 18rem;">
                        <img class="imgPoster" src="${task.poster}"
                            class="card-img-top" alt="nueva foto">
                        <div class="card-body">
                            <h5 class="card-title">${task.title}</h5>
                            <p class="card-text">${task.description}</p>
                            <a href="#" class="btn btn-primary" id="btn-edif">Edif</a>
                            <a href="#" class="btn btn-danger" id="btn-delete">Delete</a>
                        </div>
                    </div>
                </article>
         `
            contenedor.innerHTML = html;
        });
    })
*/