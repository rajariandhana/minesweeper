const size = 10;
const n_bombs = 10;
const emo_bomb = '💣'
const emo_flag = '⛳️'
let movR=[-1,-1,-1,0,0,1,1,1];
let movC=[-1,0,1,-1,1,-1,0,1];
function Click(event)
{
    let evid = event.target.id;
    let r = parseInt(evid.charAt(0),10);
    let c = parseInt(evid.charAt(1),10);
    let cell = document.getElementById(evid);
    
    if(event.button===0) //left click
    {
        // event.target.style.backgroundColor = "red";
        if(myGrid[r][c]==0)
        {
            BFS(r,c);
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
    if(cell.textContent==emo_flag)
    {
        cell.textContent=myGrid[r][c];
    }
    else
    {
        cell.textContent=emo_flag;
    }
}