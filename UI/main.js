const orderItem       = document.querySelector('#item');
const quantity        = document.querySelector('#quantity');
const price           = document.querySelector('#price');
const addItemButton   = document.querySelector('#addItem');
const resetInputsBtn  = document.querySelector('#resetFields');
const showCurrentSum  = document.querySelector('.current__subtotal');
const table           = document.querySelector('table');
const backdrop        = document.querySelector('.backdrop');
const modal           = document.querySelector('.modal');
const modalBtn        = document.querySelector('.modal__action-btn');
const itemsCount      = document.querySelector('.itemsCount');
const showQs          = document.querySelector('.showquantities');
const deleteOrders    = document.querySelector('.delete');


addItemButton.addEventListener('click', shoppingCalc);
resetInputsBtn.addEventListener('click', clearAll);
modalBtn.addEventListener('click', closeModal);
deleteOrders.addEventListener('click', deleteAllOrders);