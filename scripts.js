
function appendInputToRows() {
  const rows = document.querySelectorAll('.row');

  rows.forEach(row => {
    const input = document.createElement('textarea');
    input.type = 'text'; // Set type to 'text'
    input.addEventListener("input", function(){
      resizeInput(this);
    })
    row.appendChild(input);
  });
}

function resizeInput(input) {
    input.style.height = '0px';
    input.style.height = input.scrollHeight + 'px';
    input.parentElement.style.height = input.scrollHeight + 'px';
}
appendInputToRows();

function saveTextareaValues() {
  const textareas = document.querySelectorAll('textarea');
  textareas.forEach((textarea, index) => {
    let id = textarea.parentElement.id;
    localStorage.setItem(`field-${id}`, textarea.value);
  });
}

// Function to load values from localStorage
function loadTextareaValues() {
  const textareas = document.querySelectorAll('textarea');
  textareas.forEach((textarea, index) => {
    let id = textarea.parentElement.id;
    const savedValue = localStorage.getItem(`field-${id}`);
    const showAnswers = getShowAnswersFromURL()
    let { answer, example } = textarea.parentElement.dataset;
    console.log({ example, answer })

    if (showAnswers) {
      textarea.value = answer;
    }
    else if (savedValue) {
      textarea.value = savedValue;
    }
    else if (example && answer) {
      textarea.value = answer;
    }
    resizeInput(textarea);
  });
}

function getShowAnswersFromURL() {
  const params = new URLSearchParams(window.location.search); // Parse the query string
  const showAnswers = params.get('show_answers'); // Get the 'show_answers' parameter
  return showAnswers === 'true'; // Convert the string to a boolean
}


window.addEventListener('load', loadTextareaValues);

document.querySelectorAll('textarea').forEach(textarea => {
  textarea.addEventListener('input', saveTextareaValues);
});
