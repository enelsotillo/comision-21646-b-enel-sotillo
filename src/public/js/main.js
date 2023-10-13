//Modulo mas importante del proyecto
//capta los registro o datos contenedores y formulario
const contenedor = document.getElementById('container-row');
const btnCrearForum = document.getElementById('btn-new-forum');
const myModal = new bootstrap.Modal(document.getElementById('myModal'));
const btnSave = document.getElementById('btn-save');
const form = document.getElementById('formulario');

//variables globales
let html = ''
let option = ''
let idForm = ''

//capta los registros del formulario
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

//funcion para eliminar los registros del foro
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

//funciona capta los registro del formulario para actualizar
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

//funcion que crea un nuevo foro
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

    //funciona que actualiza un foro y guarda los cambios
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
