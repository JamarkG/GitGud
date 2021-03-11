const deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach((button) =>
  button.addEventListener("click", async (e) => {
    const commentId = e.target.id.split("-")[1];
    const result = await fetch(`/comments/${commentId}`, {
      method: "DELETE",
    });
    const data = await result.json();
    if ((data.success = "Success!")) {
      e.target.parentElement.remove();
    }
  })
);

// let editButtons = document.querySelectorAll(".edit-button");

const addButton = document.querySelector(".add-comment");
addButton.addEventListener("click", async (e) => {
  const commentText = document.querySelector(".new-comment-box").value;
  const commentsContainer = document.querySelector(".comments-container");
  const result = await fetch(`/posts/${commentsContainer.id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: commentText }),
  });
  const data = await result.json();
  if (data.success === true) {
    const comment = data.comment;
    const commentsContainer = document.querySelector(".comments-container");
    // const commentBox = document.createElement("div");
    // commentsContainer.appendChild(commentBox);
    commentsContainer.innerHTML += `
      <div class="comment-box-${comment.id}">
        <div class="comment-box-body" id= "comment-${comment.id}" >
            <p class="comment-box-text" id="text-${comment.id}">${commentText}</p>
        </div>
        <button class="delete-button" id="delete-${comment.id}">Delete</button>
        <button class="edit-button" id="edit-${comment.id}">Edit</button>
        <div class="edit-box__hidden edit-box" id="edit-box-${comment.id}>
          <textarea id="text-area-${comment.id}">
           ${comment.body}
          </textarea>
          <button class="update-button" id="update-${comment.id}">
            Update
          </button>
          <button class="cancel-button" id="cancel-${comment.id}">
            Cancel
          </button>
        </div>
      </div>
        `;

    const updateButton = document.getElementById(`update-${comment.id}`);
    const cancelButton = document.getElementById(`cancel-${comment.id}`);

    updateButton.addEventListener("click", async (e) => {
      const textArea = document.getElementById(`text-area-${comment.id}`).value;
      console.log(textArea);
      const res = await fetch(`/comments/${comment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: textArea }),
      });

      const data = await res.json();
      if (data.success === true) {
        document.querySelector(".edit-box").classList.add("edit-box__hidden");

        document.getElementById(`text-${comment.id}`).innerText = textArea;
      }
    });

    cancelButton.addEventListener("click", (e) => {
      document.querySelector(".edit-box").classList.add("edit-box__hidden");
    });

    // findAllEdits();

    document.querySelector(".new-comment-box").value = "";
    // console.log(editButtons);
  }
});

const editButtons = document.querySelectorAll(".edit-button");
editButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const commentId = e.target.id.split("-")[1];
    console.log(e.target);

    document
      .getElementById(`edit-box-${commentId}`)
      .classList.remove("edit-box__hidden");

    const updateButton = document.getElementById(`update-${commentId}`);
    const cancelButton = document.getElementById(`cancel-${commentId}`);

    updateButton.addEventListener("click", async (e) => {
      const textArea = document.getElementById(`text-area-${commentId}`).value;
      console.log(textArea);
      const res = await fetch(`/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: textArea }),
      });

      const data = await res.json();

      if (data.success === true) {
        document
          .getElementById(`edit-box-${commentId}`)
          .classList.add("edit-box__hidden");

        document.getElementById(`text-${commentId}`).innerText = textArea;
      }
    });

    cancelButton.addEventListener("click", (e) => {
      document.querySelector(".edit-box").classList.add("edit-box__hidden");
    });
  });
});

// findAllEdits();

// const cancelButtons = document.querySelectorAll(".cancel-button");

// cancelButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     e.target.parentElement.classList.add("edit-box__hidden");
//   });
// });

// document
//   .querySelector(".cancel-button")
//   .addEventListener("click", async (e) => {
//     const commentId = e.target.id.split("-")[1];

//     const result = await fetch(`/comments/${commentId}`);
//     const { comment } = result.json();

//     const commentBox = document.querySelector(`.comment-box-${comment.id}`);
//     commentBox = `<div class="comment-box-${comment.id}">
//     <div class="comment-box-body" id= "comment-${comment.id}" >
//       <p class="comment-box-text" id="text-${comment.id}">${comment.body}</p>
//     </div>
//     <button class="delete-button">Delete</button>
//     <button class="edit-button">Edit</button>
//  </div>
//   `;
//   });

// editButtons.forEach((button) => {
//   button.addEventListener("click", async (e) => {
//     const commentId = e.target.id;
//     const comment = document.getElementById(`text-${commentId}`);
//     const commentBox = document.getElementById(`comment-box-${commentId}`);

//     commentBox.innerHTML = `<textarea></textarea>`
//     const result = await fetch("/comments", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: {},
//     });
//   });
// });
