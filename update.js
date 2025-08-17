
// Get the query parameters from the URL (`?id=1`)
const params = new URLSearchParams(window.location.search);
// Extract the value of the 'id' parameter from the URL.
const postId = params.get('id');
console.log(params, postId);

 //DOM elements
const editTitle = document.getElementById('editTitle');
const editBody = document.getElementById('editBody');
const updateStatus = document.getElementById('updateStatus');
const postIdInput = document.getElementById('postId');


  // 2. Fetch existing post data
  fetch(`${URL}/${postId}`)
    .then(res => res.json())
    .then(post => {
      postIdInput.value = post.id;
      editTitle.value = post.title;
      editBody.value = post.body;
    })
    .catch(err => {
      console.error(err);
      updateStatus.innerText = 'Error loading post.';
      updateStatus.style.color = 'red';
    });


// 3. Handle form submission to update the post
document.getElementById('updatePostForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const updatedTitle = editTitle.value.trim();
  const updatedBody = editBody.value.trim();

  // Simple validation
  if (!updatedTitle || !updatedBody) {
    updateStatus.innerText = 'Please fill in both title and body.';
    updateStatus.style.color = 'red';
    return;
  }

  // PUT request to update the post
  fetch(`${URL}/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      id: postId,
      title: updatedTitle,
      body: updatedBody,
      userId: 1,
    }),
  })
    .then(res => res.json())
    .then(json => {
      updateStatus.innerText = `Post #${json.id} updated successfully!`;
      updateStatus.style.color = 'green';

       //const card = document.querySelector(`[data-post-id="${postId}"]`);
      


      document.getElementById('updatedPostTitle').innerText = `Post Title: ${json.title}`;
      document.getElementById('updatedPostBody').innerText  = `Post Body: ${json.body}`; 
     

    })
    .catch(err => {
      console.error(err);
      updateStatus.innerText = 'Error updating post.';
      updateStatus.style.color = 'red';
    });
});