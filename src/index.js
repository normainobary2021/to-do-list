// import _ from 'lodash';
import './style.css';

class ToDoList {
#toDo;

constructor() {
  this.#toDo = [];
}

setToDo(toDo) {
  this.#toDo = toDo;
}

get ToDo() {
  return this.#toDo;
}

orderAgain() {
  for (let index = 0; index < this.#toDo.length; index += 1) {
    this.#toDo[index].id = index;
  }
}

AddToDo(item, doneToDo) {
  const id = this.#toDo.length;
  this.#toDo.push({
    item,
    doneToDo,
    id,
  });
}

DeleteToDo(id) {
  this.#toDo.splice(id, 1);
}

toDoListSaveLocal() {
  localStorage.setItem('toDo', JSON.stringify(this.#toDo));
}

loadFromLocalToDo() {
  const savedToDoItm = JSON.parse(localStorage.getItem('toDo'));

  if (Array.isArray(savedToDoItm)) {
    this.toDo = savedToDoItm;
    return true;
  }
  return false;
}
}

const myToDolist = new ToDoList();

myToDolist.loadFromLocalToDo();

function modificarBox(index, vlr) {
  myToDolist.ToDo[index].doneChk = vlr;
  myToDolist.toDoListSaveLocal();
}

function modifyDescription(index, vlr) {
  myToDolist.ToDo[index].item = vlr;
  myToDolist.toDoListSaveLocal();
}

const render = () => {
  document.querySelector('.generate-to-do').innerHTML = '';
  for (let index = 0; index < myToDolist.ToDo.length; index += 1) {
    const toDo = myToDolist.ToDo[index];

    const List = document.querySelector('.generate-to-do');
    const element = document.createElement('li');
    element.classList.add('eachToDo');
    const doneChk = document.createElement('input');
    doneChk.type = 'checkbox';
    const inputTask = document.createElement('input');
    inputTask.type = 'text';
    doneChk.classList.add('doneBox');
    inputTask.value = toDo.item;
    element.append(doneChk, inputTask);
    doneChk.setAttribute('id', toDo.id);
    inputTask.disabled = false;
    doneChk.checked = toDo.doneChk;
    if (doneChk.checked) {
      inputTask.style.textDecoration = 'line-through';
    }

    inputTask.addEventListener('change', () => {
      modifyDescription(index, inputTask.value);
    });

    doneChk.addEventListener('click', () => {
      modificarBox(index, doneChk.checked);

      if (doneChk.checked) {
        inputTask.style.textDecoration = 'line-through';
      } else {
        inputTask.style.textDecoration = 'none';
      }
    });

    List.appendChild(element);

    const deleteButton = document.createElement('button');

    // eslint-disable-next-line
    function deleteToDo() {
      const idToDelete = deleteButton.id;
      myToDolist.DeleteToDo(idToDelete);
      myToDolist.orderAgain();
      myToDolist.toDoListSaveLocal();
      render();
    }
    deleteButton.innerHTML = '<i class="fa fa-window-close" aria-hidden="true"></i>';
    deleteButton.classList.add('delButton');
    deleteButton.onclick = deleteToDo;
    deleteButton.id = toDo.id;
    element.appendChild(deleteButton);
  }
};

render();

const buttonCtrl = document.querySelector('.button');
buttonCtrl.addEventListener('click', () => {
  const titleTxtBx = document.getElementById('entry-to-do');
  const toDoTxt = titleTxtBx.value;
  myToDolist.AddToDo(toDoTxt, false);
  myToDolist.toDoListSaveLocal();
  titleTxtBx.value = '';
  render();
});
