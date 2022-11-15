const elReultBox=document.querySelector(".hero-box__result")
const elReultBoxPsot=document.querySelector(".hero-box__post")
const elReultBoxCommit=document.querySelector(".hero-box__commit")


const elTemplate=document.querySelector(".users-template").content
const fragment=new DocumentFragment()


function makeArray(array) {
    elReultBox.innerHTML=""

    array.forEach(item => {
        const clonTempalte=elTemplate.cloneNode(true)
        clonTempalte.querySelector(".list__item-title").textContent=item.name
        clonTempalte.querySelector(".list__item-id").textContent=item.id

        clonTempalte.querySelector(".list__item-name").textContent=item.usernameemail
        clonTempalte.querySelector(".list__item-email").href=`email: ${item.email}`
        clonTempalte.querySelector(".list__item-email").textContent=item.email
        clonTempalte.querySelector(".list__item-map").href=`https://www.google.com/maps/place/${item.address.geo.lat},${item.address.geo.lng}`
        clonTempalte.querySelector(".list__item-phone").href=`tel: ${item.phone}`
        clonTempalte.querySelector(".list__item-web").href=item.website
        clonTempalte.querySelector(".list__item-web").textContent=item.website
        clonTempalte.querySelector(".list__item-com-name").textContent=item.company.name
        clonTempalte.querySelector(".list__item-com-phere").textContent=item.company.catchPhrase
        clonTempalte.querySelector(".list__item-com-bs").textContent=item.company.bs
        clonTempalte.querySelector(".list-item-post-btn").dataset.com=item.id


        clonTempalte.querySelector(".list-item-post-btn").addEventListener("click",(evt)=>{
            elReultBoxCommit.innerHTML=""
            getpost(evt.target.dataset.com)

        })
        
        fragment.appendChild(clonTempalte)
    });

    elReultBox.appendChild(fragment)
}



function makePost(array) {
    elReultBoxPsot.innerHTML=""
    array.forEach(item => {
        elReultBoxPsot.innerHTML +=
        `
            <li class="bg-light p-3 rounded">
            <div class="d-flex gap-3 mb-2 align-items-center">
            <p class="h3 text-secondary">
            ${item.userId}
            </p>
            <strong>
            ${item.title}
            </strong>
            </div>
            <p>
            ${item.body}
            </p>

            <div class="d-flex justify-content-between align-items-center">
            <button class="list-item-comment-btn btn  btn-outline-warning" data-com=${item.id}> 
                Comment
            </button>
            <p>
            ${item.id}
            </p>
            </div>
            </li>
        
        `
    });
}
function makeCommit(array) {
    elReultBoxCommit.innerHTML=""
    array.forEach(item => {
        elReultBoxCommit.innerHTML +=
        `
            <li class="bg-light p-3 rounded">
            <div class="d-flex gap-3 mb-2 align-items-center">
            <p class="h3 text-secondary">
            ${item.postId}
            </p>
            <strong>
            ${item.name}
            </strong>
            </div>
            <a class="text-decoration-none mt-1 mb-1" href="email: ${item.email}">${item.email}</a>
            <p>
            ${item.body}
            </p>
            </li>
        
        `
    });
}

elReultBoxPsot.addEventListener("click",(evt)=>{
    if (evt.target.dataset.com) {
        getcommit(evt.target.dataset.com)
    }
})


async function getpost(id) {
    try {
        let res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        let data= await res.json()
        makePost(data)
    } catch (error) {
        console.log(error);
    }
}

async function getcommit(id) {
    try {
        let res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        let data= await res.json()
        makeCommit(data)
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}


async function getUserInfo() {
    try {
        let res = await fetch("https://jsonplaceholder.typicode.com/users")
        let data =await res.json()

        makeArray(data)
    } catch (error) {
        console.log(error);
    }
}



getUserInfo()