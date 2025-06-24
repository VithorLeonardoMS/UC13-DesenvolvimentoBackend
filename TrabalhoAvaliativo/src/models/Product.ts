import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity("products")
export class Product{
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.products)
    user:User;

    @Column({type:"varchar", length: 100, nullable: false})
    name: string;

    /**
     * precision -> Tamanho maximo de números(como se fosse a quantidade de caracteres);
     * scale -> Casas decimais após da vírgula;
     */
    @Column({type:"decimal", precision:9, scale:2, nullable:false })
    price:number

    @Column({type:"text", nullable: false})
    description: string;

    constructor(name:string, price:number, description:string, user:User){
        this.name = name;
        this.price = price;
        this.description = description;
        this.user = user;
    }
}