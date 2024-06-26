// aowkoawkoawkow
function GenerateGrid()
{
    let flip=true;
    for(let r=0; r<size; r++)
    {
        let newRow = document.createElement('tr');
        let rowList = [];
        let revList = [];
        for(let c=0; c<size; c++)
        {
            let cell = document.createElement('td');
            cell.id = r.toString()+c.toString();
            cell.textContent = '';
            cell.addEventListener('mousedown',FirstClick);
            cell.addEventListener('contextmenu',function(event){
                event.preventDefault();
            });
            newRow.appendChild(cell);
            rowList.push(0);
            revList.push(false);

            cell.classList.add('unrevealed');
            // if(flip) cell.classList.add('light');
            // else cell.className = 'dark';
            flip = !flip;
        }
        if(size%2==0) flip = !flip;
        gridBody.appendChild(newRow);
        myGrid.push(rowList);
        revealed.push(revList);
    }
    // console.log(myGrid);
}
function GenerateBombs(safeR,safeC)
{
    while(bombs.length < n_bombs)
    {
        let r = Math.floor(Math.random() * size);
        let c = Math.floor(Math.random() * size);
        if(r==safeR && c==safeC) continue;
        if(myGrid[r][c] == 0)
        {
            myGrid[r][c] = emo_bomb;
            bombs.push([r,c]);
        }
    }
    // console.log("bombs generated");
    UpdateGrid();
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
            // cell.textContent = myGrid[r][c];
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
        let cell = GetCell(cr,cc);
        
        if(myGrid[cr][cc]==emo_bomb) continue;
        if(NotZeroNotBomb(cr,cc))
        {
            BeigeCell(cell,myGrid[cr][cc]);
            continue;
        }
        else
        {
            BeigeCell(cell,'');
        }
        for(let i=0;i<8;i++)
        {
            let nr = cr+movR[i];
            let nc = cc+movC[i];
            if(!CellValid(nr,nc)) continue;
            if(vis[nr][nc]) continue;
            if(myGrid[nr][nc]==emo_bomb) continue;
            q.enqueue([nr,nc]);
            // console.log("push "+nr+" "+nc);
            vis[nr][nc]=true;
        }
    }
    // console.log(myGrid);

}
function GetCell(r,c)
{
    if(!CellValid) return null;
    let cellID = r.toString()+c.toString();
    let cell = document.getElementById(cellID);
    return cell;
}
function NotZeroNotBomb(r,c)
{
    if(myGrid[r][c]==0 || myGrid[r][c]==emo_bomb)return false;
    return true;
}
function BeigeCell(cell,word)
{
    if(revealed[parseInt(cell.id.charAt(0),10)][parseInt(cell.id.charAt(1),10)]) return;
    revealed[parseInt(cell.id.charAt(0),10)][parseInt(cell.id.charAt(1),10)]=true;
    not_revealed -= 1;
    if(word) cell.textContent = word;
    cell.classList.remove('unrevealed');
    cell.classList.add('revealed');
}

function RevealBombs()
{
    for(let i=0; i<bombs.length; i++)
    {
        let r = bombs[i][0];
        let c = bombs[i][1];
        revealed[r][c]=true;
        let cell = GetCell(r,c);
        cell.textContent = myGrid[r][c];
    }
}
