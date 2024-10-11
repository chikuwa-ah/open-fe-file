let result = [];
function arrayCSV(str) {
    let tmp = str.split('\n');
    for (let i = 0; i < tmp.length; i++) {
        result[i] = tmp[i].split(',');
    };
    result.pop();
    document.getElementById('date').textContent = `実施日：${result[1][7]}`;
    displayCSV();
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
    newChild.appendChild(newText);
    if (text === '○') {
        newChild.style.backgroundColor = '#6cd0c6';
        return true;
    } else if (text === '×') {
        newChild.style.backgroundColor = '#f67171';
        return false;
    };
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

const displayCSV = () => {
    const origin = document.getElementById('origin');
    const originChilds = origin.children;
    const classifcation = ['テクノロジ系', 'マネジメント系', 'ストラテジ系'];
    let classSum = [0, 0, 0], classScore = [0, 0, 0];
    let correct = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < result.length; j++) {
            const authenticity = generateCH(originChilds[i], result[j][i]);
            correct += authenticity ? 1 : 0;
        };
    };
    for (let i = 0; i < result.length; i++) {
        splitLink(originChilds[5], result[i][5]);
    };
    for (let i = 1; i < result.length; i++) {
        const cl = classifcation.indexOf(result[i][2]);
        classSum[cl]++;
        if (result[i][1] === '○') {
            classScore[cl]++;
        };
    };

    const rate = correct / (result.length - 1);
    const percent = Math.round(rate * 10000) / 100;
    const index = document.getElementById('index').children;
    index[0].textContent = '全体';
    const outChild = document.getElementById('displayInfo').children;
    outChild[0].textContent = `${correct}/${result.length - 1}  正答率：${percent}%`;
    for (let i = 0; i < classSum.length; i++) {
        const classRate = classScore[i] / classSum[i];
        const classPercent = Math.round(classRate * 10000) / 100;
        outChild[i + 1].textContent = `${classScore[i]}/${classSum[i]}  正答率：${classPercent}%`;
        outChild[i + 1].style.display = 'block';
        index[i + 1].style.display = 'block';
    };
};

const displaySelect = (select) => {
    const origin = document.getElementById('origin');
    const originChilds = origin.children;
    const lineArr = [0];
    let correct = 0;
    for (let i = 1; i < result.length; i++) {
        if (result[i][select.num] === select.text) {
            lineArr.push(i);
        };
    };

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < lineArr.length; j++) {
            const authenticity = generateCH(originChilds[i], result[lineArr[j]][i]);
            correct += authenticity ? 1 : 0;
        };
    };
    for (let i = 0; i < lineArr.length; i++) {
        splitLink(originChilds[5], result[lineArr[i]][5]);
    };

    const rate = correct / (lineArr.length - 1);
    const percent = Math.round(rate * 10000) / 100;
    const index = document.getElementById('index').children;
    index[0].textContent = select.text;
    const outChild = document.getElementById('displayInfo').children;
    outChild[0].textContent = `${correct}/${lineArr.length - 1}  正答率：${percent}%`;
    for (let i = 0; i < 3; i++) {
        outChild[i + 1].style.display = 'none';
        index[i + 1].style.display = 'none';
    };
};

const removeElement = () => {
    const origin = document.getElementById('origin');
    const originChilds = origin.children;
    for (let r = 0; r < 6; r++) {
        while (originChilds[r].firstChild) {
            originChilds[r].removeChild(originChilds[r].firstChild);
        };
    };
};

document.getElementById('out').addEventListener('click', (e) => {
    const id = Number(e.target.id);
    if (isNaN(id) || id === 0) {
        return;
    };
    if (id === 4) {
        removeElement();
        displayCSV();
        return;
    };
    const ofClass = {
        num: id,
        text: e.target.textContent
    };
    removeElement();
    displaySelect(ofClass);
});

document.getElementById('inputFile').addEventListener('change', (e) => {
    document.getElementById('origin').style.display = 'flex';

    const result = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(result);
    reader.addEventListener('load', () => {
        removeElement();
        const arrayBuffer = reader.result;
        const decoder = new TextDecoder('shift-jis');
        const decodedText = decoder.decode(arrayBuffer);
        arrayCSV(decodedText);
    });
});

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('origin').style.display = 'none';
});