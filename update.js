// Get the query parameters from the URL (`?id=1`)
const params = new URLSearchParams(window.location.search);
// Extract the value of the 'id' parameter from the URL.
const postId = params.get("id");


//DOM elements
const editTitle = document.getElementById("editTitle");
const editBody = document.getElementById("editBody");
const updateStatus = document.getElementById("updateStatus");
const postIdInput = document.getElementById("postId");

 [editTitle, editBody].forEach((el) => {
      el.addEventListener("input", () => {
        updateStatus.style.display = "none";
         updateStatus.classList.remove("success", "error");
    updateStatus.innerText = "";
      });
    });

// 2. Fetch existing post data
fetch(`${URL}/${postId}`)
  .then((res) => res.json())
  .then((post) => {
    postIdInput.value = post.id;
    editTitle.value = post.title;
    editBody.value = post.body;
  })
  .catch((err) => {
    console.error(err);
    updateStatus.style.display = "block";  
    updateStatus.innerText = "Error loading post.";
    updateStatus.classList.remove("success", "error");
    updateStatus.classList.add("error");
  });

// 3. Handle form submission to update the post
document
  .getElementById("updatePostForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const updatedTitle = editTitle.value.trim();
    const updatedBody = editBody.value.trim();

     updateStatus.classList.remove("success", "error");

    // Simple validation
    if (!updatedTitle || !updatedBody) {
      updateStatus.style.display = "block"; 
      updateStatus.innerText = "Please fill in both title and body.";
      updateStatus.classList.add("error");
      return;
    }

   

    // PUT request to update the post
    fetch(`${URL}/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id: postId,
        title: updatedTitle,
        body: updatedBody,
        userId: 1,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        updateStatus.style.display = "block";
        updateStatus.innerText = `Post #${json.id} updated successfully!`;
        updateStatus.classList.add("success");
      })
      .catch((err) => {
        console.error(err);
        updateStatus.style.display = "block";  
        updateStatus.innerText = "Error updating post.";
        updateStatus.classList.remove("success", "error");
        updateStatus.classList.add("error");
      });
  });
