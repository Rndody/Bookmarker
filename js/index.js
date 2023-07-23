//& ################## H One  #######################
var hOne = document.getElementById("hOne");
hOne.innerHTML = "Bookmarker";


//& ################## H Three  #######################
var hThree = document.getElementById("hThree");
hThree.innerHTML = "Bookmark your favorite sites";


//& ################## Inputs  #######################
var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
siteUrlInput.value="http://"
// var searchInput = document.getElementById("searchInput");

//& ################## buttons #######################

var addBookmarkBtn = document.getElementById("addBookmarkBtn");
var visitBtn = document.getElementById("visitBtn");
var deleteBtn = document.getElementById("deleteBtn");

// addBookmarkBtn.disabled=true;

//& ################## Buttons Event listner #######################
addBookmarkBtn.addEventListener("click", addBookmark);
//  visitBtn .addEventListener("click",visitSite)
// deleteBtn .addEventListener("click",addBookMark)

//& ################## Table Body #######################
var tableBody = document.getElementById("tableBody");


//& ################## Global Variables #######################

var bookmarkArray = new Array();
// var http="http://"
// var https="https://"


//! ################## Add BookMark Function #######################
checkLocalStorage();
function addBookmark() {

    var bookmarkItem = {
        name: siteNameInput.value,
        url: siteUrlInput.value
    }

    if (validateSiteName(bookmarkItem.name) && validateUrl(bookmarkItem.url)) {
        if (isBookmarkNameNotExists(siteNameInput.value)) {
            bookmarkArray.push(bookmarkItem);
            clearForm();
          
        }
        else {
            alert("The name is already exsists")
        }
    }

    else {
        alert(` Site Name or Url is not valid, Please follow the rules below :
        The website name must be at least 4 characters and max 30 characters 
        The website URL must be inserted with the complete pattern of url ex. http://example.wyz or www.example.xyz`)

    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarkArray))
    displayBookmarkes();

}

//! ################## Clear Form Function #######################

function clearForm() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

//! ################## Display Function #######################
function displayBookmarkes() {
    var tableContainer = ``;

    tableBody.innerHTML = "";

    for (var i = 0; i < bookmarkArray.length; i++) {

        tableContainer += ` <tr>
        <td>${i + 1}</td>
        <td> ${bookmarkArray[i].name}</td>

        <td>
            <button id="visitBtn" onclick="visitSite(${i})"  class="btn btn-outline-success">
                    <i class="fa-solid fa-globe"> Visit Website</i>
            </button>
        </td>
        <td>
            <button id="deleteBtn" class="btn btn-outline-danger" onclick="deleteBookmark(${i})">
                <i class="fa-solid fa-trash"> Delete</i>
            </button>
        </td>  
    </tr> `
    }
    tableBody.innerHTML = tableContainer;
}

//!####################==== Visit Site ====#############################
function visitSite(index){
    if(!bookmarkArray[index].url.toLowerCase().includes(`http://`) )
    {
        // if(!bookmarkArray[index].url.toLowerCase().includes(`https://`))
        // {
        var site =`http://`+bookmarkArray[index].url
    // }
    }
    else{
        site=bookmarkArray[index].url;
    }
    open(site, "_blank");
   
   }

//!####################==== CHECK LOCAL STORAGE ====#############################
function checkLocalStorage() {

    if (localStorage.getItem('bookmarks') != null) {
        bookmarkArray = JSON.parse(localStorage.getItem("bookmarks"));
        displayBookmarkes()
    }
}


//!####################==== DELETE Bookmark ====#############################

function deleteBookmark(index) {
    bookmarkArray.splice(index, 1);
    displayBookmarkes()
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkArray));
}

//!####################==== Check dublicated Bookmark ====#############################


function isBookmarkNameNotExists(name) {
    var notExists = 3;
    var result;
    if (bookmarkArray.length != 0) {
        var i = 0;

        while (i < bookmarkArray.length) {

            if (!bookmarkArray[i].name.toLowerCase().includes(name.toLowerCase())) {
                i++;
            }
            else {
                notExists = 1;
                i++;
            }
        }
        if (notExists == 1) {
            result = false;
        }
        else {
            result = true
        }
        return result;
    }
    else {
        return true;
    }
}

//!####################==== Check site Name & URL Validation  ====#############################


function validateSiteName(siteName) {
    var nameRegularExpretion = /^[a-zA-Z][a-z\s0-9A-Z_]{2,30}[a-z0-9A-z_]$/g;
    return nameRegularExpretion.test(siteName);
}

function validateUrl(url) {
    var urlRegularExpretion = /^https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}$/gi;
    return urlRegularExpretion.test(url);
}



