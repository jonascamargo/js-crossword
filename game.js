class Crossword
{
    constructor(){
        this.maxswords = 6 // total de palavras no grid
        this.grid = []
        this.words = {}
        this.vertical = false
    }
}

// *** adicionando nova palavra no array
Crossword.prototype.wordAdd = function( string ){
    console.log(`adicionando a palavra [${string}]`)

    // se for a primeira palavra evita o loop
    if( this.grid.length === 0 ){
        this.grid.push( this.vertical ? string.split('').map( ltr  => [ ltr ]) : string.split('') )
        return
    }

    // passar pelo grid até encontrar a letra em comum com a palavra
    let gridFound = this.gridFinder( string )
    console.log( gridFound )

    let rows = gridFound.map((i) => i.rowIndex)
    let cols = gridFound.map((i) => i.colIndex)
    console.log( cols )

    // arr.filter((item, index) => array.indexOf(item) === index)

    // encontrar a letra em comum
    // console.log( this.grid )
}

// GRID
// *** procura a palavra na grid - retorna a letra e index da linha e coluna [ letter:'A', rowIndex:0, colIndex:0 ]
Crossword.prototype.gridFinder = function( string ){
    return this.grid.flatMap((row, rowIndex) =>
        row.map((letter, colIndex) => ({ letter, rowIndex, colIndex }))
    ).filter(item => string.includes(item.letter))
}

// *** atualiza o tamanho da array
Crossword.prototype.gridGrowth = function(){}



////////////////////

const game = new Crossword()

console.log( game )


// adicionando palavra
game.wordAdd( 'PATO' )
game.wordAdd( 'PLUMA' )