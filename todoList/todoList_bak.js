let todoList = JSON.parse(localStorage.getItem('myTodoList')) || [];
// let todoList = [{ noteText: 'notetext1', done: true }, { noteText: 'notetext2', done: false }];
let listHtml = document.querySelector('.todo-list');
renderList();

listHtml.addEventListener('dblclick', function() {
  if (event.target.nodeName !== 'LABEL') return;

  let labelToEdit = event.target;
  let itemToEdit = labelToEdit.closest('li');
  let listItems = document.querySelectorAll('li');
  let listItemNumber = [].indexOf.call(listItems, itemToEdit);
  let editInput = document.createElement('input');
  let editedNoteText = labelToEdit.innerHTML;
  
  itemToEdit.classList.add('hidden');
  listHtml.insertBefore(editInput, itemToEdit);
  editInput.value = editedNoteText;

  editInput.onchange = function() {
    labelToEdit.innerHTML = editInput.value;
    todoList[listItemNumber].noteText = editInput.value;
    editInput.remove();
    itemToEdit.classList.remove('hidden');
  };
});

listHtml.addEventListener('click', function() {
  
  if (event.target.nodeName !== 'INPUT') return;

  let inputToCheck = event.target;
  let itemToEdit = inputToCheck.closest('li');
  let listItems = document.querySelectorAll('li');
  let listItemNumber = [].indexOf.call(listItems, itemToEdit);
  
  todoList[listItemNumber].done = inputToCheck.checked;
});

function renderList() {
  while (listHtml.children[0]) {
    listHtml.children[0].remove();
  }

  for (let noteNumber in todoList) {
    let note = todoList[noteNumber];
    let newListItem = document.createElement('li');
    listHtml.appendChild(newListItem);

    let newItemDiv = document.createElement('div');
    newListItem.appendChild(newItemDiv);
    newItemDiv.classList.add('note-row');

    newItemDiv.innerHTML = `<input type="checkbox">
                            <label>${note.noteText}</label>
                            <button class="remove-item"><img src="img/close-cross.png"></button>`;

    itemButton = newItemDiv.querySelector('button');
    
    itemButton.onclick = function() {
      this.closest('div').remove();
      todoList.splice(noteNumber, 1);
    };

    let itemCheckbox = newItemDiv.querySelector('input');
    itemCheckbox.checked = note.done;
  }

  let serialTodoList = JSON.stringify(todoList); 
  localStorage.setItem('myTodoList', serialTodoList);
}

let noteInput = document.querySelector('.new-note');
noteInput.onchange = function() {
  if (noteInput.value) {
    let newNote = { noteText: noteInput.value, done: false };
    todoList.push(newNote);
    noteInput.value = '';
    renderList();
  }
};
