const $ = selector => document.querySelector(selector);

const generateTable = () => {
    const $table = document.createElement('table');
    updateTable($table, prompt('ROW 입력'), prompt('COL 입력'));
    $('.content-table').appendChild($table);
};

const updateTable = (table, rowSize, colSize) => {
    for (let currentRow = 0; currentRow < rowSize; currentRow++) {
        const $tr = document.createElement('tr');
        for (let currentCol = 0; currentCol < colSize; currentCol++) {
            $tr.appendChild(generateTd(currentRow, currentCol, colSize));
        }
        table.appendChild($tr);
    }
};

const generateTd = (currentRow, currentCol, colSize) => {
    const $td = document.createElement('td');
    $td.appendChild(generateBtn('btn-td', 'ADD', colSize));
    $td.insertAdjacentElement('beforeend', generateSpan(currentRow, currentCol));
    return $td;
};

const generateBtn = (name, text, colSize) => {
    const btn = document.createElement('button');
    btn.className = name;
    btn.innerText = text;
    btn.onclick = addRow(colSize);
    return btn;
};

const generateSpan = (currentRow, currentCol) => {
    const span = document.createElement('span');
    span.innerHTML = `ROW${currentRow + 1} COL${currentCol + 1}`;
    return span;
}

let addition = -1;
let colCount = 1;

const updateColCount = (colSize) => {
    if (colCount == 1 || colCount == colSize) {
        addition *= -1;
    }
    colCount += addition;
};

const addRow = ((colSize) => {
    return function(event) {
        event.target.classList.toggle('color_inverted');

        const currentTable = event.target.parentElement.parentElement.parentElement;
        const extraRowSize = currentTable.childNodes.length;
        const newTr = document.createElement('tr');
        
        for (let currentCol = 0; currentCol < colCount; currentCol++) {
            newTr.appendChild(generateTd(extraRowSize, currentCol, colSize));
        }
        currentTable.appendChild(newTr);
        updateColCount(colSize);
    };
});

$('.btn-table').addEventListener('click', generateTable);