import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../gestion-reserva-cliente/modules/cliente/entities/cliente.entity';
import { Disponibilidad } from '../resources/disponibilidad/entities/disponibilidad.entity';
import { Empleado } from '../resources/empleado/entities/empleado.entity';
import { Emprendedor } from '../resources/emprendedor/entities/emprendedor.entity';
import { Estado } from '../resources/estado/entities/estado.entity';
import { Hora } from '../resources/hora/entities/hora.entity';
import { Horario } from '../resources/horario/entities/horario.entity';
import { Permiso } from '../auth/modules/permiso/permiso.entity';
import { ReservaTurno } from '../gestion-reserva-cliente/modules/reserva-turno/entities/reserva-turno.entity';
import { Rol } from '../auth/modules/rol/rol.entity';
import { Servicio } from '../resources/servicio/entities/servicio.entity';
import { Turno } from '../resources/turno/entities/turno.entity';
import { Usuario } from '../auth/modules/usuario/usuario.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './appointman.db',
      entities: [
        Cliente,
        Estado,
        Disponibilidad,
        Empleado,
        Emprendedor,
        Hora,
        Horario,
        Permiso,
        ReservaTurno,
        Rol,
        Servicio,
        Turno,
        Usuario,
      ],
      synchronize: true, // Solo para desarrollo, no usar en producción
    }),
  ],
})
export class DatabaseModule { }
