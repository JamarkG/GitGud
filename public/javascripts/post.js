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

// const editButtons = document.querySelectorAll(".edit-button");

// editButtons.forEach((button) =>
// 	button.addEventListener("click", async (e) => {
// 		const commentId = e.target.id;
// 		const result = await fetch(`/comments/${commentId}`, {
// 			method: "DELETE",
// 		});
// 		const data = await result.json();
// 		if ((data.success = "Success!")) {
// 			e.target.parentElement.remove();
// 		}
// 	})
// );

const addButtons = document.querySelectorAll(".add-button");

addButtons.forEach((button) =>
	button.addEventListener("click", async (e) => {
    const comment = document.querySelector(".new-comment-box");
    console.log(comment.name)
		const result = await fetch(`/posts/${comment.name}/comments`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ body: comment.value }), // send in the text from the input box
		});
		const data = await result.json();
		if ((data.success = "Success!")) {
      console.log("We made it here now show the comment")
		}
	})
);

// above we just need to make it so that it is rendered to the page right away
