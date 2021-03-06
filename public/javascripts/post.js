function findAllDelete() {
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
}

findAllEdits();
findAllDelete();
const commentErr = document.querySelector(".comment-error");

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
    commentErr.innerHTML = "";
    commentErr.classList.add("comment-error__hidden");
    const comment = data.comment;
    const commentsContainer = document.querySelector(".comments-container");
    // const commentBox = document.createElement("div");
    // commentsContainer.appendChild(commentBox);
    commentsContainer.innerHTML += `
      <div class="comment-box-${comment.id} comment-box">
        <div class="comment-box-body" id= "comment-${comment.id}" >
            <p class="comment-box-text" id="text-${comment.id}">${data.firstName} says: ${commentText}</p>
        </div>
        <button class="delete-button" id="delete-${comment.id}">Delete</button>
        <button class="edit-button" id="edit-${comment.id}">Edit</button>
        <div class="edit-box__hidden edit-box" id="edit-box-${comment.id}">
          <textarea id="text-area-${comment.id}" required>${comment.body}</textarea>
          <button class="update-button" id="update-${comment.id}">Update</button>
          <button class="cancel-button" id="cancel-${comment.id}">Cancel</button>
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
        commentErr.innerHTML = "";
        commentErr.classList.add("comment-error__hidden");
        document.querySelector(".edit-box").classList.add("edit-box__hidden");

        document.getElementById(
          `text-${comment.id}`
        ).innerText = `${data.firstName} says: ${textArea}`;
      } else {
        commentErr.innerHTML = data.msg;
        commentErr.classList.remove("comment-error__hidden");
      }
    });

    cancelButton.addEventListener("click", (e) => {
      document.querySelector(".edit-box").classList.add("edit-box__hidden");
    });

    findAllEdits();
    findAllDelete();

    document.querySelector(".new-comment-box").value = "";
    // console.log(editButtons);
  } else {
    commentErr.innerHTML = data.msg;
    commentErr.classList.remove("comment-error__hidden");
  }
});

function findAllEdits() {
  const editButtons = document.querySelectorAll(".edit-button");
  const editBox = document.querySelectorAll(".edit-box");
  console.log(editBox);
  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const commentId = e.target.id.split("-")[1];
      console.log(commentId);
      let hiddenCount = document.querySelectorAll(".edit-box__hidden").length;
      let commentsCounter = document.querySelectorAll(".edit-box").length;
      const editBoxs = document.getElementById(`edit-box-${commentId}`);
      console.log(editBoxs);
      if (hiddenCount == commentsCounter) {
        document
          .getElementById(`edit-box-${commentId}`)
          .classList.remove("edit-box__hidden");

        document
          .getElementById(`delete-${commentId}`)
          .classList.add("delete-button__hidden");

        document
          .getElementById(`edit-${commentId}`)
          .classList.add("edit-button__hidden");

        const updateButton = document.getElementById(`update-${commentId}`);
        const cancelButton = document.getElementById(`cancel-${commentId}`);

        updateButton.addEventListener("click", async (e) => {
          const textArea = document.getElementById(`text-area-${commentId}`)
            .value;
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
            commentErr.innerHTML = "";
            commentErr.classList.add("comment-error__hidden");
            document
              .getElementById(`edit-box-${commentId}`)
              .classList.add("edit-box__hidden");

            document
              .getElementById(`delete-${commentId}`)
              .classList.remove("delete-button__hidden");
            document
              .getElementById(`edit-${commentId}`)
              .classList.remove("edit-button__hidden");

            document.getElementById(
              `text-${commentId}`
            ).innerText = `${data.firstName} says: ${textArea}`;
          } else {
            commentErr.innerHTML = data.msg;
            commentErr.classList.remove("comment-error__hidden");
          }
        });

        cancelButton.addEventListener("click", (e) => {
          document
            .getElementById(`edit-box-${commentId}`)
            .classList.add("edit-box__hidden");

          document
            .getElementById(`delete-${commentId}`)
            .classList.remove("delete-button__hidden");

          document
            .getElementById(`edit-${commentId}`)
            .classList.remove("edit-button__hidden");
        });
      }
    });
  });
}
