let todoList = JSON.parse(localStorage.getItem('myTodoList')) || [];
let listHtml = document.querySelector('.todo-list');
let noteInput = document.querySelector('.new-note');
renderList();

// listHtml.addEventListener('dblclick', function() {
  
//   if (event.target.nodeName !== 'LABEL') return;

//   let labelToEdit = event.target;
//   let itemToEdit = labelToEdit.closest('li');
//   let listItems = document.querySelectorAll('li');
//   let listItemNumber = [].indexOf.call(listItems, itemToEdit);
//   let editInput = document.createElement('input');
//   let editedNoteText = labelToEdit.innerHTML;
  
//   itemToEdit.classList.add('hidden');
//   listHtml.insertBefore(editInput, itemToEdit);
//   editInput.value = editedNoteText;

//   editInput.onchange = function() {
//     todoList[listItemNumber].noteText = editInput.value;
//     renderList();
//   };
// });

// listHtml.addEventListener('click', function() {
  
//   if (event.target.nodeName !== 'INPUT') return;

//   let inputToCheck = event.target;
//   let itemToEdit = inputToCheck.closest('li');
//   let listItems = document.querySelectorAll('li');
//   let listItemNumber = [].indexOf.call(listItems, itemToEdit);
  
//   todoList[listItemNumber].done = inputToCheck.checked;
//   renderList();
// });

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

    let itemButton = newItemDiv.querySelector('button');
    let itemCheckbox = newItemDiv.querySelector('input');
    let labelToEdit = newItemDiv.querySelector('label');
    
    itemButton.onclick = function() {
      todoList.splice(noteNumber, 1);
      renderList();
    };
   
    itemCheckbox.onclick = function () {
      todoList[noteNumber].done = itemCheckbox.checked;
      renderList();
    }

    labelToEdit.ondblclick = function() {
      let itemToEdit = labelToEdit.closest('li');
      let editInput = document.createElement('input');
      let editedNoteText = labelToEdit.innerHTML;
  
      itemToEdit.classList.add('hidden');
      listHtml.insertBefore(editInput, itemToEdit);
      editInput.value = editedNoteText;

      editInput.onchange = function() {
        todoList[noteNumber].noteText = editInput.value;
        renderList();
      } 
    } 
       
    itemCheckbox.checked = note.done;
  }


  let serialTodoList = JSON.stringify(todoList); 
  localStorage.setItem('myTodoList', serialTodoList);
}

noteInput.onchange = function() {
  if (noteInput.value) {
    let newNote = { noteText: noteInput.value, done: false };
    todoList.push(newNote);
    noteInput.value = '';
    renderList();
  }
}
