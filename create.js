document
  .getElementById("createPostForm")
  .addEventListener("submit", createPost);

const postTitleEl = document.getElementById("postTitle");
const postBodyEl = document.getElementById("postBody");
const statusEl = document.getElementById("status");

[postTitleEl, postBodyEl].forEach((el) => {
  el.addEventListener("input", () => {
    statusEl.style.display = "none";
    statusEl.classList.remove("success", "error");
    statusEl.innerText = "";
  });
});

function createPost(e) {
  e.preventDefault();

  const postTitle = postTitleEl.value.trim();
  const postBody = postBodyEl.value.trim();

  statusEl.classList.remove("success", "error");

  if (!postTitle || !postBody) {
    statusEl.style.display = "block";
    statusEl.innerText = "Please fill in both title and body.";
    statusEl.classList.add("error");
    return;
  }

  fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      title: postTitle,
      body: postBody,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())

    .then((json) => {
      statusEl.style.display = "block";
      statusEl.innerText = "Post created successfully!";
      statusEl.classList.add("success");
    })
    .catch(() => {
      statusEl.style.display = "block";
      statusEl.innerText = "Error creating post.";
      statusEl.classList.add("error");
    });
}
