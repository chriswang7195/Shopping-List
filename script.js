const searchBar = document.querySelector('.searchbar');
const delay = 250;

function getListItem(item) {
  return item.closest('.list-item');
}

function updateCheckedItemsCount() {
let collapsible = document.querySelector('.collapsible');
let checkedItemsCount = document.querySelectorAll('.list-item.checked').length;

if (checkedItemsCount === 0) {
  collapsible.classList.add('hidden');
  } else {
    collapsible.classList.remove('hidden');
    collapsible.querySelector('.checked-items-count').textContent = ` ${checkedItemsCount} checked off`;
  }
}

function handleAdd(item) {
  if (item === '') return;

  let li = `<li class="list-item"><span class="item">${item}</span>` +
                 '<button class="checkmark" type="button"></button>' +
                 '<button class="trashcan" type="button"></button></li>';

  document.querySelector('.list').innerHTML += li;
}

function handleDelete(item) {
  getListItem(item).remove(); 
  updateCheckedItemsCount();
}

function handleCheck(item) {
  let listItem = getListItem(item);
  document.querySelector('.checked-items-list').append(listItem);

  listItem.classList.add('checked');
  listItem.querySelector('.checkmark').classList.add('addBtn');

  updateCheckedItemsCount();
}

function handleCollapse(element) {
  if (!!element.closest('.collapsible') && !btn(element)) {
    document.querySelector('.collapse').classList.toggle('active');
    document.querySelector('.checked-items-list').classList.toggle('hidden');
  }
}

function toggleOverlay(element) {
  let overlay = document.querySelector('.overlay');

  if (element.classList.contains('option')) {
    console.log(true);
    overlay.classList.remove('hidden');
  } else if (element.classList.contains('overlay') ||
             element.classList.contains('uncheck-all') ||
             element.classList.contains('delete-all')) {
      overlay.classList.add('hidden');
    closeOption();
  }
}

function handleOption() {
  let optionsDropdown = document.querySelector('.options-dropdown');
  let optionsXY = document.querySelector('.option').getBoundingClientRect();
  
  optionsDropdown.style.top = `${optionsXY.y + optionsXY.height}px`;
  optionsDropdown.style.left = `${optionsXY.x}px`;
  optionsDropdown.classList.remove('hidden');
}

function closeOption() {
  document.querySelector('.options-dropdown').classList.add('hidden');
}

function handleDeleteAll() {
 let checkedItems = document.querySelectorAll('.list-item.checked');
 checkedItems.forEach((item) => { handleDelete(item) });

 closeOption();
}

function handleUncheckAll() {
  let checkedItems = document.querySelectorAll('.list-item.checked');
  checkedItems.forEach((item) => { handleUncheck(item) });

  closeOption();
}

function handleUncheck(item) {
  handleAdd(getListItem(item).textContent);
  handleDelete(item);
}

function btn(element) {
  if (element.tagName === 'BUTTON') {
    return element.classList;
  } else {
    return false;
  }
}

function handleBtn(element) {
  let action = btn(element);

  if (!!action) {
    if (action.contains('addBtn')) {
      if (!!getListItem(element)) {
        handleUncheck(element);
      } else {
        handleAdd(searchBar.value);
        searchBar.value = '';
      }
    } else if (action.contains('trashcan')) {
      handleDelete(element);
    } else if (action.contains('checkmark')) {
      handleCheck(element)
    } else if (action.contains('option')) {
      handleOption();
    } else if (action.contains('uncheck-all')) {
      handleUncheckAll();
    } else if (action.contains('delete-all')) {
      handleDeleteAll();
    }
  }
}

function clickBtn(element) {
  if (!!btn || !!element.closest('.collapsible')) {
    element.classList.add('clicked');  
    setTimeout(() => { element.classList.remove('clicked') }, delay);
  }
}

document.querySelector('form').addEventListener('submit', (event) => { 
  event.preventDefault(); 
  handleAdd(searchBar.value);
  searchBar.value = '';
});

document.addEventListener('mousedown', (event) => {
  toggleOverlay(event.target);
  clickBtn(event.target);
  handleCollapse(event.target);
  setTimeout(() => {  handleBtn(event.target) }, delay);
});

