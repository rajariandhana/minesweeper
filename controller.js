const size = 10;
const n_bombs = 10;
const emo_bomb = '💣'
const emo_flag = '⛳️'
let toReveal = (size*size) - n_bombs;
console.log(toReveal);
let movR=[-1,-1,-1,0,0,1,1,1];
let movC=[-1,0,1,-1,1,-1,0,1];
let isPlaying=false;
function Click(event)
{
    if(!isPlaying) return;
    let cell = event.target;

    let r = parseInt(cell.id.charAt(0),10);
    let c = parseInt(cell.id.charAt(1),10);
    
    if(event.button===0) //left click
    {
        if(revealed[r][c]) return;
        // event.target.style.backgroundColor = "red";
        if(myGrid[r][c]==0)
        {
            BFS(r,c);
        }
        else if(myGrid[r][c]==emo_bomb)
        {
            // GameOver
            RevealBombs();
            Win(false);
        }
        else if(NotZeroNotBomb(r,c))
        {
            // RevealCell(r,c);
            let cell = GetCell(r,c);
            BeigeCell(cell,myGrid[r][c]);
        }
        console.log(toReveal);
        if(toReveal<=0)
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
    if(win)
    {
        mes.textContent = 'Congrats';
    }
    else
    {
        mes.textContent = ':(';
    }
}
isPlaying = true;