/*** 
   recordsList its the base for the controllers and paginations.
   recordsPage contains the records for each page for the current script
   currentPage helps to control which page is currenty displaying
***/
const recordsList   = document.querySelector('.student-list');
var recordsPerPage  = 10;
var currentPage     = 1;

/**
 * Loop through the records and displays only the ones between the page range
 *
 * @param {Int} page
 * @param {HTMLCollection} list
 */
var showPage = (page, list) => {    
    let pageLimit = page * recordsPerPage;
    let pageStart = (page - 1) * recordsPerPage;

    for (let r = 0; r < list.length; r++) {
        let record = list[r];
        if (r >= pageStart && r < pageLimit) {
            record.style.display = 'block';
        }else{
            record.style.display = 'none';
        }
    }
};

/**
 * Configure the initial pagination then displays the page passed as a parameter with the amount of records desired per page
 *
 * @param {Int} page
 */
var appendPageLinks = (page) => {    
    let listParent          = recordsList.parentNode;
    let paginationContainer = listParent.querySelector('.pagination');

    //Case the pagination already exists we should remove it and create a new element for the configuration
    if (paginationContainer) {
        listParent.removeChild(paginationContainer);
    }
    
    paginationContainer           = document.createElement('div');
    paginationContainer.className = 'pagination';    

    //Create the actual list container to add each link
    let paginationList = document.createElement('ul');
    let pagesNumber    = Math.ceil(recordsList.children.length / recordsPerPage);
        
    //Create the links and adds them to the page
    for (let p = 1; p <= pagesNumber; p++) {
        let li = document.createElement('li');
        let a  = document.createElement('a');

        if (p == page) {
            a.className = 'active';
        }

        a.textContent = p;
        li.appendChild(a);
        paginationContainer.appendChild(li);
    }

    listParent.appendChild(paginationContainer);

    //Add the events for changing pages
    paginationContainer.addEventListener('click', (event) => {
        let element = event.target;
        
        if (element.tagName == 'A') {
            if (!element.classList.contains('active')) {
                let parentPagination = element.parentNode.parentNode;
                let linkList         = parentPagination.querySelectorAll('a');

                for (let a = 0; a < linkList.length; a++) {
                    let link = linkList[a];
                    link.removeAttribute('class');
                }

                element.className = 'active';
                currentPage       = element.textContent;
                showPage(currentPage, recordsList.children);
                
            }
        }
        
    });

    //Display initial configured page
    showPage(page, recordsList.children);
};


//Executes the initial function to render the page list with the corret configuration
appendPageLinks(currentPage);