import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(configService: ConfigService, public prismaService: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET')
        })
    }
    async validate(payload:{id: number, email: string}){
       const user = await this.prismaService.user.findUnique({
        where:{
            id: payload.id
        }
       })
       delete user.hashedPW
        return user
    }
}