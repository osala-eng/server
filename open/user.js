function showPassword(){
    var x = document.getElementById("passInput");
    if(x.type == "password"){
        x.type = "text";
    }
    else{
        x.type = "password";
    }
}
var hostIpAddress = "localhost";
function goBack(){
    window.history.back();
}
function startScan(){
    window.open(`http://${hostIpAddress}:3000/scan.html`,"_self");
}
function homePage(){
    window.open(`http://${hostIpAddress}:3000/main.html`,"_self");
}
function newPatient(){
    window.open(`http://${hostIpAddress}:3000/newpatient.html`,"_self");
}
function logOut(){
    window.open(`http://${hostIpAddress}:3000/user.html`,"_self");
}
function cancelScan(){
    window.open(`http://${hostIpAddress}:3000/main.html`,"_self");
}
function userData(){
    window.open(`http://${hostIpAddress}:3000/scanresult.html`,"_self");
}
// }
//  function blury(){
//     blur;
// }
// //Patient data
// id = scanId();
// function scanId(){
//     Document.getElementById("scanBox");
// }


getpatientData();
function getpatientData(){
    //userData();
    console.log("Getting patient info")
    $.get("/scanresult", function(data){
        if(!data){
            console.log("No data received");
        }
        console.log("Received data:");
        for(var i = 0; i< data.length;i++){
            console.log(data[i].name);
        }
        showData(data);
    });
}

// getScanning();
// function getScanning(){

//     $.get("/scan/:scanWindow", function(data){
//         if(!data){
//             console.log("No data received");
//         }
//         console.log("Received data:");
//         for(var i = 0; i< data.length;i++){
//             console.log(data[i].name);
//         }

//         showData(data);
//     });
// }

function showData(patienttbl){
    var dataSection = document.getElementById("patientData");
        var section = document.createElement("section");
        section.className = "patientinfo";
        var heading = document.createElement("h3");
        heading.innerHTML = "Name";
        var detailx = document.createElement("p");
        detailx.innerHTML = patienttbl.firstName+" "+patienttbl.lastName;
        section.appendChild(heading);
        section.appendChild(detailx);
        dataSection.appendChild(section);

}