let grid = []
let vertical = false


// ***** retorna numero passado por parametro sempre como positivo
const to_positive = ( num ) => ( num < 0 ) ? num * -1 : num

// ***** retorna uma nova array com os itens da mesma index como uma coluna da matriz
Array.prototype.col_content = function( index ){ return this.map( row => row[index] ) }

// ***** procura e retorna a index da(s) linha(s) que contem as letras da nova palavra
Array.prototype.in_rows = function( string )
{
    let letters = string.split('')
    let grid_size = this.length
    let result  = []

    this.filter(( lin, i ) => {
        let counter = lin.filter( ltr => letters.includes(ltr) ).length
        let error   = lin.filter( char => char !== 0 && !letters.includes(char) )
        let free_space = lin.filter( char => char === 0 ).length;

        if( counter !== 0 && free_space > counter ) result.push( i )
    })

    return result
}

// ***** procura e retorna a index da(s) coluna(s) que contem as letras da nova palavra
Array.prototype.in_cols = function( string )
{
    let letters = string.split('')
    let result  = []

    for( let i = 0; i < this[0].length; i++ )
    {
        let column  = this.col_content(i)
        let counter = column.filter( (char) => letters.includes(char) ).length

        if( counter !== 0 ) result.push( i )
    }

    return result
}

// **** aumentar tamanho da matriz
// recebe uma array de dois valores [ x"horizontal", y"vertical" ]
// valores negativo para esquerda, positivo para direita!
Array.prototype.growth = function( up_xy ){
    if( (to_positive(up_xy[0]) + to_positive(up_xy[1])) === 0 ) return

    let x_num = up_xy[0]
    let y_num = up_xy[1]

    // horizontal
    if( x_num !== 0 )
    {
        let up = Array( to_positive(x_num) ).fill(0)

        if( x_num < 0 )
            this.map(( lin ) => lin.unshift(...up) )
        else
            this.map(( lin ) => lin.push(...up) )
    }

    // vertical
    if( y_num !== 0 )
    {
        let grid_size = this[0].length
        let up = Array.from({ length: to_positive(y_num) }, () => Array(grid_size + to_positive(x_num)).fill(0))

        if( y_num < 0 )
            this.unshift(...up)
        else
            this.push(...up)
    }
}



////////////////////

grid = [
    ['Z', 0, 0, 0],
    [0, 0, 0, 'P'],
    ['Z', 0, 0, 0],
    ['X', 0, 0, 0],
]

console.table( grid )
console.warn( '-----' )

//////////

add_word = function( word ){
    let valid = true
    let rows  = ( vertical ) ? grid.in_cols( word ) : grid.in_rows( word )
    
    let letters = word.split('')
    

    for( let i = 0; i < rows.length; i++ )
    {
        console.group( ((vertical) ? 'VERTICAL' : 'HORIZONTAL') +' - '+ word )

        let content = ( vertical ) ? grid.col_content(rows[i]) : grid[rows[i]]
        let cntt_lft_top = ( vertical ) ? grid.col_content(rows[i] -1) : grid[rows[i] -1]
        let cntt_rgt_btm = ( vertical ) ? grid.col_content(rows[i] +1) : grid[rows[i] +1]

        // letra em comum *na nova palavra e na grid (coluna ou linha)*
        let same_ltr = letters.find((x) => {
            return content.find((y) => { return (y === x) ? y : 0 })
        })

        // index da letra em comum NA PALAVRA
        let index_letter = letters.indexOf( same_ltr )
        // index da letra em comum NA GRID
        let index_grid   = content.indexOf( same_ltr )

        // colunas extra para atualizar o grid
        // valor negativo aumenta para esquernda - valor positivo aumenta para direita
        let grid_update = index_grid - index_letter
        if( vertical && (grid_update >= 0 ) ) {
            grid_update = letters.length - (content.length - index_grid)
        }
        // index na linha onde começa a palavra
        let index_start = ( grid_update < 0 ) ? 0 : grid_update

        if( grid_update !== 0 ){
            // ***** VERTICAL
            if( vertical )
                grid.growth([ 0, grid_update ])
            // ***** HORIZONTAL
            else
                grid.growth([ grid_update, 0 ])
        }

        console.error( grid_update )
        console.error( index_start )
        for( let c = 0; c < letters.length; c++ )
        {
            // ***** VERTICAL
            if( vertical ){
                // grid[index_start +c][rows[i]] = letters[c]
                console.log( index_start +c )
            }
            // ***** HORIZONTAL
            else {
                content[index_grid +c] = letters[c]
            }
        }

        console.table( grid )

        console.groupEnd()
        vertical = !vertical
    }
}

add_word( 'PATY' )
// add_word( 'NDUBFFY' )
add_word( 'YNDUBFF' )

////////////////////



























/*
let grid = []
let vertical = false


// ***** retorna numero passado por parametro sempre como positivo
const to_positive = ( num ) => ( num < 0 ) ? num * -1 : num

// ***** retorna uma nova array com os itens da mesma index como uma coluna da matriz
Array.prototype.col_content = function( index ){ return this.map( row => row[index] ) }

// ***** procura e retorna a index da(s) linha(s) que contem as letras da nova palavra
Array.prototype.in_rows = function( string )
{
    let letters = string.split('')
    let grid_size = this.length
    let result  = []

    this.filter(( lin, i ) => {
        let counter = lin.filter( ltr => letters.includes(ltr) ).length
        let error   = lin.filter( char => char !== 0 && !letters.includes(char) )
        let free_space = lin.filter( char => char === 0 ).length;

        if( counter !== 0 && free_space > counter ) result.push( i )
    })

    return result
}

// ***** procura e retorna a index da(s) coluna(s) que contem as letras da nova palavra
Array.prototype.in_cols = function( string )
{
    let letters = string.split('')
    let result  = []

    for( let i = 0; i < this[0].length; i++ )
    {
        let column  = this.col_content(i)
        let counter = column.filter( (char) => letters.includes(char) ).length

        if( counter !== 0 ) result.push( i )
    }

    return result
}

// **** aumentar tamanho da matriz
// recebe uma array de dois valores [ x"horizontal", y"vertical" ]
// valores negativo para esquerda, positivo para direita!
Array.prototype.growth = function( up_xy ){
    if( (to_positive(up_xy[0]) + to_positive(up_xy[1])) === 0 ) return

    let x_num = up_xy[0]
    let y_num = up_xy[1]

    // horizontal
    if( x_num !== 0 )
    {
        let up = Array( to_positive(x_num) ).fill(0)

        if( x_num < 0 )
            this.map(( lin ) => lin.unshift(...up) )
        else
            this.map(( lin ) => lin.push(...up) )
    }

    // vertical
    if( y_num !== 0 )
    {
        let grid_size = this[0].length
        let up = Array.from({ length: to_positive(y_num) }, () => Array(grid_size + to_positive(x_num)).fill(0))

        if( y_num < 0 )
            this.unshift(...up)
        else
            this.push(...up)
    }
}



////////////////////

grid = [
    ['Z', 0, 0, 0],
    [0, 0, 0, 'P'],
    ['Z', 0, 'Y', 0],
    ['X', 0, 0, 0],
]

console.table( grid )
console.warn( '-----' )

//////////

add_word = function( word ){
    let valid = true
    let rows  = ( vertical ) ? grid.in_cols( word ) : grid.in_rows( word )
    
    let letters = word.split('')
    

    for( let i = 0; i < rows.length; i++ )
    {
        console.group( ((vertical) ? 'VERTICAL' : 'HORIZONTAL') +' - '+ word )
        // console.log( rows )

        let content = ( vertical ) ? grid.col_content(rows[i]) : grid[rows[i]]
        let cntt_lft_top = ( vertical ) ? grid.col_content(rows[i] -1) : grid[rows[i] -1]
        let cntt_rgt_btm = ( vertical ) ? grid.col_content(rows[i] +1) : grid[rows[i] +1]

        console.log( content )

        // ***** VERTICAL
        if( vertical ){}
        // ***** HORIZONTAL
        else {}

        let same_ltr = letters.find((x) => {
            return content.find((y) => { return (y === x) ? y : 0 })
        })

        let index_ltr = letters.indexOf( same_ltr )
        let index_row = content.indexOf( same_ltr )

        let grid_hor_update   = index_row - index_ltr // valor negativo aumenta a grid para esquernda, valor positivo aumenta a grid para direita
        let start_word_inline = index_row - index_ltr // index na linha onde começa a palavra
        start_word_inline = ( start_word_inline < 0 ) ? 0 : start_word_inline

        console.log( `letra [${same_ltr}] index na string: [${index_ltr}] - index na ${( vertical )? 'coluna':'linha'}: [${index_row}] - mais [${grid_hor_update}] celulas` )
        console.log( `inde do inicio da palavra na linha: [${start_word_inline}]` )

        if( grid_hor_update !== 0 ){
            // ***** VERTICAL
            if( vertical ){
                grid.growth( [0, grid_hor_update] )
            }
            // ***** HORIZONTAL
            else {
                grid.growth( [grid_hor_update, 0] )
            }
        }

        for( let c = 0; c < letters.length; c++ )
        {
            // ***** VERTICAL
            if( vertical ){
                // console.log( grid[rows[i]][start_word_inline +c] )
                // console.log( `grid[${rows[i]}][${start_word_inline +c}]` )
                // console.log( `grid[${start_word_inline +c}][${rows[i]}]` )
                // grid[rows[i]][start_word_inline +c] = '_'
                // grid[start_word_inline +c][rows[i]] = '_'
                let y = rows[i]
                let x = start_word_inline +c
                
                
            }
            // ***** HORIZONTAL
            else {
                console.log( '---' )
                content[start_word_inline +c] = letters[c]
            }
        }

        console.table( grid )


        console.groupEnd()
        vertical = !vertical
    }
}

add_word( 'PATO' )
add_word( 'YNDUMM' )


////////////////////

*/