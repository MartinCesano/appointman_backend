import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../gestion-reserva-cliente/modules/cliente/cliente.entity';
import { Estado } from '../estado/estado.entity';
import { Disponibilidad } from '../gestion-empresa/modules/disponibilidad/disponibilidad.entity';
import { Empleado } from '../gestion-empresa/modules/empleado/empleado.entity';
import { Emprendedor } from '../gestion-empresa/modules/emprendedor/emprendedor.entity';
import { Hora } from '../gestion-reserva-cliente/modules/hora/hora.entity';
import { Horario } from '../gestion-empresa/modules/horario/horario.entity';
import { Permiso } from '../auth/modules/permiso/permiso.entity';
import { Rol } from '../auth/modules/rol/rol.entity';
import { Servicio } from '../gestion-empresa/modules/servicio/servicio.entity';
import { Turno } from '../gestion-reserva-cliente/modules/turno/turno.entity';
import { Usuario } from '../auth/modules/usuario/usuario.entity';
import { Sucursal } from '../gestion-empresa/modules/sucursal/sucursal.entity';
import { Empresa } from '../gestion-empresa/modules/empresa/empresa.entity';
import { PrestadorServicio } from '../gestion-empresa/modules/prestador-servicio/prestador-servicio.entity';
import { Reserva } from 'src/gestion-reserva-cliente/modules/reserva/reserva.entity';

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
        Reserva,
        Rol,
        Servicio,
        Turno,
        Usuario,
        Sucursal,
        Empresa,
        PrestadorServicio,
      ],
      synchronize: true, // Solo para desarrollo, no usar en producción
    }),
  ],
})
export class DatabaseModule { }
