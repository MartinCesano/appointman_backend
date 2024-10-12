import {Module} from '@nestjs/common';
import {ServicioService} from './servicio.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Servicio} from './servicio.entity';

@Module({
    controllers: [],
    providers: [ServicioService],
    exports: [ServicioService],
    imports: [TypeOrmModule.forFeature([Servicio])]
})
export class ServicioModule {
}
