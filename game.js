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
Crossword.prototype.addWord = function( string ){
    console.log(`adicionando a palavra [${string}]`)

    // se for a primeira palavra evita o loop
    if( this.grid.length === 0 ) this.grid.push( this.vertical ? string.split('').map( ltr  => [ ltr ]) : string.split('') )

    // passar pelo grid até encontrar a letra em comum com a palavra
    this.grid.some(( ltr ) => {
        console.log( ltr )
    })

    // encontrar a letra em comum

    console.log( this.grid )
}

// *** atualiza o tamanho da array
Crossword.prototype.gridGrowth = function(){}



////////////////////

const game = new Crossword()

console.log( game )


// adicionando palavra
game.addWord( 'PATO' )
game.addWord( 'PLUMA' )