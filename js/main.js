// const { ConstantTypes } = require("@vue/compiler-core");

let feedbackWrapper = document.querySelector('#feedback-holder');
let postForm = document.querySelector('#post-form')
let title = document.querySelector('#title')
let body = document.querySelector('#body')

let feedbackBox = [];

function getPosts() {
    let gottenPost = fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            console.log(feedbackBox)
            //  console.log(data);
            feedbackBox = data
            let feedbackHolder = '';
            feedbackBox.forEach(post =>{
                feedbackHolder += `
                    <div  class="col-lg-4 mb-3">
                     <div class="card h-100">
                       <div class="card-body">
                        <p>${post.id}</p>
                        <h6 id="feedback-title" class="card-subtitle mb-2 text-muted">${post.title}</h6>
                        <p class="card-text">${post.body}</p>
                        <button type="button" class="btn btn-secondary me-3" id="view-btn" onclick="openSingle(${post.id})">View</button>
                        <button type="button" class="btn btn-danger me-3" onclick="updatePost(${post.id})">Update</button>
                        <button type="button" class="btn btn-success" onclick="deletePost(${post.id})">Delete</button>
                       </div>
                     </div>
                   </div>
                ` 
            });
            feedbackWrapper. innerHTML = feedbackHolder;
        });

        
};

getPosts();

postForm.addEventListener('submit', createPost)

function createPost(e) {
    e.preventDefault();
    // console.log(title.value, body.value)
    fetch('https://jsonplaceholder.typicode.com/posts',{
        method:'POST',
        body:JSON.stringify({
            title: title.value,
            body: body.value,
            userId: 2
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data)=>{
        console.log(data)
        feedbackBox.push(data)
        console.log(feedbackBox)
        let feedbackHolder = '';
            feedbackBox.forEach(post =>{
                // console.log(post)
                feedbackHolder += `
                    <div class="col-lg-4 mb-3">
                     <div class="card h-100">
                       <div class="card-body">
                        <p>${post.id}</p>
                        <h6 id="feedback-title" class="card-subtitle mb-2 text-muted">${post.title}</h6>
                        <p class="card-text">${post.body}</p>
                        <button type="button" class="btn btn-secondary me-3" id="view-btn" onclick="openSingle(${post.id})">View</button>
                        <button type="button" class="btn btn-danger me-3" onclick="updatePost(${post.id})">Update</button>
                        <button type="button" class="btn btn-success" onclick="deletePost(${post.id})">Delete</button>
                       </div>
                     </div>
                   </div>
                ` 
            });
            feedbackWrapper. innerHTML = feedbackHolder;        
    })
}


function updatePost(id) {
    console.log(id)

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
    id: id,
    title: title.value,
    body: body.value,
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((data) => {
    
    console.log(data)
    let postTitles = document.querySelectorAll('.card-subtitle')
    let postBodies = document.querySelectorAll('.card-text')
    console.log(postTitles)
    postTitles.forEach((postTitle, index) =>{
        if(index + 1 === id) {
            if(data.title !== "") {
                postTitle.innerHTML = data.title
            }
        }
    })

    postBodies.forEach((postBody, index) =>{
        if(index + 1 === id) {
            if(data.body !== "") {
                postBody.innerHTML = data.body
            }
        }
    })
   });
}


function openSingle(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    localStorage.setItem('viewedPost', JSON.stringify(data))
    window.location.href = `single.html?id=${id}`

   });
}


function deletePost(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      // let postBox;
       feedbackBox = feedbackBox.filter(post => post.id !== id)
      console.log(feedbackBox)
      let feedbackHolder = '';
      feedbackBox.forEach(post =>{
          feedbackHolder += `
              <div  class="col-lg-4 mb-3">
               <div class="card h-100">
                 <div class="card-body">
                  <p>${post.id}</p>
                  <h6 id="feedback-title" class="card-subtitle mb-2 text-muted">${post.title}</h6>
                  <p class="card-text">${post.body}</p>
                  <button type="button" class="btn btn-secondary me-3" id="view-btn" onclick="openSingle(${post.id})">View</button>
                  <button type="button" class="btn btn-danger me-3" onclick="updatePost(${post.id})">Update</button>
                  <button type="button" class="btn btn-success" onclick="deletePost(${post.id})">Delete</button>
                 </div>
               </div>
             </div>
          ` 
      });
      feedbackWrapper. innerHTML = feedbackHolder;
  });
    // });

}

// deletePost()