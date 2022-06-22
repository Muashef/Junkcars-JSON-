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
                // console.log(post)
                feedbackHolder += `
                    <div class="col-lg-4 mb-3">
                     <div class="card h-100">
                       <div class="card-body">
                        <p>${post.id}</p>
                        <h6 id="feedback-title" class="card-subtitle mb-2 text-muted">${post.title}</h6>
                        <p class="card-text">${post.body}</p>
                        <button type="button" class="btn btn-secondary me-3">View</button>
                        <button type="button" class="btn btn-danger me-3">Update</button>
                        <button type="button" class="btn btn-success">Delete</button>
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
                        <button type="button" class="btn btn-secondary me-3">View</button>
                        <button type="button" class="btn btn-danger me-3">Update</button>
                        <button type="button" class="btn btn-success">Delete</button>
                       </div>
                     </div>
                   </div>
                ` 
            });
            feedbackWrapper. innerHTML = feedbackHolder;        
    })
}