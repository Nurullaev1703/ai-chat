import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { AbstractEntity } from "src/abstractions/abstract.entity";
import { Project } from "src/projects/entities/project.entity";
import { Task } from "src/projects/entities/task.entity";

@Entity()
export class User extends AbstractEntity<User> {
    @Column({name: "first_name"})
    firstName:string

    @Column({name: "last_name"})
    lastName:string

    @Column()
    age:number

    @Column()
    email:string

    @Column()
    password:string

    @OneToOne(() => Address, {cascade: true})
    @JoinColumn()
    address:Address

    @ManyToMany(() => Project, (project) => project.users, {cascade: true})
    @JoinTable()
    projects: Project[]

    @OneToMany(() => Task, (tasks) => tasks.user)
    @JoinTable()
    tasks: Task[]
}
