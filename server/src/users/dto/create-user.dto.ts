import { CreateAddressDto } from "./create-address.dto";

export class CreateUserDto {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    age:number;
    address: CreateAddressDto
}
