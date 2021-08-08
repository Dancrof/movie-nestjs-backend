/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('movie')
export class Movie {
    
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({type: 'varchar', nullable: false})
    coverUrl: string;
    
    @Column({type: 'varchar', length: 50, nullable: false})
    name: string;
    
    @Column({type: 'varchar', length: 255, nullable: false})
    sinopsis: string;
    
    @Column({type: 'simple-array', nullable: false})
    category: string[];
    
    @Column({type: 'varchar', unique: true, nullable: false})
    movieUrl: string;
    
    
    @CreateDateColumn({name: 'create_at', type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at'})
    updateAt: Date;

}
