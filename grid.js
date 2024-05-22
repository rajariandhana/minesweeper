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
            if(myGrid[r][c]==emo_bomb)
            {
                for(let i=0; i<8; i++)
                {
                    PlusSurroundHelper(r+movR[i],c+movC[i]);
                }
            }
        }
    }
    for(let r=0; r<size; r++)
    {
        for(let c=0; c<size; c++)
        {
            let cell = GetCell(r,c);
            cell.textContent = myGrid[r][c];
            cell.style.color = myGrid[r][c]==emo_bomb? 'black':colors[myGrid[r][c]];
        }
    }
}

function PlusSurroundHelper(r,c)
{
    if(!CellValid(r,c)) return;
    if(myGrid[r][c] != emo_bomb) myGrid[r][c]++;
}
function CellValid(r,c)
{
    return (r<0 || r>=size || c<0 || c>=size)? false:true;
}

function BFS(r,c)
{
    let vis=[];
    for(let r=0;r<size;r++)
    {
        let rowVis=[];
        for(let c=0;c<size;c++) rowVis.push(false);
        vis.push(rowVis);
    }
    let q = new Queue();
    q.enqueue([r,c]);
    vis[r][c] = true;
    while(!q.isEmpty())
    {
        let cur = q.dequeue();
        let cr = cur[0];
        let cc = cur[1];
        if(myGrid[cr][cc]!=0) continue;
        let cell = GetCell(cr,cc);
        cell.textContent = 'VIS';
        for(let i=0;i<8;i++)
        {
            let nr = cr+movR[i];
            let nc = cc+movC[i];
            if(!CellValid(nr,nc)) continue;
            if(vis[nr][nc]) continue;
            if(myGrid[nr][nc]!=0) continue;
            q.enqueue([nr,nc]);
            console.log("push "+nr+" "+nc);
            vis[nr][nc]=true;
        }
    }

}
function GetCell(r,c)
{
    if(!CellValid) return null;
    let cellID = r.toString()+c.toString();
    let cell = document.getElementById(cellID);
    return cell;
}

GenerateGrid();
GenerateBombs();
UpdateGrid();