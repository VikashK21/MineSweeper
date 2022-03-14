const box = [];

for (let tiles = 0; tiles < 9; tiles++) {
    let group_tiles = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    box.push(group_tiles)
}

const bom = function () {
    for (let groupOrder = 0; groupOrder < box.length; groupOrder++) {
        let totalBom = Math.floor(Math.random() * 4);
        for (let bom_p = 0; bom_p < totalBom; bom_p++) {
            let bomPlace = Math.floor(Math.random() * 9 );
            box[groupOrder][bomPlace] = 'BoM'
        }
    }
}

bom()

const number = function () {
    for (let row = 0; box.length > row; row++) {
        if (box[row].includes('BoM')) {
            for (let tile = 0; box[row].length > tile; tile++) {
                if (box[row][tile] === 'BoM') {
                    // same left-row...
                    if (tile !== 0 && (box[row][tile - 1] !== 'BoM')) {
                        box[row][tile - 1] += 1;
                    }
                    // before left-row...
                    if(row !== 0 && (box[row - 1][tile - 1]!=='BoM')) {
                        box[row - 1][tile - 1] += 1;
                    }
                    // before top-row...
                    if (row !== 0 && (box[row - 1][tile] !== 'BoM')) {
                        box[row - 1][tile] += 1;
                    }
                    // same right-row...
                    if ((tile !== (box[row].length - 1)) && (box[row][tile + 1] !== 'BoM')) {
                        box[row][tile + 1] += 1;
                    }
                    // before right-row...
                    if (row !== 0 && (tile !== (box[row].length - 1)) && (box[row-1][tile + 1] !== 'BoM')) {
                        box[row-1][tile + 1] += 1;
                    }
                    // after bottom-row...
                    if (row !== (box.length - 1) && (box[row + 1][tile] !== 'BoM')) {
                        box[row + 1][tile] += 1;
                    }
                    // after right-row...
                    if ((row !== (box.length - 1)) && (tile !== (box[row].length - 1)) && (box[row + 1][tile+1] !== 'BoM')) {
                        box[row + 1][tile+1] += 1;
                    }
                    // after left-row...
                    if (row !== 0 && (row !== (box.length - 1)) && (box[row + 1][tile-1] !== 'BoM')) {
                        box[row + 1][tile-1] += 1;
                    }
                }
            }
        }
    }
}
number();
console.log(box);

function callMe(e) {
    let arr = (this.id).split(',')
    let r = Number(arr[0])
    let rT = Number(arr[1])
    console.log(this.id)
    const tag = document.getElementById(this.id)
    if(box[r][rT]==='BoM') {
        tag.style = `height: 20px; width: 20px;background-color: rgb(231, 214, 214);`
        tag.innerHTML = `<img src="./bomb.png" alt="BoM" width="50px" style="margin: 1px;">`
        // alert('😕 --> try again...')
    }
    else {
        tag.innerHTML = `${box[r][rT]}`
        tag.style = `height: 30px; width: 30px;background-color: rgb(231, 214, 214);`

    }
    
}

const body = document.querySelector('center').childNodes[3]
body.style = 'height: 560px; width: 650px; background-color: rgb(160, 180, 140); '
console.log(body)
const area = 9;
let times = 1;
for (let a = 0; area > a; a++) {
    const tr = document.createElement('tr');
    // tr.style=`display: flex;`
    for (let b = 0; area > b; b++) {
        const td = document.createElement('th');
        td.setAttribute('id', `${a},${b}`)
        if(box[a][b]!=='BoM') {
            console.log('bom')
            td.setAttribute('class', `class${times}`)
            // console.log(td)
        }
        else {
            times++;
        }
        td.innerHTML = '';
        // td.innerHTML = `${box[a][b]}`;
        
        td.style = 'height: 52px; width: 52px;'
        tr.appendChild(td)
    }
    body.appendChild(tr)
}

var row = 0;
var rowT = 0;
for (let row = 0; box.length>row; row++) {
    for (let rowT = 0; box[row].length>rowT; rowT++) {
        const element = document.getElementById(`${row},${rowT}`)
        element.addEventListener('click', callMe);

    }

}

