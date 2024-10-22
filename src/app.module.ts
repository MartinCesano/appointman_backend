import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PermisoModule } from "./auth/modules/permiso/permiso.module";
import { RolModule } from "./auth/modules/rol/rol.module";
import { UsuarioModule } from "./auth/modules/usuario/usuario.module";
import { ClienteModule } from "./gestion-reserva-cliente/modules/cliente/cliente.module";
import { ServicioModule } from "./gestion-empresa/modules/servicio/servicio.module";
import { TurnoModule } from "./gestion-reserva-cliente/modules/turno/turno.module";
import { HoraModule } from "./gestion-reserva-cliente/modules/hora/hora.module";
import { HorarioModule } from "./gestion-empresa/modules/horario/horario.module";
import { EmpleadoModule } from "./gestion-empresa/modules/empleado/empleado.module";
import { DisponibilidadModule } from "./gestion-empresa/modules/disponibilidad/disponibilidad.module";
import { SucursalModule } from "./gestion-empresa/modules/sucursal/sucursal.module";
import { PrestadorServicioModule } from "./gestion-empresa/modules/prestador-servicio/prestador-servicio.module";
import { DatabaseModule } from "./database/database.module";
import { EmprendedorModule } from './gestion-empresa/modules/emprendedor/emprendedor.module';
import { GestionEmpresaModule } from './gestion-empresa/gestion-empresa.module';
import { GestionReservaClienteModule } from './gestion-reserva-cliente/gestion-reserva-cliente.module';
import { ReservaModule } from "./gestion-reserva-cliente/modules/reserva/reserva.module";
import { EstadoTurnoModule } from './gestion-reserva-cliente/modules/estado-turno/estado-turno.module';
import { EstadoReservaModule } from './gestion-reserva-cliente/modules/estado-reserva/estado-reserva.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    PermisoModule,
    RolModule,
    UsuarioModule,
    ClienteModule,
    ServicioModule,
    TurnoModule,
    HoraModule,
    HorarioModule,
    EmpleadoModule,
    DisponibilidadModule,
    SucursalModule,
    PrestadorServicioModule,
    EmprendedorModule,
    GestionEmpresaModule,
    GestionReservaClienteModule,
    ReservaModule,
    EstadoTurnoModule,
    EstadoReservaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
