import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDto';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDto): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
}