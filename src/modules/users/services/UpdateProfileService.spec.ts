import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
    })
    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Gustavo',
            email: 'gustavo.stamm@gmail.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Gustavo Rocha',
            email: 'gustavorocha@gmail.com',
        });

        expect(updatedUser.name).toBe('Gustavo Rocha');
        expect(updatedUser.email).toBe('gustavorocha@gmail.com');
    });

    it('should not be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'Gustavo',
            email: 'gustavo.stamm@gmail.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '123456',
        });

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'Gustavo',
            email: 'gustavo.stamm@gmail.com',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Gustavo',
            email: 'gustavo.stamm@gmail.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Gustavo Rocha',
            email: 'gustavorocha@gmail.com',
            old_password: '123456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password if does not provide the old one', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Gustavo',
            email: 'gustavo.stamm@gmail.com',
            password: '123456',
        });

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'Gustavo Rocha',
            email: 'gustavorocha@gmail.com',
            password: '123123',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the profile from non-existing user', async () => {
        expect(updateProfile.execute({
            user_id: 'non-existing-user_id',
            name: 'Test',
            email: 'test@gmail.com',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password if the old one is incorrect', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Gustavo',
            email: 'gustavo.stamm@gmail.com',
            password: '123456',
        });

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'Gustavo Rocha',
            email: 'gustavorocha@gmail.com',
            old_password: 'wrong-old-password',
            password: '123123',
        })).rejects.toBeInstanceOf(AppError);
    });


});

