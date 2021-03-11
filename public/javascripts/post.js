const deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach((button) =>
  button.addEventListener("click", async (e) => {
    const commentId = e.target.id;
    const result = await fetch(`/comments/${commentId}`, {
      method: "DELETE",
    });
    const data = await result.json();
    if ((data.success = "Success!")) {
      e.target.parentElement.remove();
    }
  })
);

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
  if ((data.success = "Success!")) {
    const comment = data.comment;
    const commentsContainer = document.querySelector(".comments-container");
    // const commentBox = document.createElement("div");
    // commentsContainer.appendChild(commentBox);
    commentsContainer.innerHTML += `
      <div class="comment-box-${comment.id}">
        <div class="comment-box-body" id= "comment-${comment.id}" >
            <p class="comment-box-text" id="text-${comment.id}">${commentText}</p>
        </div>
        <button class="delete-button">Delete</button>
        <button class="edit-button">Edit</button>
        <div class="edit-box__hidden">
          <textarea>
           ${comment}
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
    // commentsContainer.appendChild(commentBox);
    // comment.value = "";

    document.querySelector(".new-comment-box").value = "";
  }
});

const editButtons = document.querySelectorAll(".edit-button");

editButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const commentId = e.target.id;
    const comment = document.getElementById(`text-${commentId}`).innerText;
    let commentBox = document.querySelector(`.comment-box-${commentId}`);
    const originalCommentBox = commentBox;
    console.log(comment);

    // const textArea = document.createElement("textarea");
    // textArea.innerText = comment.value;
    // commentBox.innerHTML += `
    // <div class="edit-box__hidden">
    // <textarea>
    //     ${comment}
    // </textarea>
    // <button class="update-button" id="update-${commentId}">
    //     Update
    // </button>
    // <button class="cancel-button" id="cancel-${commentId}">
    //     Cancel
    // </button>
    // <div>`;

    document
      .querySelector(".edit-box__hidden")
      .classList.remove("edit-box__hidden");
  });
});

const cancelButtons = document.querySelectorAll(".cancel-button");

cancelButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.target.parentElement.classList.add("edit-box__hidden");
  });
});

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
