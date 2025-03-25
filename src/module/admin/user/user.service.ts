import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../../../auth/dto/signup.dto';
import { UserRepository } from '../../../auth/repository/user.repository';
import { ErrorMsg } from '../../../constants/error-message';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsersByAdmin() {
    return await this.userRepository.find();
  }

  async getUserByAdmin(id: number) {
    const user = await this.userRepository.findOneBy({
      id: id,
    });
    if (!user) {
      throw new HttpException(ErrorMsg.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUserByAdmin(id: number, data: UpdateUserDto) {
    const user = await this.getUserByAdmin(id);
    if (user.email !== data.email) {
      throw new HttpException(
        ErrorMsg.CANNOT_UPDATE_EMAIL,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.userRepository.update(id, data);
    return result.affected > 0;
  }

  async deleteUserByAdmin(id: number) {
    await this.getUserByAdmin(id);
    const result = await this.userRepository.delete({ id: id });

    return result.affected > 0;
  }
}
