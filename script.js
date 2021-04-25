const BITLY_API_ACCESS_TOKEN = process.env.BITLY_TOKEN
const inputForm = document.querySelector('.input--form input')
const formButton = document.querySelector('.input button')
const result = document.querySelector('.response--p')
const copyButton = document.querySelector('.copy-button')
const resultDiv = document.querySelector('.response--text')
const errorMsg = document.querySelector('.error-msg')

formButton.addEventListener('click', function(){
    if (inputForm.value) {
        shortURL(inputForm.value)
    }
    else {
        errorMsg.style.display = 'block'
    }
})

copyButton.addEventListener('click', function(){
    copyElementText(result)
})

function shortURL(input) {fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${BITLY_API_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "long_url": input, "domain": "bit.ly"})
})
    .then(data => {
        if (data.status !== 200) {
            if (resultDiv.style.display !== 'none'){
                hideResult()
                showError(data)
            }
            showError(data)
        }
        return data.json()})
    .then(response => 
        {if (errorMsg.style.display !== 'none'){
            errorMsg.style.display = 'none'}
            result.innerHTML = response.link
            showResult()
        })
    .catch(e => console.error(e))
}

function showResult() {
    resultDiv.style.display = 'block'
    copyButton.style.display = 'block'
}

function hideResult() {
    resultDiv.style.display = 'none'
    copyButton.style.display = 'none'
}

function copyElementText(id) {
    var text = id.innerText;
    navigator.clipboard.writeText(text)
}

function showError(data) {
    errorMsg.style.display = 'block'
    inputForm.value = ''
    throw new Error ('Somethink went wrong! HTTP error: ' + data.status)
}