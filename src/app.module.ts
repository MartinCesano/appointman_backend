import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { entities } from "./entities";
import { JwtModule } from "./jwt/jwt.module";
import { AuthModule } from "./auth/auth.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { RolesModule } from "./roles/roles.module";
import { UsersModule } from "./users/users.module";
import { RefreshModule } from "./refresh/refresh.module";
import { EstadoModule } from "./estado/estado.module";
import { ClienteModule } from "./cliente/cliente.module";
import { ReservaTurnoModule } from "./reserva-turno/reserva-turno.module";
import { ServicioModule } from "./servicio/servicio.module";
import { TurnoModule } from "./turno/turno.module";
import { HoraModule } from "./hora/hora.module";
import { HorarioModule } from "./horario/horario.module";
import { EmpleadoModule } from "./empleado/empleado.module";
import { DisponibilidadModule } from "./disponibilidad/disponibilidad.module";
import { SucursalModule } from "./sucursal/sucursal.module";
import { PrestadorServicioModule } from "./prestador-servicio/prestador-servicio.module";
import { GestorRegistrarTipoServicioModule } from "./gestor-registrar-tipo-servicio/gestor-registrar-tipo-servicio.module";
import { DatabaseModule } from "./database/database.module";
import { EmprendedorModule } from './emprendedor/emprendedor.module';

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
