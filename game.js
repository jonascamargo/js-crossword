/*

PALAVRAS CRUZADAS

- 

*/

// HELP - retorna numero passado por parametro sempre como positivo
const num_positive = ( num ) => ( num < 0 ) ? num * -1 : num


let board_size = 5

let board = Array.from({ length: board_size }, () => Array(board_size).fill(0))

//  X "direita",    Y "baixo"
// -X "esquerada", -Y "cima"
let board_grow = [ 0, 0 ]

let word_vertical = false


// aumentar tamanho da matriz
const board_growth = ( upTo_x_y ) => {
    if( (num_positive(upTo_x_y[0]) + num_positive(upTo_x_y[1])) === 0 ) return

    let x_num = upTo_x_y[0]
    let y_num = upTo_x_y[1]

    // horizontal
    if( x_num !== 0 )
    {
        let up = Array( num_positive(x_num) ).fill('_')

        if( x_num < 0 )
            board.map(( lin ) => lin.unshift(...up) )
        else
            board.map(( lin ) => lin.push(...up) )
    }

    // vertical
    if( y_num !== 0 )
    {
        let up = Array.from({ length: num_positive(y_num) }, () => Array(board_size + num_positive(x_num)).fill('_'))

        if( y_num < 0 )
            board.unshift(...up)
        else
            board.push(...up)
    }
}

// inverter array/board
const array_inverse = ( board ) => board[0].map(( _, i ) => board.map( row => row[i] ))
const board_inverse = array_inverse( board )





let arr = [
    /*['1a',   0, '1c', '1d'],
    ['2a', 'xx', '2c', '2d'],
    ['3a',   0,    0,  '-d'],
    [  0,    0,    0,    0 ],*/
    ['S', 0, 0, 0, 0],
    ['P', 0, 0, 0, 0],
    ['A', 0, 0, 0, 0],
    ['R', 0, 0, 0, 0],
]

let tx = 'PATAS'
/*
    [S, 0, 0, 0, 0],
    [P, 0, 0, 0, 0],
    [A, 0, 0, 0, 0],
    [R, 0, 0, 0, 0],

    P A T A
*/

/**
     *** colocar uma palavra na HORIZONTAL
    * [
    *    o numero de espaços livres é igual ou maior q o numero de letras da nova palavra
    *    as letras q ja existe são as mesmas E na mesma ordem da nova palavra
    * ]
    * se for a primeira letra NAO DEVE TER letras a direita 1 nivel a cima e abaixo
    * se for a ultima letra NAO DEVE TER letras a esquerda 1 nivel a cima e abaixo
    * se for no meio da palavra NAO DEVE TER letrar nem a direita nem a esquerda 1 nivel a cima e abaixo
**/

let tx_arr = tx.split('')

arr.every(( lin ) => {
    console.log( lin.includes('S') )

    let free = lin.reduce((total, item) => total + (item === 0 ? 1 : 0), 0) // total de espalos livres "0"
    let zeroff = lin.filter(item => item !== 0) // remove os zeros

    console.log( zeroff )

    if( lin.includes('S') ) return;
})




 
// [ linha, coluna ]
/*
let rank_around = ( item, grid = board, vertical = false ) => {
    let lin = item[0],
        col = item[1],
        
        rank_top = 0,
        rank_btm = 0

    if( !vertical ){
        rank_top = arr_rank( grid[(lin -1)].slice((col -1), (col +2)) )
        rank_btm = arr_rank( grid[(lin +1)].slice((col -1), (col +2)) )
    }

    // let lin_top = grid[lin][col]
    
    console.log( rank_top )
    console.log( rank_btm )
    // console.log( grid[(lin -1)].slice( (col -1), (col +2) ) )
    // console.log( `peso da linha de cima: ${lin_top} - peso da linha inferior: ${lin_btm}` )
}

// retorna o total de areas vazias na array
let arr_rank = ( arr ) => arr.reduce(( total, item ) => { return total + ((item === 0) ? 1 : 0) }, 0)

rank_around( [1,1], arr )
*/

// varrendo por coluna da matriz
/////
/*
arr.some(( lin, idx ) => {
    for( let col = 0; col < lin.length; col++ ){
        console.log( arr[col][idx] )
    }

    console.log( '-----------' )
})
*/

/////
/*arr.some(( lin ) => {
    console.log( lin.length )
})
*/


//console.table( board )