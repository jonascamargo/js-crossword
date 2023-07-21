// ***** retorna numero passado por parametro sempre como positivo
const to_positive = ( num ) => ( num < 0 ) ? num * -1 : num

// ***** retorna uma nova array com os itens da mesma index como uma coluna da matriz
Array.prototype.get_column = function( index ){ return this.map( row => row[index] ) }

// ***** retorna uma nova array com os itens da mesma index como uma coluna da matriz
Array.prototype.col_content = function( index ){ return this.map( row => row[index] ) }

// ***** procura e retorna a index da(s) linha(s) que contem as letras da nova palavra
Array.prototype.in_rows = function( string )
{
    let result  = []
    let letters = string.split('')

    this.find(( row, i ) => {
        let ltr_counter = row.filter( ltr => letters.includes(ltr) ).length
        let word_size = string.length
        
        let row_up = this[i -1]
        let row_bm = this[i +1]

        if( ltr_counter > 0 ){
            console.log( `⬆️ ${row_up}` )
            console.log( `linha ${row}` )
            console.log( `⬇️ ${row_bm}` )
            console.log( '-------------' )
        }
    })
    
    /*
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
    */
}
// ***** procura e retorna a index da(s) coluna(s) que contem as letras da nova palavra
Array.prototype.in_cols = function( string )
{
    let letters = string.split('')
    let result  = []

    for( let i = 0; i < this[0].length; i++ )
    {
        let column  = this.get_column(i)
        let counter = column.filter( (char) => letters.includes(char) ).length

        if( counter !== 0 ) result.push( i )
    }

    return result
}

String.prototype.to_grid = function( way, arr, pos ){
    let valid = true
    let row   = pos[0]
    let col   = pos[1]
    let grid  = arr

    let word  = {
        size: this.length,
        letters: this.split(''),
        found: []
    }

    console.log(word.letters)

    // *** guarda todas as letras da string encontradas no grid e suas indexs (na string e no grid)
    word.letters.map(( ltr, i ) => {
        let gx = grid[row].indexOf( ltr ) // index do caracter encontrado no grid

        // [ LETRA, INDEX NA STRING, INDEX NA MATRIZ ]
        if( gx >= 0 ) word.found.push( [ ltr, i, gx ] )
    })
    
    // *** se alguma letra foi encontrada valida a linha ou coluna
    // verifica se o inicio ou o fim do espaço espaço onde a palavra ficará no grid esta livre
    // verifica se a parte de cima/baixo (ou direita/esquerda) estão livres
    if( word.found.length > 0 && valid ){
        console.log('...1')
        // primeira letra encontrada
        let c_  = word.found.filter((i) => typeof i !== undefined).shift() // primeira letra encontrada
        let c_s = word.size
        let c_x = c_[1]
        let c_up = ( c_s - c_x -1 )

        let g_x = c_[2] // index no grid
        let g_s = arr[row].length // tamanho do grid

        let c_i = ( (c_x - g_x) < 0 ) ? (g_x - c_x) : 0 // posição da primeira letra no grid
        let c_f = ( (c_up + g_x) > g_s ) ? g_s : (c_up + g_x) // posição da ultima letra no grid

        let valid_before = ((c_x - g_x) < 0) ? 0 : (c_x - g_x)
        let valid_after  = ((c_x - c_s) * -1) - ((g_x - g_s) * -1)
            valid_after  = (valid_after < 0) ? 0 : valid_after

        word['before'] = valid_before
        word['after']  = valid_after

        if(
            (arr[row][c_i -1] !== undefined && arr[row][c_i -1] !== 0) ||
            (arr[row][c_f +1] !== undefined && arr[row][c_f +1] !== 0)
        ){
            console.log('...2')
            valid = false
        }

        let loop = g_x +1

        for( let i = loop; i < g_s; i++ ){
            console.log('...3')
            let g_char = arr[row][i]
            let c_char = word.letters[i -1]

            let cont_valid = ( g_char === 0 ) ? true : ((g_char === c_char) ? 1 : 0)

            console.log(`
            i [${i}]
            cont_valid [${cont_valid}]
            (${word.letters[c_[1] +1]})
            ---
            g_char [${g_char}]
            g_char === 0 [${g_char === 0}]
            ---
            g_char [${g_char}]
            c_char [${c_char}]
            g_char === c_char [${g_char === c_char}]
            `)
            
            if( !cont_valid ){
                console.log('...4')
                // valid = false
                // break
            }
        }
    }

    console.log( word )

    if( valid ) return word
}

let vertical = false

let game_board = [
    [0, 'N', 'M', 'C'],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 'X', 0, 0],
    [0, 'P', 0, 0],
]

console.table( game_board )
console.log( 'PUABNMCAMM'.to_grid( vertical, game_board, [0,2] ) )

/////////////////////////////



function addWord( word )
{
    let valid = true
    let vertical = false

    let grid = game_board
    // guarda a index da linha(row) ou coluna(col) onde a nova palavra pode ficar
    let cont_index = ( vertical ) ? grid.in_cols( word ) : grid.in_rows( word )

    let word_arr  = word.split('')
    let word_size = word_arr.length
    let word_hook = 0

    console.log( cont_index )

    game_board.map(() => {

        console.log(`
        • palavra na [${(vertical)?'vertical':'horizontal'}]
        `)
    
        /*
        words.some(( word ) => {
            const word = {
                site:    string.length,
                letters: string.split(''),
                hook:    char => string.indexOf( char )
            }
    
            const board = {
                grid:   game_board,
                target: ( vertical ) ? grid.get_column(rows[i]) : grid[rows[i]]
            }
    
    
            console.log( word.hook('A') )
    
            vertical = !vertical
        })
        */
        
        vertical = !vertical
    })
}

// addWord( 'PATO' )
// addWord( 'PORTA' )

