const deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach((button) =>
  button.addEventListener("click", async (e) => {
    const commentId = e.target.id;
    const result = await fetch(`/comments/${commentId}`, {
      method: "DELETE",
    });
    console.log(commentId);
    const data = await result.json();
    if ((data.success = "Success!")) {
      e.target.parentElement.remove();
    }
  })
);
