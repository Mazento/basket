const items = document.querySelectorAll('.item');
const dropArea = document.querySelector('.drop-area');
let balance = 500;

items.forEach((curValue) => {
  curValue.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });
});

dropArea.addEventListener('dragover', e => {
  e.preventDefault();  
  e.currentTarget.classList.add("dragover");
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  e.currentTarget.classList.remove("dragover");
  const itemId = e.dataTransfer.getData('text/plain');

  const selectedItem = document.querySelector(`#${itemId}`);
  const itemPrice = selectedItem.dataset.price;
  const basketItem = selectedItem.cloneNode(true);
  basketItem.id = `${basketItem.id}_basket`;

  if ((balance - itemPrice) >= 0) {
    balance -= itemPrice;

    if (!document.querySelector(`#${basketItem.id}`))
      dropArea.children[0].appendChild(basketItem);

    let itemCount = selectedItem.dataset.count ? parseInt(selectedItem.dataset.count) + 1 : 1;
    selectedItem.dataset.count = itemCount;
    const txtCount = document.querySelector(`#${basketItem.id} .text-count`);
    txtCount.textContent = "x" + itemCount;
  }

  else
    alert('Not enough $')

  const txtBalance = document.querySelector(`#balance-text`);
  txtBalance.textContent="Balance: $" + balance;
});

dropArea.addEventListener('dragleave', (e) => {
  e.currentTarget.classList.remove("dragover");
});