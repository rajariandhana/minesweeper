const size = 10;
const n_bombs = 10;
const emo_bomb = '💣'
const emo_flag = '⛳️'
let not_revealed = (size*size);
console.log(not_revealed);
const movR=[-1,-1,-1,0,0,1,1,1];
const movC=[-1,0,1,-1,1,-1,0,1];
let isPlaying=false;
let gridGenerated=false;
let gridBody = document.getElementById('gridBody');

let myGrid = [];
let revealed = [];
let bombs = [];
let colors = ['black','blue','green','red','purple','orange','aqua','pink','brown']
function Setup(event)
{
    console.log("Setup");
    let cell = event.target;
    let r = parseInt(cell.id.charAt(0),10);
    let c = parseInt(cell.id.charAt(1),10);
    
    GenerateBombs(r,c);

    let tds = gridBody.getElementsByTagName('td');
    for(let td of tds)
    {
        td.removeEventListener('mousedown',Setup);
        td.addEventListener('mousedown',CellClick);
    }

    isPlaying = true;
    CellClick(event);

}
function CellClick(event)
{
    if(!isPlaying) return;
    let cell = event.target;
    let r = parseInt(cell.id.charAt(0),10);
    let c = parseInt(cell.id.charAt(1),10);
    
    if(event.button===0) //left click
    {
        if(revealed[r][c]) return;
        if(cell.textContent==emo_flag) return;
        else if(myGrid[r][c]==0)
        {
            BFS(r,c);
        }
        else if(myGrid[r][c]==emo_bomb)
        {
            RevealBombs();
            Win(false);
        }
        else if(NotZeroNotBomb(r,c))
        {
            BeigeCell(GetCell(r,c),myGrid[r][c]);
        }
        console.log(not_revealed);
        if(not_revealed<=n_bombs)
        {
            Win(true);
        }
    }
    else if(event.button === 2) //right click
    {
        // event.target.style.backgroundColor = "blue";
        Flag(cell,r,c);
    }
}

function Flag(cell,r,c)
{
    //must use text content, otherwise myGrid overwritten
    if(!revealed[r][c])
    {
        if(cell.textContent==emo_flag)
        {
            cell.textContent='';
        }
        else
        {
            cell.textContent=emo_flag;
        }
    }
    
}
function Win(win)
{
    let mes = document.getElementById('message');
    isPlaying=false;
    if(win)
    {
        mes.textContent = 'Congrats';
    }
    else
    {
        mes.textContent = ':(';
    }
}