class Mugen {
    constructor(number){
        this.number = number
        this.pos_virg = number.search(',')
        this.tam = number.length
        this.inteiro = []
        this.decimal = []
        
        this.pos = []
        this.a = 0
        this. r = 0
        this.qt_pt = 0
        this.j = []    
    }
    formatNumber(number){
        //separar inteiro e decimal
        this.j = this.separar(this.number, this.pos_virg, this.tam)

        //preserva a parte decimal
        if(this.pos_virg != -1 ){
            this.decimal = this.j[1]
        }
        
        //preparar o número
        this.inteiro = this.j[0]
        this.a = this.inteiro.length
        this.r = this.verificaResto(this.a) 
        this.qt_pt = Math.trunc(this.a/3)

        this.formatDecimal(5)        
        //calcula a posição do pt
        this.pos_pt(this.pos,this.qt_pt, this.r)
 
        //coloca ponto na parte inteira    
        this.inteiro = this.add_pt(this.inteiro, this.a, this.pos)
          
        //junta a parte inteira com a parte decimal
        this.number = this.inteiro.join('') + this.decimal.join('')
        //console.log(this.number);
        return this.number        
    
    }
    //converte para float
    unformatNumber(number){
        let x = number.replaceAll('.','')
        return x.replace(',','.')
    }
    
    verificaResto(a){
        let re = a%3
        if(re == 0){
            return 3
        }
        else{
            return re
        }
    }    
    
    //transforma em vetor
    transf(number) { 
        return Array.from(number);
    }
    
    separar(number, pos_virg,tam){
        let a = this.transf(number)
        if(pos_virg == -1){
            return a
        }
        let b = a.slice(0, pos_virg); //inteiro
        let c = a.slice(pos_virg, tam); //decimal
        //console.log(a,b,c);
        return [b,c]
    }
    
    pos_pt(pos,qt_pt,  r){
        for (let i = 0; i < qt_pt+1; i++) { 
            pos.push( r+3*i)
        }
        //console.log(pos);
    }
    
    add_pt(inteiro, a,pos){
        let vet = []
        for (let i = 0; i < a; i++) {
            if(pos.includes(i)){
                vet.push('.')
            }
            vet.push(inteiro[i])
        }
        return vet
    }

    formatDecimal(n){
        if(this.decimal.length>n+1){ //maior que n casas
            let num = eval('0.'+this.decimal.slice(1,n+1) )
            let d =  parseFloat(num)
            if(d == 0){
                this.decimal = []
                return 0
            }
            else{
                this.decimal = this.decimal.slice(0,n+1)
                return 1
            }
        }
        else{
            return this.decimal
        }

    }

}
//test
/*
let number = new Mugen('123456789012,0000007')
let i = number.formatNumber()
console.log( i );
*/

