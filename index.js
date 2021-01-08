function toss() {
    return Math.floor(Math.random() * 2);
}

function sum(array) {
    var sum = 0;
    for (var i = 0; i <= 2; i++) {
        sum += array[i];
    }
    return sum;
}

function diagonal(board, leftToRight) {
    var temp = [];
    if (leftToRight) {
        for (var i = 0; i <= 2; i++) {
            for (var j = 0; j <= 2; j++) {
                if (i == j) temp.push(board[i][j]);
            }
        }
    } else {
        for (var k = 0; k <= 2; k++) {
            for (var l = 2; l >= 0; l--) {
                if (k + l == 2) temp.push(board[k][l]);
            }
        }
    }
    return temp;
}

function transpose(board) {
    var newArray = [];
    for (var i = 0; i < 3; i++) {
        newArray.push([]);
    }

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            newArray[j].push(board[i][j]);
        }
    }

    return newArray;
}

function checkTie(board) {
    c = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] !== -3) {
                c++;
            }
        }
    }
    if (c == 9) {
        return true;
    } else {
        return false;
    }
}

function status(board) {
    for (var i = 0; i <= 2; i++) {
        if (sum(board[i]) == 3 || sum(transpose(board)[i]) == 3) return 1;
        else if (sum(board[i]) == 0 || sum(transpose(board)[i]) == 0) return -1;
    }
    if (sum(diagonal(board, false)) == 3 || sum(diagonal(board, true)) == 3)
        return 1;
    else if (
        sum(diagonal(board, false)) == 0 ||
        sum(diagonal(board, true)) == 0
    )
        return -1;
    else if (checkTie(board)) return 0;
    else return 2;
}

function minimax(board, maximizing_player) {
    if (status(board) == 1) {
        return 1;
    } else if (status(board) == -1) {
        return -1;
    } else if (status(board) == 0) {
        return 0;
    }

    if (maximizing_player == true) {
        var max_val = -9999;
        for (var i = 0; i <= 2; i++) {
            for (var j = 0; j <= 2; j++) {
                if (board[i][j] == -3) {
                    board[i][j] = 1;
                    score = minimax(board, false);
                    board[i][j] = -3;
                    max_val = Math.max(score, max_val);
                }
            }
        }
        return max_val;
    } else if (maximizing_player == false) {
        var max_val = 9999;
        for (var i = 0; i <= 2; i++) {
            for (var j = 0; j <= 2; j++) {
                if (board[i][j] == -3) {
                    board[i][j] = 0;
                    score = minimax(board, true);
                    board[i][j] = -3;
                    max_val = Math.min(score, max_val);
                }
            }
        }
        return max_val;
    }
}

function bot(board) {
    var max_val = -9999;
    x = -1;
    y = -1;
    for (var i = 0; i <= 2; i++) {
        for (var j = 0; j <= 2; j++) {
            if (board[i][j] == -3) {
                board[i][j] = 1;
                val = minimax(board, true);
                board[i][j] = -3;
                if (val > max_val) {
                    max_val = val;
                    x = i;
                    y = j;
                }
            }
        }
    }
    board[x][y] = 1;
    return board;
}

function display_board(board) {
    for (var i = 0; i <= 2; i++) {
        for (var j = 0; j <= 2; j++) {
            id = i.toString() + j.toString();
            if (board[i][j] == -3)
                document.getElementById(id).setAttribute("src", "null.png");
            else if (board[i][j] == 0)
                document.getElementById(id).setAttribute("src", "x.png");
            else if (board[i][j] == 1)
                document.getElementById(id).setAttribute("src", "0.png");
        }
    }
}

function gameOver(board) {
    if (status(board) != 2) {
        if (status(board) == -1)
            document.body.style.backgroundColor = "#06d6a0";
        if (status(board) == 1) document.body.style.backgroundColor = "#ef233c";
        return true;
    } else return false;
}

var board = [
    [-3, -3, -3],
    [-3, -3, -3],
    [-3, -3, -3],
];

act_player = -2;
function firstOne() {
    act_player = toss();

    if (act_player === 1) {
        console.log("toss won by bot");
        board = bot(board);
        display_board(board);
        act_player = 0;
    }
}

function play(id) {
    if (gameOver(board) == true) {
        return 0;
    }
    if (act_player == 0) {
        console.log(id);
        display_board(board);
        x = parseInt(id.slice(0, 1));
        y = parseInt(id.slice(1, 2));
        board[x][y] = 0;
        display_board(board);
        if (gameOver(board) == true) {
            return 0;
        }
        act_player = 1;
    }
    if (act_player == 1) {
        console.log("bot's turn");
        display_board(board);
        board = bot(board);
        display_board(board);
        if (gameOver(board) == true) {
            return 0;
        }
        act_player = 0;
    }
}

// function play(){
//   act_player = toss();
//   n=9;
//   while(n!==0){
//     if(status(board) == 0){
//       if(act_player == 0){
//         display_board(board)
//         px, py = list(map(int,input().split()))
//         board = legal(px,py,act_player,board)
//         act_player = 1
//       elif(act_player == 1):
//         print("Enter the coord . Ex : 0 2 or 1 1")
//         print("MOVE: #",(10-n))
//         display_board(board)
//         board = bot(board, n)
//         act_player = 0
//       n-=1
//     else:
//       display_board(board)
//       if(status(board)==-1):
//         print("WINNER WINNER CHICKEN DINNER")
//       elif(status(board)==1):
//         print("YOU BETTER DIE")
//       break

// document.h2.innerHTML = diagonal(array).join('<br>') +
//                           '<br><br><br>' +
//                           diagonal(array, true).join('<br>');
// document.body.innerHTML = toss();
// document.body.innerHTML = status(board);
