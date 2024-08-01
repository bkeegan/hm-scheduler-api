import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateProviderInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;
}