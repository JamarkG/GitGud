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
    const comment = document.querySelector(".new-comment-box");
    const commentsContainer = document.querySelector('.comments-container')
		const result = await fetch(`/posts/${commentsContainer.id}/comments`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ body: comment.value }),
		});
		const data = await result.json();
		if ((data.success = "Success!")) {
      const commentsContainer = document.querySelector('.comments-container')
      const commentBox = document.createElement('p')
      commentBox.innerHTML =
      `<div class="comment-box">
          <div class="comment-box-body" id= "comment-${comment.id}" >
            <p class="comment-box-text">${comment.value}</p>
          </div>
          <button class="delete-button">Delete</button>
          <button class="edit-button">Edit</button>
       </div>
        `;
      commentsContainer.appendChild(commentBox);
      comment.value= "";
		}
	})
