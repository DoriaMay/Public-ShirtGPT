const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}


/* CreateProduct Page */

const API_KEY = "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"

const submitIcon = document.querySelector("#submit-icon");
const inputElement = document.querySelector("input");
const imageSection = document.querySelector(".images-section")

const getImages = async() => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: inputElement.value,
            n: 4,
            size: "1024x1024"
        })
    }
    try {
       const response = await fetch("https://api.openai.com/v1/images/generations", options)
       const data = await response.json()
       console.log(data)

       data?.data.forEach(imageObject => {
        const imageContainer = document.createElement("div")
        imageContainer.classList.add("image-container")
        const imgageElement = document.createElement("img")
        imgageElement.setAttribute('src', imageObject.url)
        imageContainer.append(imgageElement)
        imageSection.append(imageContainer)
       })

    } catch (error) {
        console.error(error)
    }
}

submitIcon.addEventListener('click', getImages)