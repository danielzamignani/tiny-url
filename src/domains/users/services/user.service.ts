import {
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../database/entities/users.entity';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    constructor() {}

    async createUser(createUserDTO: CreateUserDTO): Promise<void> {
        const user = await this.userRepository.count({
            where: { email: createUserDTO.email },
        });

        if (user) {
            throw new UnprocessableEntityException('User already exists');
        }

        await this.userRepository.insert(createUserDTO);
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOneBy({
            email,
        });

        if (!user) throw new NotFoundException('User not found');

        return user;
    }
}
