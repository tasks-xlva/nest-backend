import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GroupsModule } from 'modules/groups/groups.module'
import { UsersModule } from 'modules/users/users.module'
import { SubjectsModule } from 'modules/subjects/subjects.module'
import { TasksModule } from 'modules/tasks/tasks.module'
import { AuthModule } from 'modules/auth/auth.module'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    SequelizeModule.forRoot({
      dialect: `postgres`,
      port: 5432,
      host: process.env.DB_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      sync: { alter: true },
      synchronize: true,
      autoLoadModels: true,
    }),
    AuthModule,
    GroupsModule,
    UsersModule,
    SubjectsModule,
    TasksModule,
  ],
})
export class AppModule {}
