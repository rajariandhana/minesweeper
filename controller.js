const size = 20;
const easy_r=8;
const easy_c=10;
const easy_b=10;
let n_rows=easy_r;
let n_cols=easy_c;
let n_bombs = easy_b;
const emo_bomb = '💣'
const emo_flag = '🏴‍☠️'
let not_revealed = (n_rows*n_cols);
const movR=[-1,-1,-1,0,0,1,1,1];
const movC=[-1,0,1,-1,1,-1,0,1];
let isPlaying=false;
let gridBody = document.getElementById('gridBody');
let n_mines = document.getElementById('n_mines');
n_mines.textContent = 'There are '+n_bombs+' '+emo_bomb;
// let finishDiv = document.getElementById('finishDiv');
let reset = document.getElementById('reset');
reset.style.display = 'none';
let mode = document.getElementById('mode');
mode.style.display = 'none';
let currentMode = emo_bomb;

let myGrid = [];
let revealed = [];
let bombs = [];
let colors = ['black','blue','green','red','purple','orange','aqua','pink','brown']
function Setup()
{
    myGrid = [];
    revealed = [];
    bombs = [];
}
function Mode()
{
    // if(!isPlaying) return;
    currentMode = (currentMode==emo_bomb)? emo_flag : emo_bomb;
    mode.textContent = 'Mode: '+currentMode;
}
function FirstClick(event)
{
    if(event.button!==0) return;
    // console.log("FirstClick");
    reset.style.display = 'flex';
    let cell = event.target;
    let parts = cell.id.split('_');
    let r = parseInt(parts[0],10);
    let c = parseInt(parts[1],10);
    
    if(window.innerWidth<=768)
    {
        mode.style.display='flex';
    }
    
    GenerateBombs(r,c);

    let tds = gridBody.getElementsByTagName('td');
    for(let td of tds)
    {
        td.removeEventListener('mousedown',FirstClick);
        td.addEventListener('mousedown',CellClick);
    }

    isPlaying = true;
    CellClick(event);
    timeDisplay.style.visibility = 'visible';
    StartStopwatch();
}
function CellClick(event)
{
    if(!isPlaying) return;
    let cell = event.target;
    let parts = cell.id.split('_');
    let r = parseInt(parts[0],10);
    let c = parseInt(parts[1],10);
    
    if(event.button===0 && currentMode===emo_bomb) //left click
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
        // console.log(not_revealed);
        if(not_revealed<=n_bombs)
        {
            Win(true);
        }
    }
    else if(event.button === 2 || currentMode===emo_flag) //right click
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
    StopStopwatch();
    isPlaying=false;
    mode.style.display = 'none';
    if(win)
    {
        reset.textContent = 'You win! play again';
    }
    else
    {
        reset.textContent = 'Oh no you lost, go play again';
    }
}

document.addEventListener('DOMContentLoaded',function(){
    GenerateGrid();
});