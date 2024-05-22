let gridBody = document.getElementById('gridBody');

let myGrid = [];
let bombs = [];
let colors = ['black','blue','green','red','purple','orange','aqua','']
function GenerateGrid()
{
    for(let r=0; r<size; r++)
    {
        let newRow = document.createElement('tr');
        let rowList = [];
        for(let c=0; c<size; c++)
        {
            let cell = document.createElement('td');
            cell.id = r.toString()+c.toString();
            cell.textContent = 0;
            cell.addEventListener('mousedown',Click);
            cell.addEventListener('contextmenu',function(event){
                event.preventDefault();
            });
            newRow.appendChild(cell);
            rowList.push(0);
        }
        gridBody.appendChild(newRow);
        myGrid.push(rowList);
    }
    console.log(myGrid);
}
function GenerateBombs()
{
    while(bombs.length < n_bombs)
    {
        let r = Math.floor(Math.random() * size);
        let c = Math.floor(Math.random() * size);
        if(myGrid[r][c] == 0)
        {
            myGrid[r][c] = emo_bomb;
            bombs.push([r,c]);
        }
    }
}
function UpdateGrid()
{
    for(let r=0; r<size; r++)
    {
        for(let c=0; c<size; c++)
        {
            if(myGrid[r][c]==emo_bomb) PlusSurround(r,c);
        }
    }
    for(let r=0; r<size; r++)
    {
        for(let c=0; c<size; c++)
        {
            let cellID = r.toString()+c.toString();
            let cell = document.getElementById(cellID);
            cell.textContent = myGrid[r][c];
            cell.style.color = myGrid[r][c]==emo_bomb? 'black':colors[myGrid[r][c]];
        }
    }
}

function PlusSurroundHelper(r,c)
{
    if(0<=r && r<size && 0<=c && c<size)
    {
        if(myGrid[r][c]!=emo_bomb) myGrid[r][c]++;
    }
}
function PlusSurround(r,c)
{
    PlusSurroundHelper(r-1,c-1);
    PlusSurroundHelper(r-1,c);
    PlusSurroundHelper(r-1,c+1);
    PlusSurroundHelper(r-1,c-1);
    PlusSurroundHelper(r+1,c+1);
    PlusSurroundHelper(r+1,c-1);
    PlusSurroundHelper(r+1,c);
    PlusSurroundHelper(r+1,c+1);
}

GenerateGrid();
GenerateBombs();
UpdateGrid();