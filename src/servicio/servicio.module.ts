import {Module} from '@nestjs/common';
import {ServicioService} from './servicio.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ServicioEntity} from './entities/servicio.entity';

@Module({
    controllers: [],
    providers: [ServicioService],
    exports: [ServicioService],
    imports: [TypeOrmModule.forFeature([ServicioEntity])]
})
export class ServicioModule {
}
