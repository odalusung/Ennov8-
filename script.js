

window.addEventListener('scroll', reveal);
window.addEventListener('scroll', revealX);
window.addEventListener('scroll', revealY);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) { // corrected spelling of 'length'

        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

function revealX() {
    var reveals = document.querySelectorAll('.revealx');

    for (var i = 0; i < reveals.length; i++) { // corrected spelling of 'length'

        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

function revealY() {
    var reveals = document.querySelectorAll('.reveal_y');

    for (var i = 0; i < reveals.length; i++) { // corrected spelling of 'length'

        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const triggerElement = document.getElementById('separator');
    const fixedElement = document.querySelector('.background-clip');

    const triggerPosition = triggerElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Determine the current scroll position
    let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (triggerPosition < windowHeight) {
            fixedElement.classList.add('moved-up');
            console.log("moved")
    }
    else
    fixedElement.classList.remove('moved-up');

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
});


 // Get the elements
const bar = document.querySelector('.fa-bars');
const navBar = document.querySelector('.nav-bar');

// Toggle the 'active' class on click
bar.onclick = function() {
    navBar.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function() {
    // Get elements for toggling the nav-bar
    const bar = document.querySelector('.fa-bars');
    const navBar = document.querySelector('.nav-bar');
    
    // Toggle the nav-bar active state on click
    bar.onclick = function() {
        navBar.classList.toggle("active");
    }

    // Handle dropdowns for mobile devices
    const dropdowns = document.querySelectorAll('.dropdown > a');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            // If the window width is small, prevent default link behavior and toggle dropdown
            if (window.innerWidth <= 1024) {
                const dropdownContent = this.nextElementSibling; // Get the dropdown content

                // Check if the dropdown is already open
                if (!dropdownContent.classList.contains('show-dropdown')) {
                    e.preventDefault(); // Prevent navigation only if dropdown is not open
                }

                // Toggle the dropdown visibility class
                dropdownContent.classList.toggle('show-dropdown');
                
                // Rotate the dropdown icon (optional)
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.toggle('rotate-icon');
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const positionTitles = document.querySelectorAll('.position-title');
    const subPositionTitles = document.querySelectorAll('.position-title1');
  
    // Function to update the height of the parent .position-info based on its total content height
    function updateParentHeight(element) {
      const parentPosition = element.closest('.position');
      if (parentPosition) {
        const positionInfo = parentPosition.querySelector('.position-info');
        // Remove the max-height restriction temporarily to measure full height
        positionInfo.style.maxHeight = 'none';
        // Calculate the new height based on content
        const updatedHeight = positionInfo.scrollHeight+3000 + 'px';
        // Reapply the calculated max-height
        positionInfo.style.maxHeight = updatedHeight;
      }
    }
  
    // Toggle main positions
    positionTitles.forEach(title => {
      title.addEventListener('click', () => {
        const parentPosition = title.parentElement;
        const positionInfo = parentPosition.querySelector('.position-info');
  
        // Toggle the active class for the main position
        parentPosition.classList.toggle('active');
  
        // Dynamically set max-height based on content
        if (parentPosition.classList.contains('active')) {
          positionInfo.style.maxHeight = positionInfo.scrollHeight+1000 + 'px';
        } else {
          positionInfo.style.maxHeight = '0';
        }
      });
    });
  
    // Toggle sub-positions
    subPositionTitles.forEach(subTitle => {
      subTitle.addEventListener('click', () => {
        const parentSubPosition = subTitle.parentElement;
        const subPositionInfo = parentSubPosition.querySelector('.position-info1');
  
        // Toggle the active class for the sub-position
        parentSubPosition.classList.toggle('active');
  
        // Dynamically set max-height based on content
        if (parentSubPosition.classList.contains('active')) {
          subPositionInfo.style.maxHeight = subPositionInfo.scrollHeight+1000 + 'px';
          // Update the parent .position-info height after setting sub-position height
          updateParentHeight(subPositionInfo);
        } else {
          subPositionInfo.style.maxHeight = '0';
          // Update the parent .position-info height after collapsing sub-position
          updateParentHeight(subPositionInfo);
        }
      });
    });
  });


/**  document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    console.log('Form submission prevented'); // Add this line

    var formData = new FormData(this);

    fetch('contact.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Display the response message
        document.getElementById('result').innerHTML = data;
    })
    .catch(error => {
        // Handle errors
        document.getElementById('result').innerHTML = "<div class='error'>An error occurred. Please try again later.</div>";
    });
});
*/


//APPLICATION FORM

/* 
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded');  // Check if the script is running

    const form = document.querySelector('#applicationForm');  // Ensure the form is selected
    if (!form) {
        console.error('Form not found!');
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent default form submission
        console.log('Form submission intercepted');  // Check if form submission is intercepted

        const formData = new FormData(this);  // Create FormData object from form

        fetch('http://localhost:8000/2.0/Application/application.php', {  // Send the form data to application.php
            method: 'POST',
            body: formData
        })
        .then(response => response.json())  // Parse JSON response
        .then(data => {
            const resultMessage = document.getElementById('result-message');  // Get result div

            // Handle success or error based on the response
            if (data.status === 'success') {
                resultMessage.textContent = data.message;
                resultMessage.style.color = 'green';
            } else {
                resultMessage.textContent = data.message;
                resultMessage.style.color = 'red';
            }

            console.log(data);  // Log the response
        })
        .catch(error => {
            const resultMessage = document.getElementById('result-message');
            resultMessage.textContent = 'An error occurred while submitting the form.';
            resultMessage.style.color = 'red';
            console.error('Error:', error);
        });
    });
});
*/
