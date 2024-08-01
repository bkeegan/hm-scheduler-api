import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MockRoles } from 'src/decorators/mock-roles.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class MockGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
 
    canActivate( context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const roles = this.reflector.get(MockRoles, context.getHandler());
        console.log(`This endpoint can be executed by the following roles ${JSON.stringify(roles)}`)
       
        //this could possible look at the http request and check for the presense of certain permission flags and return true or false
        //this could, for instance, be used to prevent a "client" user from executing the api calls reserved for a "provider"
        return true;
  }
}