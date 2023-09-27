const contenedor = document.getElementById('container-row');
const btnCrearForum = document.getElementById('btn-new-forum')
const myModal = new bootstrap.Modal(document.getElementById('myModal'))
const btnSave = document.getElementById('btn-save')

let html = ''
let option = ''

const inputTitle = document.getElementById('inputTitle')
const inputDescription = document.getElementById('inputDescription')
const inputPoster = document.getElementById('inputPoster')

btnCrearForum.addEventListener('click', () =>{
    option = "new"
    btnSave.textContent = "New" 
    inputTitle.value = ""
    inputDescription.value = ""
    inputPoster.value = ""
    myModal.show()
})

document.addEventListener('click', (event) =>{
    if(event.target.matches('#btn-delete')){
       const article = event.target.closest('.col-4')
       const idArticle = article.dataset.id
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
            fetch(`http://localhost:3000/api/tasks/${idArticle}`,{
           method: 'DELETE'
   
       }). then(res => {
           if(res.ok){
               article.remove()
           }
       }).catch(err =>{
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

document.addEventListener('click', (event) =>{
    if(event.target.matches('#btn-edif')){
       const article = event.target.closest('.col-4')
   
       const idArticle = article.dataset.id
       const posterEdif = article.children[0].children[0].src;
       const titleEdif = article.children[0].children[1].children[0].textContent;
       const descrptionEdif = article.children[0].children[1].children[1].textContent;
       
       inputTitle.value = titleEdif;
       console.log(inputTitle.value)
       inputDescription.value = descrptionEdif;
       inputPoster.value = posterEdif;
       option = "edif"
       btnSave.textContent = "Edit" 
       myModal.show();
 }
})
//console.log(contenedor);


fetch('http://localhost:3000/api/tasks')
    .then(res => res.json())
    .then(data => {
        data.forEach(task => {
            html += `
         <article class="col-4 d-flex justify-content-center mb-3" data-id="${task.id}">
                    <div class="card" style="width: 18rem;">
                        <img src="${task.poster}"
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
