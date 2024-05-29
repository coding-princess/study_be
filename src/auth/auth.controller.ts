import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto, SignUpRequestDto } from './dtos/sign.request.dto';
import { RefreshGuard } from './guard/jwt-refresh.guard';
import { JwtPayload } from 'src/interfaces/jwt.payload';
import { TokenResponseDto } from './dtos/token.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpRequestDto): Promise<boolean> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  async signIn(@Body() signInDto: SignInRequestDto): Promise<TokenResponseDto> {
    return this.authService.signIn(signInDto);
  }

  @Put('/refresh')
  @UseGuards(RefreshGuard)
  async refresh(@Body('email') email: string): Promise<TokenResponseDto> {
    return this.authService.refresh(email);
  }
}
