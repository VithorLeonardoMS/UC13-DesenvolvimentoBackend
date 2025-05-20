export class Produto{
    constructor(public id:number,public nome:string, public decricao:string, public preco:number, public quantidade:number){}
}

export const produtos:Produto[] = [];