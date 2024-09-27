import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JwtModule } from "./jwt/jwt.module";
import { AuthModule } from "./auth/auth.module";
import { PermissionsModule } from "./resources/permissions/permissions.module";
import { RolesModule } from "./resources/roles/roles.module";
import { UsersModule } from "./resources/users/users.module";
import { RefreshModule } from "./refresh/refresh.module";
import { EstadoModule } from "./resources/estado/estado.module";
import { ClienteModule } from "./resources/cliente/cliente.module";
import { ReservaTurnoModule } from "./resources/reserva-turno/reserva-turno.module";
import { ServicioModule } from "./resources/servicio/servicio.module";
import { TurnoModule } from "./resources/turno/turno.module";
import { HoraModule } from "./resources/hora/hora.module";
import { HorarioModule } from "./resources/horario/horario.module";
import { EmpleadoModule } from "./resources/empleado/empleado.module";
import { DisponibilidadModule } from "./resources/disponibilidad/disponibilidad.module";
import { SucursalModule } from "./resources/sucursal/sucursal.module";
import { PrestadorServicioModule } from "./resources/prestador-servicio/prestador-servicio.module";
import { GestorRegistrarTipoServicioModule } from "./gestor-registrar-tipo-servicio/gestor-registrar-tipo-servicio.module";
import { DatabaseModule } from "./database/database.module";
import { EmprendedorModule } from './resources/emprendedor/emprendedor.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule,
    AuthModule,
    PermissionsModule,
    RolesModule,
    UsersModule,
    RefreshModule,
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
    GestorRegistrarTipoServicioModule,
    EmprendedorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
