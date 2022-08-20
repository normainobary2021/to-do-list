// import _ from 'lodash';
import './style.css';

const myArray = [
  {
    id: 0,
    description: 'Write a To-Do list function',
  },
  {
    id: 1,
    description: 'Push changes and submit for Review',
  },
  {
    id: 2,
    description: 'Get project reviewed and approves',
  },
  {
    id: 3,
    description: 'Merge branch to main',
  },
];

document.querySelector('.generate-to-do').innerHTML = myArray.map((items) => `<div class="full-list">
  <div class="to-do">
  <input type="checkbox" id="chkBx">
  <p class="item-description" id="card1">${items.description}</p> 
  </div>`).join('');
