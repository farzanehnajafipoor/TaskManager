import { Injectable, UnauthorizedException } from "@nestjs/common";
import {Strategy , ExtractJwt} from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { JwtPayLoad } from "./jwt-payload.interface";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (
        @InjectRepository(UserRepository)
        private UserRepository : UserRepository ,
    ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : 'topSecret51'
        });
    }
    async validate(payload : JwtPayLoad) : Promise<User> {
        const {username} = payload ;
        const user = await this.UserRepository.findOne({username});
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}