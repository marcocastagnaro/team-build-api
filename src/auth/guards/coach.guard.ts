import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '../enums/role.enum';

@Injectable()
export class CoachGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    return user.role === Role.COACH;
  }
} 