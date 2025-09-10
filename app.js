document.getElementById("fetchAllPosts").addEventListener("click", getPosts);

function getPosts() {
  fetch(URL)
    .then((response) => response.json())
    .then((json) => {
      json.map((post) => {
        const div = document.createElement("div");
        div.classList.add("post");
        div.setAttribute("data-post-id", post.id);

        const h3 = document.createElement("h3");
        h3.className = "post-title";
        h3.innerText = post.title;

        const p = document.createElement("p");
        p.className = "post-body";
        p.innerText = post.body;

        div.appendChild(h3);
        div.appendChild(p);

        const buttonDiv = document.createElement("div");
        buttonDiv.className = "button-row";

        //  Update link
        const updateLink = document.createElement("a");
        updateLink.href = "update.html?id=" + post.id;
        updateLink.className = "button button--success";
        updateLink.innerText = "Update";
        buttonDiv.appendChild(updateLink);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "button button--danger";
        deleteBtn.innerText = "Delete";

        deleteBtn.addEventListener("click", () => deletePost(post.id));
        buttonDiv.appendChild(deleteBtn);

        div.appendChild(buttonDiv);

        const container = document.getElementById("container");
        container.appendChild(div);
      });
    });
}

function deletePost(id) {
  fetch(URL + "/" + id, { method: "DELETE" })
    .then((res) => {
      if (!res.ok) throw new Error("Delete failed");
      document.querySelector(`[data-post-id="${id}"]`).remove();
    })
    .catch((err) => console.error(err));
}
