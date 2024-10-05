import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PermisoModule } from "./auth/modules/permiso/permiso.module";
import { RolModule } from "./auth/modules/rol/rol.module";
import { UsuarioModule } from "./auth/modules/usuario/usuario.module";
import { EstadoModule } from "./resources/estado/estado.module";
import { ClienteModule } from "./gestion-reserva-cliente/modules/cliente/cliente.module";
import { ReservaTurnoModule } from "./gestion-reserva-cliente/modules/reserva-turno/reserva-turno.module";
import { ServicioModule } from "./resources/servicio/servicio.module";
import { TurnoModule } from "./resources/turno/turno.module";
import { HoraModule } from "./resources/hora/hora.module";
import { HorarioModule } from "./resources/horario/horario.module";
import { EmpleadoModule } from "./resources/empleado/empleado.module";
import { DisponibilidadModule } from "./resources/disponibilidad/disponibilidad.module";
import { SucursalModule } from "./resources/sucursal/sucursal.module";
import { PrestadorServicioModule } from "./resources/prestador-servicio/prestador-servicio.module";
import { DatabaseModule } from "./database/database.module";
import { EmprendedorModule } from './resources/emprendedor/emprendedor.module';
import { GestionEmpresaModule } from './gestion-empresa/gestion-empresa.module';
import { GestionReservaClienteModule } from './gestion-reserva-cliente/gestion-reserva-cliente.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    PermisoModule,
    RolModule,
    UsuarioModule,
    EstadoModule,
    ClienteModule,
    ReservaTurnoModule,
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
    GestionReservaClienteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
