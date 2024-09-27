import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Disponibilidad } from 'src/disponibilidad/entities/disponibilidad.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { Emprendedor } from 'src/emprendedor/entities/emprendedor.entity';
import { Estado } from 'src/estado/entities/estado.entity';
import { Hora } from 'src/hora/entities/hora.entity';
import { Horario } from 'src/horario/entities/horario.entity';
import { Permiso } from 'src/permissions/entities/permission.entity';
import { ReservaTurno } from 'src/reserva-turno/entities/reserva-turno.entity';
import { RoleEntity as Rol } from 'src/roles/entities/role.entity';
import { ServicioEntity as Servicio } from 'src/servicio/entities/servicio.entity';
import { Turno } from 'src/turno/entities/turno.entity';
import { UserEntity as Usuario } from 'src/users/user.entity';


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
