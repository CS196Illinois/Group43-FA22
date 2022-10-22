function dropPlan() {
  document.getElementById("planContent").classList.toggle("show");
}


window.onclick = function(event) {
  if (!event.target.matches('.planbtn')) {
    var dropdowns = document.getElementsByClassName("dropPlan-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}