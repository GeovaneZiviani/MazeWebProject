var modal = document.getElementById('myModal');

var editModal = document.getElementById('editModal')

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

var edit = document.getElementById("editBtn");

btn.onclick = function() {
	modal.style.display = "block";
}


edit.onclick = function() {
	editModal.style.display = "block";
}

span.onclick = function() {
	modal.style.display = "none";
	editModal.style.display = "none";

}

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";

	} else if (event.target == editModal) {
		editModal.style.display = "none";
	}
}