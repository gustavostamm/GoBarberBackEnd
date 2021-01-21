import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderAppointments = new ListProviderAppointmentsService(fakeAppointmentRepository, fakeCacheProvider);
    });

    it('should be able to list the appointments on a specific day', async () => {
        const appointment1 = await fakeAppointmentRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 0, 10, 14, 0, 0),
        });

        const appointment2 = await fakeAppointmentRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 0, 10, 15, 0, 0),
        });

        const appointments = await listProviderAppointments.execute({
            provider_id: 'provider',
            year: 2021,
            month: 1,
            day: 10,
        })

        expect(appointments).toEqual([
            appointment1,
            appointment2
        ]);
    });



});

