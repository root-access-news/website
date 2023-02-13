var inputElement = null;
var outputElement = null;
var inputs = [];
var outputs = []
var commandPrefix = "admin@ra:~$ ";
var userInputs = [
    "whoami",
    "uname -a",
    "ls -1",
    "ls -l Input",
    "clear"
];

// use <br /> to print lines together
// use \n to print lines separately
var userOutputs = [
    "rootaccess",
    "<span class='text-heroGrey'>Your one-stop-shop for cyber security news, technical information, trending repos and hot security scoops.</span>",
    "<span class='text-heroPurple'>Input<br />Desktop<br />Documents<br />Downloads</span>", 
    // -r--r--r-- 1 owner group filesize Aug 21 15:07 Filename
`
-rw-r----- 1 reddit   readers 3127 Feb 05 05:29 Reddit (Top) <br />
-rw-r----- 1 twitter  readers 1340 Feb 22 20:34 Twitter <br />
-rw-r----- 1 github   readers 1379 Nov 13 06:15 GitHub repos <br />
-rw-r----- 1 web      readers 2208 Jul 03 23:51 CVEs <br />
-rw-r----- 1 web      readers 1614 Aug 11 10:12 Advisories <br />
-rw-r----- 1 friends  readers 3465 Jan 02 17:30 Research blogs <br />
-rw-r----- 1 web      readers 3916 Jun 13 10:53 Vuln reports <br />
-rw-r----- 1 blogs    readers 1435 Dec 19 13:33 Hands-on labs <br />
-rw-r----- 1 blogs    readers 4854 Sep 17 23:02 Daily tips <br />
-rw-r----- 1 web      readers 4237 Dec 15 23:04 New tools`,
    ""
];

var adminInputs = [
    // "ls -l Companies", 
    // "clear"
];

var adminOutputs = [
    // `very long`,
    ""
];

var logoArtCommand = ["jp2a -i RootAccess.jpg"]
// var logoArt = [
// "<br /><br /><br />\
//     xvxxxxv   xv     xx  xxxvvxxv     xx       vx      xx     vxxxxv   <br />\
//     xv          xx vx       xv       xvvx      vx      xv   vx      xv <br />\
//     xExxxv       X X        xv      xv  vx     vx      xv   E   vx   E <br />\
//     xv          xx xx       xv     xv xv vx    vx      xv   vx      xv <br />\
//     xvxxxxv   xv     vx     xx    xv      vx   vvxxx   xx     xxvvxx   <br />\
// <br /><br />"
// ];
var logoArt = [
"<pre><br />\
     ######    ######                             <br />\
     #::::#    #::::#                             <br />\
     #::::#    #::::#      rrrrr   rrrrrrrrr      <br />\
######::::######::::###### r:::: rrr::::::::: r   <br />\
#::::::::::::::::::::::::# r::::::::::::::::: r   <br />\
######::::######::::###### rr:::::: rrrrr:::::: r <br />\
     #::::#    #::::#       r::::: r     r::::: r <br />\
     #::::#    #::::#       r::::: r     rrrrrrr  <br />\
######::::######::::######  r::::: r     rrrrrrr  <br />\
#::::::::::::::::::::::::#  r::::: r              <br />\
######::::######::::######  r::::: r              <br />\
     #::::#    #::::#       r::::: r              <br />\
     #::::#    #::::#       r::::: r              <br />\
     ######    ######       rrrrrrr               \
</pre>\
"
];
var logoArtMobile = [
"<pre><br />\
rrrrr   rrrrrrrrr       <br />\
r:::: rrr::::::::: r    <br />\
r::::::::::::::::: r    <br />\
rr:::::: rrrrr:::::: r  <br />\
 r::::: r     r::::: r  <br />\
 r::::: r     rrrrrrr   <br />\
 r::::: r               <br />\
 r::::: r               <br />\
 r::::: r               <br />\
 r::::: r               <br />\
 r::::: r               <br />\
 rrrrrrr                \
 </pre>\
"
];
// "<br /><br />\
//         v=x           x=x   <br />\
//          x\\/v       v^\\=  <br />\
//           v^\\x     x\\/v   \n\
//             =\\^v  ^\\=     <br />\
//              v/^ ^/x        <br />\
//                             \n\
//              v/^ ^/x        <br />\
//             =\\^v  ^\\=     <br />\
//           v/\\x     x//v    \n\
//          x\\/v       v^\\=  <br />\
//         v=x           x=x   <br /><br />\
// "

var isContacting = false;
var contactInputs = [];
var contactOutputs = [];


function initTerminal() {
    inputElement = document.getElementById("terminal-input");
    outputElement = document.getElementById("terminal-output");
    
    if (isContactScenario()) {
        initContactScenario();
        simulateTerminal();
        return;
    }
    let wrapTerm = document.querySelector('#wrapperTerminal')
	var timerLength = 5;
    var isMobile = document.documentElement.clientWidth < 700;
    if (isMobile) {
        userInputs[2] = "ls -1 Input";
        userOutputs[2] = "<span class='text-heroPurple'>Reddit (Top)<br />Twitter<br />GitHub repos<br />CVEs<br />Advisories<br />Research blogs<br />Vuln reports<br />Hands-on labs<br />Daily tips<br />New tools</span>"
        logoArt = logoArtMobile;
		timerLength = 8;
        // setTimeout(function () {
        //     wrapTerm.classList.add('items-end')
        // }, 16750);
        // setTimeout(function () {
        //     wrapTerm.classList.remove('items-end')
        // }, 22800);
        // setTimeout(function () {
        //     wrapTerm.classList.add('items-end')
        // }, 26900);
    // } else{
        // setTimeout(function () {
        //     wrapTerm.classList.add('items-end')
        // }, 16400);
        // setTimeout(function () {
        //     wrapTerm.classList.remove('items-end')
        // }, 19200);
        // setTimeout(function () {
        //     wrapTerm.classList.add('items-end')
        // }, 23300);
    }
    
    inputs = userInputs;
    outputs = userOutputs;
    runTimer(timerLength);
}

function isContactScenario() {
    return document.location.search.substr(0, 9) == "?contact=";
}

function getParams() {
    paramsStr = document.location.search.substr(9);
    params = paramsStr.split("@");
    params[0] = decodeURIComponent(params[0]);
    params[1] = decodeURIComponent(params[1]);
    return params;
}

function initContactScenario() {
    isContacting = true;
    params = getParams();
    name = params[0];
    phone = params[1];
    mailCommand = 'echo ' + phone +' | mail -s “Call ' + name + ' ASAP” contact@extalio.com';
    contactInputs = [mailCommand];
    contactOutputs = [''];
    contactInputs.push("cat confirm_contact.txt");
    contactOutputs.push("We received your phone number successfully, we will call you soon")
    inputs = contactInputs;
    outputs = contactOutputs;
    commandPrefix = 'extalio@xpc:~$ ';
}

function runTimer(timer) {
    if (timer == 0) {
        inputElement.innerHTML = "<span class='text-heroGreen'>" + commandPrefix + "</span>";
        simulateTerminal();
        return;
    }
    timer--;
    inputElement.innerHTML = timer;
    setTimeout(runTimer, 1000, timer);
}


// Order of simulation: 
// - Timer (runTimer)
// - Run commands as a user
// - Switch user from user to admin
// - Run commands as admin
// - At the end print ascii art of logo
function simulateTerminal() {
    if (isContacting) {
        if (contactInputs.length == 0)
            return;
    }
    // finished simulation
    else if (logoArt.length == 0)
        return;
    // print logo ascii art
    else if (userInputs.length == 0) {
        outputElement.innerHTML = "";
        inputs = logoArtCommand;
        outputs = logoArt;
    }
    // switch user from user to admin
    // else if (userInputs.length == 0)
        // switchUser();
    
    // run commands
    inputElement.innerHTML = "<span class='text-heroGreen'>" + commandPrefix + "</span>";
    setTimeout(typeText, 2000);
}

function switchUser() {
    commandPrefix = "<span class='text-heroGreen'>admin@ra:~$ </span> "
    inputs = adminInputs;
    outputs = adminOutpus;
}

// simulate command typing in terminal
function typeText() {
    var inputText = inputs.shift();
    typeChar(inputText);
}

// use timeout between each char so it feels real
function typeChar(text) {
    if (!text) {
        setTimeout(enterText, 100);
        return;
    }
    inputElement.innerHTML += text.charAt(0);
    text = text.substr(1);
    setTimeout(typeChar, 90, text);
}

// simulate pressing enter to run the command
function enterText() {
    inputText = inputElement.innerHTML + "<br />";
    inputElement.innerHTML = "";
    outputElement.innerHTML += inputText;
    
    output = outputs.shift();
    outputLines = output.split("\n");
    printLines(outputLines);
}

// print command output, using timeout between each line so it feels real
function printLines(lines) {
    if (lines.length == 0) {
        outputElement.innerHTML += "<br />";
        outputElement.scrollTop = outputElement.scrollHeight;
        inputElement.innerHTML = "<span class='text-heroGreen'>" + commandPrefix + "</span>";
        simulateTerminal();
        return;
    }
    
    outputElement.innerHTML += lines.shift();
    // outputElement.innerHTML += "<br />";
    outputElement.scrollTop = outputElement.scrollHeight;
    setTimeout(printLines, 20, lines);
}

function toggleEmail() {
    email = document.getElementById("contact-email");
    button = document.getElementById("email-button");
    
    display = email.style.display || "none";
    if (display == "none") {
        email.style.display = "block";
        button.style.borderBottom = "solid 2px rgb(99, 255, 254)";
        button.style.marginBottom = 0;
    }
    else {
        email.style.display = "none";
        button.style.border = "";
        button.style.marginBottom = "2px";
    }
}

function onContactSubmit(form) {
    nextPage = "http://extalio.com/?contact=" + form.name.value + "@" + form.phone.value;
    form._next.value = nextPage;
    return true;
}

// function sloganAnimation() {
//     roles = document.getElementsByClassName('roles');
//     container = document.getElementsByClassName('roles-container');
//     containerContainer = document.getElementsByClassName('roles-container-container');
//     // jobs = document.getElementById('jobs');
//     // jobsContainer = document.getElementById('jobs-container');
//     // jobsContainerContainer = document.getElementById('jobs-container-container');
    
//     role = roles[0];
//     margin = 67.5; //pixles
//     jobsMargin = 59;
//     if (role.innerHTML == "researchers") {
//         text = "engineers";
//         width = 135;
//         // jobsText = "engineering";
//         // jobsWidth = 165;
//     } else {
//         text = "researchers";
//         width = 162;
//         // jobsText = "research";
//         // jobsWidth = 118;
//     }
    
//     for (i = 0; i < roles.length; i++) {
//         closeBracketsAnimation(roles[i], container[i], containerContainer[i], margin);
//         setTimeout(openBracketsAnimation, 610, roles[i], container[i], containerContainer[i], text, width);
//     }
//     // closeBracketsAnimation(jobs, jobsContainer, jobsContainerContainer, jobsMargin);
//     // setTimeout(openBracketsAnimation, 610, jobs, jobsContainer, jobsContainerContainer, jobsText, jobsWidth);
//     setTimeout(sloganAnimation, 6000);
// }

function closeBracketsAnimation(role, container, containerContainer, margin) {
    var isMobile = document.documentElement.clientWidth < 700;
    if (isMobile) {
        margin *= 0.77;
    }
    
    marginStr = margin + "px";
    role.style.marginLeft = "-" + marginStr;
    container.style.width = "0";
    containerContainer.style.marginRight = marginStr;
    containerContainer.style.marginLeft = marginStr;
}

function openBracketsAnimation(role, container, containerContainer, text, width) {
    var isMobile = document.documentElement.clientWidth < 700;
    if (isMobile) {
        width *= 0.77;
    }
    
    role.innerHTML = text;
    container.style.width = width + "px";
    role.style.marginLeft = "0";
    containerContainer.style.marginRight = "0";
    containerContainer.style.marginLeft = "0";
}