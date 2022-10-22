function dayClicked(clicked, workday) {
    if (workday == "false") {
        document.querySelector("#" + CSS.escape(clicked)).style.backgroundColor = "#F08080";
        document.getElementById(clicked).value = "true";
    } else if (workday == "true") {
        document.querySelector("#" + CSS.escape(clicked)).style.backgroundColor = '#904aec';  
        document.getElementById(clicked).value = "false";
    }
}