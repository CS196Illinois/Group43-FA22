function dayClicked(clicked, workday) {
    if (workday == "false") {
        document.querySelector("#" + CSS.escape(clicked)).style.backgroundColor = "#F08080";
        document.getElementById(clicked).value = "true";
    } else if (workday == "true") {
        document.querySelector("#" + CSS.escape(clicked)).style.backgroundColor = '#87CEFA';  
        document.getElementById(clicked).value = "false";
    }

    // window.alert(clicked + " was pressed and it is a work day: " + workday);
}