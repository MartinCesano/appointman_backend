import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/gestion-reserva-cliente/modules/cliente/cliente.entity';
import { Disponibilidad } from 'src/gestion-empresa/modules/disponibilidad/disponibilidad.entity';
import { Empleado } from 'src/gestion-empresa/modules/empleado/empleado.entity';
import { Emprendedor } from 'src/gestion-empresa/modules/emprendedor/emprendedor.entity';
import { Estado } from 'src/estado/estado.entity';
import { Hora } from 'src/gestion-reserva-cliente/modules/hora/hora.entity';
import { Horario } from 'src/gestion-empresa/modules/horario/horario.entity';
import { Permiso } from 'src/auth/modules/permiso/permiso.entity';
import { ReservaTurno } from 'src/gestion-reserva-cliente/modules/reserva-turno/reserva-turno.entity';
import { Rol } from 'src/auth/modules/rol/rol.entity';
import { Servicio } from 'src/gestion-empresa/modules/servicio/servicio.entity';
import { Turno } from 'src/gestion-reserva-cliente/modules/turno/turno.entity';
import { Usuario } from 'src/auth/modules/usuario/usuario.entity';


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
