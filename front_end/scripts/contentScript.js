// document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6').forEach((element) => {
//     let words = element.innerText.split(' ');
//     element.innerHTML = ''; // Clear the current content

//     words.forEach((word, index) => {
//         let span = document.createElement('span');
//         span.innerText = word;

//         // Add a space between words except for the last word
//         element.appendChild(span);
//         if (index < words.length - 1) {
//             element.appendChild(document.createTextNode(' '));
//         }
//     });
// });

let hoveredElement = null;
const elementsMap = new Map();

function wrapWordsInElement(element) {
    // Skip certain tags
    if (['SCRIPT', 'STYLE', 'IFRAME', 'NOSCRIPT', 'INPUT', 'TEXTAREA', 'BUTTON', 'SELECT'].includes(element.tagName)) {
        return;
    }

    element.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
            let words = node.textContent.split(/\s+/);
            let fragment = document.createDocumentFragment();

            words.forEach((word, index) => {
                let span = document.createElement('span');
                span.innerText = word;
                fragment.appendChild(span);
                if (index < words.length - 1) {
                    fragment.appendChild(document.createTextNode(' '));
                }
            });

            node.replaceWith(fragment);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            wrapWordsInElement(node);
        }
    });
}


// Apply word wrapping to all elements on the page
document.querySelectorAll('p, div, span').forEach((element) => {
    wrapWordsInElement(element);
});

function addHoverHighlight(element) {
    element.classList.add('hover-highlight');
}

function removeHoverHighlight(element) {
    element.classList.remove('hover-highlight');
}


function addClickHighlight(element) {
    element.classList.add('click-highlight');
    elementsMap.set(element, true);
}

function removeClickHighlight(element) {
    element.classList.remove('click-highlight');
    elementsMap.delete(element);
}

// Handle mouseover
function handleMouseOver(event) {
    if (event.target.tagName === 'SPAN') {
        let target = event.target;

        if (hoveredElement !== null && !elementsMap.has(hoveredElement)) {
            removeHoverHighlight(hoveredElement);
        }

        addHoverHighlight(target);
        hoveredElement = target;
    }
}

// Handle click
function handleClick(event) {
    if (event.target.tagName === 'SPAN') {
        let target = event.target;

        if (!elementsMap.has(target)) {
            addClickHighlight(target, true);
        } else {
            removeClickHighlight(target);
        }
    }
}

// Attach event listeners for mouseover and click
document.addEventListener('mouseover', handleMouseOver);
document.addEventListener('click', handleClick);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'disableContentScript') {
        // Disable your content script functionality
        console.log("Disabling content script");
        // Add your disabling logic here, such as removing event listeners or stopping any ongoing actions
        document.getElementById("close").removeEventListener("mouseover", handleMouseOver);
        document.getElementById("close").removeEventListener("click", handleClick);
    }
});

