import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/resources/cliente/entities/cliente.entity';
import { Disponibilidad } from 'src/resources/disponibilidad/entities/disponibilidad.entity';
import { Empleado } from 'src/resources/empleado/entities/empleado.entity';
import { Emprendedor } from 'src/resources/emprendedor/entities/emprendedor.entity';
import { Estado } from 'src/resources/estado/entities/estado.entity';
import { Hora } from 'src/resources/hora/entities/hora.entity';
import { Horario } from 'src/resources/horario/entities/horario.entity';
import { Permiso } from 'src/resources/permissions/entities/permission.entity';
import { ReservaTurno } from 'src/resources/reserva-turno/entities/reserva-turno.entity';
import { Rol } from 'src/resources/roles/entities/role.entity';
import { Servicio } from 'src/resources/servicio/entities/servicio.entity';
import { Turno } from 'src/resources/turno/entities/turno.entity';
import { UserEntity as Usuario } from 'src/resources/users/user.entity';


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
