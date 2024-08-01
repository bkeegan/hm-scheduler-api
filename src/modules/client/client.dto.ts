import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateClientInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;
}