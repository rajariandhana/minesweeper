const size = 10;
const n_bombs = 10;
const emo_bomb = '💣'
const emo_flag = '⛳️'

function Click(event)
{
    let evid = event.target.id;
    let r = evid.charAt(0);
    let c = evid.charAt(1);
    let cell = document.getElementById(evid);
    
    if(event.button===0) //left click
    {
        // event.target.style.backgroundColor = "red";
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