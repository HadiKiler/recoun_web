
let searchForm = document.getElementById("form-search")
let loader = document.getElementById("loader")
let content = document.getElementById("content")
let searchBtn = document.getElementById("searchBtn")
let timeout = true
let timer = null
const basePoint = "http://localhost:8000"

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    searchBtn.disabled = true;

    timeout = true
    time_out()

    let searchFormObject = new FormData(searchForm)
    let searchFormData = Object.fromEntries(searchFormObject)
    let searchParams = new URLSearchParams(searchFormData)
    loader.classList.add('loader')

    const searchPoint = `${basePoint}/api/?${searchParams}`
    const headers = {"Content-Type": "application/json"}
    let options = {
        method : "GET",
        headers : headers
    }
    fetch(searchPoint, options)
    .then(response=>{
        return response.json()
    })
    .then(data => {
        timeout = false
        clearInterval(timer)
        check(data)
    })
    .catch(err=> {
        searchBtn.disabled = false;
        console.log('err', err)
    })
    
})

function time_out(){
    let time = 1
    timer = setInterval(()=>{
        time+=1
        if (time>60 && timeout==true){
            searchBtn.disabled = false;
            loader.classList.remove('loader')
            toast_message.innerHTML = "Time out."
            clearInterval(timer)
            show()
        }
    },1000)
}



const toast_message = document.getElementById('toast-message')

console.log(toast_message)
function check(data){
    if (data['status']==400){
        searchBtn.disabled = false;
        loader.classList.remove('loader')
        toast_message.innerHTML = "Url is invalid Pleas Try another."
        show()
    }
    else if (data['status']==200){
        searchBtn.disabled = false;
        loader.classList.remove('loader')
        content.classList.remove('d-none')
        clear()
        fill(data)
    }
}


let domain = document.getElementById("domain")
let image = document.getElementById("image")
let links = document.getElementById("links")
let subdomains = document.getElementById("subdomains")
let whois = document.getElementById("whois")
let wappalyzer = document.getElementById("wappalyzer")

function fill(data){
    domain.innerText = data['domain']
    image.src = data['gowitness']
    
    let items = data['links']  // show links and paths
    items.forEach(e => {
        links.innerHTML += `<a href="${e}">${e}</a></br>`
    });

    items = data['subdomains']  // show subdomains ip status code ...
    items.forEach(e => {
        subdomains.innerHTML += `<tr><td>${e['domain']}</td><td>${e['ip']}</td><td>${e['ports']}</td><td>${e['stautsCode_title']}</td><td>${e['email_phone']['email']}</td><td>${e['email_phone']['numbers']}</td></tr>`
    });

    whois.innerText = JSON.stringify(data['whois'], null, 4) // whois info

    items = data['wappalyzer']
    for (let item in items){
        wappalyzer.innerHTML += `<div class="col-6 col-md-3 border p-3">${item}</div>`
    }

}

function clear(){
    domain.innerText = ''
    image.src = ''
    links.innerHTML = ''
    subdomains.innerHTML = ''
    whois.innerText = ''
    wappalyzer.innerHTML = ''
}


function show () {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function(toastEl) {
    // Creates an array of toasts (it only initializes them)
      return new bootstrap.Toast(toastEl) // No need for options; use the default options
    });
   toastList.forEach(toast => toast.show()); // This show them

    console.log(toastList); // Testing to see if it works
  };