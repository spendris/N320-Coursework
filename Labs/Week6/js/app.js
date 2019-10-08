var app = new Vue ({
    el: "#app",
    data: {
        gameOver: false,
        playerTurn: 1,
        player: 0,
        grid: [
            [ 0,0,0,0,0,0,0 ],
            [ 0,0,0,0,0,0,0 ],
            [ 0,0,0,0,0,0,0 ],
            [ 0,0,0,0,0,0,0 ],
            [ 0,0,0,0,0,0,0 ],
            [ 0,0,0,0,0,0,0 ]
        ]
    },
    methods: {
        selectCell: function(row, col) {

            //get the row at which to place the piece
            var moveRow = this.lowestMove(col);
            if(moveRow >= 0 && this.gameOver == false) {

                //copy grid to a temp variable
                var tempGrid = this.grid.slice(0);

                //modify the cloned grid
                tempGrid[moveRow][col] = this.playerTurn;

                //replace 
                this.grid = tempGrid;

                //swap player turn
                this.playerTurn = (this.playerTurn == 1) ? 2 : 1;

                //check for win
                this.horizontalWin();
                this.verticalWin();
            }
        },
        horizontalWin: function() {
            var currentPiece = 0;
            var currentPieceRow = 0;
            var previousPiece = 0;
            var previousPieceRow = 0;
            var series = 0;
            
            // loop through all columns
            for(var row = 0; row <= 5; row++) {    
                for(var col = 0; col <= 6; col++) {

                //check for four in a row
                //track the value of each piece
                currentPiece = this.grid[row][col];
                currentPieceRow = row;
                //if the current piece matches the previous one, start a series
                if(currentPiece == previousPiece && currentPiece != 0 && currentPieceRow == previousPieceRow ) {
                    series++;
                } else {
                    series = 0;
                }
                //if the current piece matches the previous piece 3 times (4 in a row) a win occurs
                if(series == 3) {
                    
                    console.log(currentPiece);
                    this.gameOver = true;
                    this.player = currentPiece;
                }
                //the current piece becomes the previous piece as we move down the row
                previousPiece = currentPiece;
                previousPieceRow = currentPieceRow;
                }
            }
        },
        verticalWin: function() {
            var currentPiece = 0;
            var currentPieceCol = 0;
            var previousPiece = 0;
            var previousPieceCol = 0;
            var series = 0;
            
            // loop through all columns
            for(var col = 0; col <= 6; col++) {    
                for(var row = 0; row <= 5; row++) {

                //check for four in a row
                //track the value of each piece
                currentPiece = this.grid[row][col];
                currentPieceCol = col;
                //if the current piece matches the previous one, start a series
                if(this.currentPiece = previousPiece && currentPiece != 0 && currentPieceCol == previousPieceCol) {
                    series++;
                } else {
                    series = 0;
                }
                //if the current piece matches the previous piece 3 times (4 in a row) a win occurs
                if(series == 3) {
                    console.log(currentPiece);
                    this.gameOver = true;
                    this.player = currentPiece;
                    
                }
                //the current piece becomes the previous piece as we move down the row
                previousPiece = currentPiece;
                previousPieceCol = currentPieceCol;
                }

            }
        },

        lowestMove: function(col) {
            for(var row = 5; row >= 0; row--) {
                //if current row is free
                if(this.grid[row][col]==0) {
                    //if free, return row index
                    return(row);
                }
            }
        }
    }
})