// This callback function is called when the content script has been 
// injected and returned its results
function onPageDetailsReceived(pageDetails)  { 
    document.getElementById('productName').innerText = pageDetails.productName; 
    document.getElementById('susIndex').innerText = pageDetails.susIndex; 
    document.getElementById('infoLink').innerHTML = '<a href = ' + pageDetails.infoLink + '>More information</a>'; 
} 
// Global reference to the status display SPAN
//var statusDisplay = null;

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN
    //statusDisplay = document.getElementById('status-display');
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in
        // our onPageDetailsReceived function as the callback. This
        // injects content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});