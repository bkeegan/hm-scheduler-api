import { Reflector } from '@nestjs/core';

export const MockRoles = Reflector.createDecorator<string[]>();