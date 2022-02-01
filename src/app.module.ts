import { Module } from '@nestjs/common'
import { UsersModule } from '@/users/users.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupsModule } from './groups/groups.module'
import { SubjectsModule } from './subjects/subjects.module'
import { TasksModule } from './tasks/tasks.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    TypeOrmModule.forRoot({
      type: `postgres`,
      port: 5432,
      host: process.env.DB_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    GroupsModule,
    SubjectsModule,
    TasksModule,
  ],
})
export class AppModule {}
