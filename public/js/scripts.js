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

        shouts.appendChild(shout);
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