const test = () => {
	console.log("start")
	const cat = document.getElementById("new-category").value
	if (cat) {
		console.log(cat)
	} else {
		console.log("it's empty")
	}
}