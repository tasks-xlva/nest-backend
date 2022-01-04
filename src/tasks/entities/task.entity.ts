import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ApiHideProperty } from '@nestjs/swagger'
import { Subject } from '@/subjects/entities/subject.entity'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  deadline?: string

  @ApiHideProperty()
  @ManyToOne(() => Subject, { onDelete: 'RESTRICT', nullable: false })
  subject: Subject
}
