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

let total;
let productOf_QxP;
const items             = [];
const calculatedPrices  = [];
let purchasedQuantities = 0;

function shoppingCalc(event) {
    event.preventDefault();
    const regex = /^[a-zA-Z]+$/;
    const onlyLetters = regex.test(orderItem.value.trim());

    // validate input fields
    if (orderItem.value.trim() === '' || !onlyLetters || quantity.value.trim() === '' || price.value.trim() === '') {
        backdrop.classList.add('open');
        modal.classList.add('open');
    } else {
        showCurrentTotal();
        createTableRows();
        clearAll();
    };

}

function showCurrentTotal() {
     
    /*==============================================================
        this section shows the accumulated Price of goods on table
    ================================================================ */

    // convert quantity and price to datatype number 
    const intQuantity = parseInt(quantity.value);
    const floatPrice = parseFloat(price.value);

    // multiply quantity by price to get actuall price of order
    productOf_QxP = intQuantity * floatPrice;

    // store all product of quantities and prices in array;
    calculatedPrices.push(productOf_QxP);

    // get accumulated price of all orders
    total = calculatedPrices.reduce((acc, nextValue) => {
        return acc + nextValue;
    }, 0);
    // append text node to div, which shows the current total value
    showCurrentSum.textContent = `Accumulated Price is: $${total.toFixed(2)}`;

    /*==============================================================
        this section shows the total quantities of goods on table
    ================================================================ */
   
    purchasedQuantities += intQuantity;
    if (purchasedQuantities === 1) {
        showQs.textContent = `You Have ${purchasedQuantities} Quantity Of Item on Table`;
    } else {
        showQs.textContent = `You Have ${purchasedQuantities} Quantities Of Item(s) on Table`;
    }

    /*==============================================================
        this section shows the item count on table;
    ================================================================ */
    items.push(orderItem.value);
    if (items.length === 1) {
        itemsCount.textContent = `${items.length} Order on Table.`;
    } else {
        itemsCount.textContent = `${items.length} Orders on Table`
    }
}

function createTableRows() {

    // create tr element for orders
    const tableRow = document.createElement('tr');
    const tableData = document.createElement('td');
    const tableData2 = document.createElement('td');
    const tableData3 = document.createElement('td');
    const tableData4 = document.createElement('td');

    tableRow.className = 'newOrder';
    
    // append text node to each tr
    tableData.textContent = orderItem.value;
    tableData2.textContent = `$${parseFloat(price.value).toFixed(2)}`;
    tableData3.textContent = quantity.value;
    tableData4.textContent = `$${productOf_QxP.toFixed(2)}`;

    tableRow.appendChild(tableData);
    tableRow.appendChild(tableData2);
    tableRow.appendChild(tableData3);
    tableRow.appendChild(tableData4);
    table.appendChild(tableRow);
}

function clearAll() {
    // set input field, to clear all inputs
    orderItem.value = null;
    quantity.value = null;
    price.value = null;
}

function closeModal() {
    backdrop.classList.remove('open');
    modal.classList.remove('open');
}

function deleteAllOrders(event) {
    const tableRow = Array.from(event.target.nextElementSibling.nextElementSibling.children);
    tableRow.forEach(rows => {
        if (rows.className === "newOrder") {
            // reset all entries;
            items.length = 0;
            purchasedQuantities = 0;
            calculatedPrices.length = 0;

            // remove table rows
            rows.remove();

            // show new text 
            itemsCount.textContent = `All Items On Table Deleted`;
            showQs.textContent = `All Quantities On Table Deleted`;
            showCurrentSum.textContent = `Accumulated Price is: $0.0`;

        }
        
    });

}