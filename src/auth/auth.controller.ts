import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
 
    constructor
    (
        private authService : AuthService ,
    )
    {}
    @Post('/signup')
    signUp (@Body(ValidationPipe) authCredentialsDto : AuthCredentialsDto) : Promise<void>{
        return this.authService.sighUp(authCredentialsDto);
    }

    @Post('/signin')
    signIp (@Body(ValidationPipe) authCredentialsDto : AuthCredentialsDto) :Promise<{accessToken : string}> {
        return this.authService.sighIn(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log(req);
        
    }

    @Post('/test2')
    @UseGuards(AuthGuard())
    test2(@GetUser() req) {
        console.log(req);
        
    }
}
