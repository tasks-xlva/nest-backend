import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm'
import { Group } from '@/groups/entities/group.entity'
import { ApiHideProperty } from '@nestjs/swagger'

@Entity()
export class Subject {
  constructor(partial: Partial<Subject>) {
    Object.assign(this, partial)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ length: 1024, nullable: true })
  description?: string

  @ApiHideProperty()
  @ManyToOne(() => Group, { onDelete: 'RESTRICT', nullable: false })
  group: Group
}
