
var interval;
var N=30;
var M=30;
var grid = clickableGrid(N,M,function(el,row,col){
    el.className='clicked';   
});

document.body.appendChild(grid);
     
function clickableGrid( rows, cols, callback ){
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.id = r +''+ c
            cell.addEventListener('click',(function(el,r,c){
                return function(){
                    callback(el,r,c);
                }
            })(cell,r,c),false);
        }
    }
    return grid;
}
function computeLiveNeighbours(row,col,items){
    var liveNeighbours =0;
    for(var i=-1;i<2;i++){
        for(var j=-1;j<2;j++){
            if(!(i==0 && j==0)){
                  liveNeighbours += items[row + i][col + j];
            }
        }
    }
    return liveNeighbours;
}
function createArray(rows,cols){
    var items = new Array(rows);
    for(var i=0;i<rows;i++){
        items[i] = new Array(cols);
    }
    for(var i=0;i<rows;i++){
        for(var j=0;j<cols;j++){
            if(document.getElementById(i+''+j).className=='clicked'){
                items[i][j]=1;
            }
            else {
                items[i][j]=0;
            }
        }
    }
    return items;
}
function draw(items,rows,cols){
    for(var i=0;i<rows;i++){
        for(var j=0;j<cols;j++){
            if(items[i][j] == 1){
                document.getElementById(i+''+j).className='clicked';
            }
            else {
                document.getElementById(i+''+j).className='';
            }
        }
    }
}
function computeGameOfLife(items,rows,cols) {
    var result = items;
        for(var i=1;i<rows-1;i++){
            for(var j=1;j<cols-1;j++){
                var no_of_neighbours = computeLiveNeighbours(i,j,items);
                if(items[i][j] ==1){
                    if(no_of_neighbours <2){
                        result[i][j] = 0;
                    }
                    else if(no_of_neighbours ==2 || no_of_neighbours==3){
                        result[i][j] = 1;
                    }
                    else if(no_of_neighbours > 3){
                        result[i][j] = 0;
                    }
                }else{
                    if(no_of_neighbours == 3){
                        result[i][j] =1;
                    }
                }
            }
        }
        items = result;
        draw(items,rows,cols);
}

function startButtonClicked(){
    if(interval){
        return;
    }
    var items = createArray(N,M);
    interval = setInterval(function(){
        computeGameOfLife(items,N,M)
    },50);
}

function stopButtonClicked(){
   clearInterval(interval);
   interval = null;
}