
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

weatherForm.addEventListener("submit", (event) =>{
    event.preventDefault()
    const location = searchElement.value

    const url = "/weather?address=" + location
    msg1.textContent ="Loading..."
    msg2.textContent = " "
    fetch(url).then((response) => {
        response.json().then((data) =>{

            if(data.error){
                console.log(data.error)
                msg1.textContent = data.error
            }else{
                msg1.textContent= data.location
                msg2.textContent= data.forecast
            }
            
        })
  
    })


    console.log(location)
})
