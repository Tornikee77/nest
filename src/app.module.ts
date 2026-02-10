import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { MetaOptionsModule } from "./meta-options/meta-options.module";
import { Module } from "@nestjs/common";
import { PostsModule } from "./posts/posts.module";
import { TagsModule } from "./tags/tags.module";
import { TypeOrmModule } from "@nestjs/typeorm";
/**
 * Importing Entities
 * */
import { PaginationModule } from "./common/pagination/pagination.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import databaseConfig from "./config/database.config";
import appConfig from "./config/app.config";
import { env } from "process";
import enviromentValidation from "./config/enviroment.validation";
import { APP_GUARD } from "@nestjs/core";
import { AccessTokenGuard } from "./auth/guards/access-token/access-token.guard";
import jwtConfig from "./auth/config/jwt.config";
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationGuard } from "./auth/guards/authentication/authentication.guard";

// Get the current node_enviroment
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? ".env" : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: enviromentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: "postgres",
        //entities: [User],
        synchronize: ConfigService.get("database.synchronize"),
        port: +ConfigService.get("database.port"),
        username: ConfigService.get("database.user"),
        password: ConfigService.get("database.password"),
        host: ConfigService.get("database.host"),
        autoLoadEntities: ConfigService.get("database.autoLoadEntities"),
        database: ConfigService.get("database.name"),
      }),
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    TagsModule,
    MetaOptionsModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    AccessTokenGuard,
  ],
})
export class AppModule {}
