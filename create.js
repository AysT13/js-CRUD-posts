
document
  .getElementById('createPostForm')
  .addEventListener('submit', createPost);

function createPost(e) {
  e.preventDefault();

  const postTitleEl = document.getElementById('postTitle');
  const postBodyEl = document.getElementById('postBody');
  const status  = document.getElementById('status');

  const postTitle = postTitleEl.value.trim();
  const postBody = postBodyEl.value.trim();


   if (!postTitle || !postBody) {
    status.innerText = 'Please fill in both title and body.';
   status.style.color = 'red';
    return;
  }

  // TODO: add input validation for  both inputs

  fetch(URL, {
    method: 'POST',
    body: JSON.stringify({
      title: postTitle,
      body: postBody,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) =>  response.json())
    .then((json) => {
      // TODO: Show confirmation to the user on the screen that the post was created and the content of the post.
      console.log(json);

      document.getElementById('status').innerText = 'Post is created successfully!';
       document.getElementById('status').style.color = 'green';


      document.getElementById('newPostTitle').innerText = `Post Title: ${json.title}`;
      document.getElementById('newPostBody').innerText  = `Post Body: ${json.body}`; 

      postTitleEl.value='';
      postBodyEl.value='';

       
      });
}
