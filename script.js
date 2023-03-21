//  "default_icon": "icon.png"---  icon could be added  in the action section of manifest.json
// manifest-configures our app and provides metadata

let myLeads = []
let oldLeads = []

const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const saveBtn = document.getElementById("save-btn")

// JSON.parse(myLeads).push("ww.awesome.com")
// JSON.stringify(myLeads)

// console.log(typeof myLeads)
// JSON.parse(value)---  parses the string to valid javascript object i.e json.parse("[1,34,5]")  to [1,34,5 ]
// JSON.stringify(value)--converts a javascript data to jSON.ie json.stringify({name: "vick"})  to "{"name":"vick"}"

// localstorage persists data.only works with strings

// console.log(localStorage.getItem("myLeads"))
// diff null and undefined
// null-- a way developer signalizes emptiness of a variable like let currentviewers = null
// undefined-- a ways javascript signalizes emptiness   let curentviewers   thus console.log(currentviewrs)  gives undefined or let curre=["vick"]  but oyu try accesing curre[4]

// localStorage.clear()
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"))

// persisting localstorage
if (leadsFromLocalStorage) {
	myLeads = leadsFromLocalStorage
	render(myLeads)
}

function render(leads) {
	let listitems = ""
	for (let i = 0; i < leads.length; i++) {
		// ulEl.innerHTML += "<li>" + myLeads[i] + "<li>"

		// solution 2
		// let li = document.createElement("li")
		// li.textContent= myLeads[i]
		// ulEl.append(li)

		// solutiton 3 --optimized because DOM is manipulated only once
		listitems += `<li>
					   <a  href='${leads[i]}' target='_blank' >${leads[i]}</a>
					  </li>`        
		// console.log(listitems)
	}
	ulEl.innerHTML = listitems
}
   
// const tabs = [{ url: "www.twitter.com" }]

saveBtn.addEventListener("click", function () {   

	// Grab the URL of the current tab!   
	// After adding permissions in the manifest.json    
	
	chrome.tabs.query({active: true , currentWindow: true}, function(tabs) {
      
		myLeads.push(tabs[0].url)
		localStorage.setItem("myLeads", JSON.stringify(myLeads))
		render(myLeads)

	})           
	
	// before chrome API         

	// myLeads.push(tabs[0].url)
	// localStorage.setItem("myLeads", JSON.stringify(myLeads))
	// render(myLeads)
})

deleteBtn.addEventListener("click", function () {
	localStorage.clear()
	myLeads = []
	render(myLeads)
})

inputBtn.addEventListener("click", function () {
	myLeads.push(inputEl.value)
	inputEl.value = ""
	localStorage.setItem("myleads", JSON.stringify(myLeads))
	render(myLeads)
	console.log(localStorage.getItem("myleads"))
})
