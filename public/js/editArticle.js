console.log(1);
const objectUpdated = {};

if (!!$("#title")) objectUpdated.title = $("#title").val()
if (!!$("#description")) objectUpdated.description = $("#description").val()
console.log(window.location.href);
const url = window.location.href;
const parts = url.split('/');
idArticle = parts[parts.length - 1];
console.log(idArticle)
$("#updateClick").on("submit", () => {
    objectUpdated.idArticle = idArticle ; 
    if (!!$("#title")) objectUpdated.title = $("#title").val()
    if (!!$("#description")) objectUpdated.description = $("#description").val()

    const obj = { ...objectUpdated }
    console.log(2)
    console.log(obj)
    fetch('http://localhost:8000/article/', {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
            obj
        )
    });
})

$("#delete").click("submit", () => {
    console.log("test")
    fetch(`http://localhost:8000/article/${idArticle}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    });
})