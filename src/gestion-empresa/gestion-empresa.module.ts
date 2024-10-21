import { Module } from '@nestjs/common';
import { GestionEmpresaService } from './gestion-empresa.service';
import { GestorRegistrarTipoServicioService } from './use-cases/gestor-registrar-tipo-servicio.service';
import { GestionEmpresaController } from './gestion-empresa.controller';
import { ServicioModule } from './modules/servicio/servicio.module';
import { GestorRegistrarDisponibilidadService } from './use-cases/gestor-registrar-disponibilidad.service';
import { EmpleadoModule } from './modules/empleado/empleado.module';
import { TurnoModule } from '../gestion-reserva-cliente/modules/turno/turno.module';
import { HorarioModule } from './modules/horario/horario.module';
import { HoraModule } from '../gestion-reserva-cliente/modules/hora/hora.module';
import { DisponibilidadModule } from './modules/disponibilidad/disponibilidad.module';
import { JwtModule} from "../auth/modules/jwt/jwt.module";
import { JwtService} from "../auth/modules/jwt/jwt.service";
import { UsuarioModule} from "../auth/modules/usuario/usuario.module";
import { PrestadorServicioModule } from './modules/prestador-servicio/prestador-servicio.module';
import { GestorObtenerServiciosService} from "./use-cases/gestor-obtener-servicios.service";
import { GestorABMHorariosService} from "./use-cases/gestor-ABM-horarios.service";
import { EmpresaModule} from "./modules/empresa/empresa.module";

@Module({
  controllers: [GestionEmpresaController],
  providers: [
    GestionEmpresaService,
    GestorRegistrarTipoServicioService,
    GestorRegistrarDisponibilidadService,
    GestorObtenerServiciosService,
    JwtService,
    GestorABMHorariosService
  ],
  imports: [
    ServicioModule, 
    EmpleadoModule,
    TurnoModule,
    HorarioModule,
    HoraModule,
    DisponibilidadModule, 
    TurnoModule,
    JwtModule,
    UsuarioModule,
    PrestadorServicioModule,
    EmpresaModule
  ]
})
export class GestionEmpresaModule {}
