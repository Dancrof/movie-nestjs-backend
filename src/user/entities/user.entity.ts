/* eslint-disable prettier/prettier */
import { hash } from "bcryptjs";

import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({type: 'varchar', unique: true, length: 20, nullable: false})
    username: string;

    @Column({type: 'varchar', unique: true, length: 100, nullable: false})
    email: string;

    @Column({type: 'varchar', length: 60, nullable: false, select: false})
    password: string;


    @BeforeInsert()
    @BeforeUpdate()

    async hashPassword(){
        if(!this.password){
            return;
        }
        this.password = await hash(this.password, 10);
    }; 

    @CreateDateColumn({name:'create_at',type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at',type: 'timestamp'})
    updateAt: Date;
}
