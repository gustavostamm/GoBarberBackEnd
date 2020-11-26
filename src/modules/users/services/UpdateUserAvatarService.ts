import User from '@modules/users/infra/typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {

        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Only authenticated users can chance avatar"', 401);
        }

        if (user.avatar) {
            //deletar avatar anterior

            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExist) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;