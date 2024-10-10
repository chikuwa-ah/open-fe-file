function getCSV() {
    let req = new XMLHttpRequest();
    req.open('get', './file/000.csv', true);
    req.send(null);

    req.onload = function () {
        arrayCSV(req.responseText);
    }
}

let result = [];
function arrayCSV(str) {
    let tmp = str.split('\n');
    let correct = 0, total = -1;

    for (let i = 0; i < tmp.length; i++) {
        result[i] = tmp[i].split(',');
        correct += result[i][1] === '○' ? 1 : 0;
        total++;
    };

    displayCSV(result, correct, total);
};

const generatePA = (origin) => {
    const newParent = document.createElement('div');
    newParent.classList.add('parent');
    newParent.classList.add('flex');
    origin.appendChild(newParent);
    return newParent;
};

const generateCH = (parent, text) => {
    const newChild = document.createElement('div');
    parent.appendChild(newChild);
    const newText = document.createElement('p');
    newText.textContent = text;
    if (text === '○') {
        newChild.style.backgroundColor = '#6cd0c6';
    } else if (text === '×') {
        newChild.style.backgroundColor = '#f67171';
    };
    newChild.appendChild(newText);
};

const splitLink = (parent, text) => {
    const newChild = document.createElement('div');
    parent.appendChild(newChild);
    const newText = document.createElement('a');
    const link = text.split('"');
    if (text != '出典') {
        newText.textContent = 'LINK';
        newText.href = link[3];
        newText.target = '_blank';
    } else {
        newText.textContent = '出典';
    };
    newChild.appendChild(newText);
};

const displayCSV = (result, correct, total) => {
    const origin = document.getElementById('origin');
    const originChilds = origin.children;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < result.length; j++) {
            generateCH(originChilds[i], result[j][i]);
        };
    };
    for (let i = 0; i < result.length; i++) {
        splitLink(originChilds[5], result[i][5]);
    };

    const rate = correct / (total);
    const percent = Math.round(rate * 10000) / 100;
    document.getElementById('rate').textContent = (`${correct}/${total}  正答率：${percent}%`);
};

const displayOfClass = (cl) => {
    const origin = document.getElementById('origin');
    const originChilds = origin.children;
    while (origin.firstChild) {
        origin.removeChild(origin.firstChild);
    }
    if (cl.cl === 0) {

    }
}

document.getElementById('out').addEventListener('click', (e) => {
    const id = Number(e.target.id);
    console.log(id);
    const ofClass = {
        cl: id
    };
    if (id > 0) {
        ofClass.text = e.target.textContent;
    };
    console.log(ofClass);
    displayOfClass(ofClass);
});

getCSV();