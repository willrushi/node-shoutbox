const getPosts = async () => {
    const res = await fetch("/api/get");
    const data = await res.json();
    return data;
}

const shouts = document.getElementById("shouts");

getPosts().then(data => {
    if(!data.success){
        alert("Failed to retrieve posts");
    }

    const posts = data.data;

    posts.forEach(post => {
        const shout = document.createElement("div");
        const data = document.createTextNode(`${post.author}: ${post.content}`);
        shout.appendChild(data);
        shout.classList.add("shout");
        shout.setAttribute("data-id", post._id);

        const updateButton = document.createElement("button");
        updateButton.innerText = "Update";
        updateButton.classList.add("updateButton");

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("deleteButton");

        shout.appendChild(updateButton);
        shout.appendChild(deleteButton);

        shouts.appendChild(shout);
    })

    document.querySelectorAll(".updateButton").forEach(button => {
        button.addEventListener("click", (e) => {
            const message = document.getElementById("messageBox").value;
            const id = button.parentElement.dataset.id;
            
            fetch("/api/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ content: message, id: id})
            })
            .then(() => {
                alert("Post updated");
                location.reload();
            })
            
        })
    })

    document.querySelectorAll(".deleteButton").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = button.parentElement.dataset.id;
            
            fetch(`/api/delete/${id}`)
            .then(() => {
                alert("Post deleted");
                location.reload();
            })
            
        })
    })
})

document.getElementById("submit").addEventListener("click", ()=>{
    const name = document.getElementById("nameBox").value;
    const message = document.getElementById("messageBox").value;

    fetch("/api/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ author:name, content: message })
    })
    .then(() => {
        alert("Post added");
        location.reload();
    })
});