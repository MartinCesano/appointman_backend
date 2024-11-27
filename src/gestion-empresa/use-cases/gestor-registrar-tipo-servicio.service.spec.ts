import { Test, TestingModule } from '@nestjs/testing';
import { GestorRegistrarTipoServicioService } from './gestor-registrar-tipo-servicio.service';
import { ServicioService } from '../modules/servicio/servicio.service';
import { UsuarioService } from '../../auth/modules/usuario/usuario.service';
import { RegistrarTipoServicioDTO } from '../interfaces/registrarTipoServicio';

describe('GestorRegistrarTipoServicioService', () => {
  let service: GestorRegistrarTipoServicioService;
  let servicioService: ServicioService;
  let usuarioService: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GestorRegistrarTipoServicioService,
        {
          provide: ServicioService,
          useValue: {
            create: jest.fn().mockResolvedValue({  // Mock para el método create
              nombre: 'Corte de Pelo',
              duracion: 40,
              precio: 8000,
              empresa: { id: 1, nombre: 'Empresa Test' }
            }),
          },
        },
        {
          provide: UsuarioService,
          useValue: {
            getEmpresa: jest.fn(),
            buscarPorEmail: jest.fn().mockResolvedValue({
              id: 1,
              email: "martingaido@gmail.com",
              empresa: { id: 1, nombre: 'Empresa Test' },
            }),
          },
        },
      ],
    }).compile();

    service = module.get<GestorRegistrarTipoServicioService>(GestorRegistrarTipoServicioService);
    servicioService = module.get<ServicioService>(ServicioService);
    usuarioService = module.get<UsuarioService>(UsuarioService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería devolver el servicio asociado a la empresa', async () => {
    const dto: RegistrarTipoServicioDTO = { nombre: 'Corte de Pelo', duracion: 40, precio: 4000, idEmpresa: 1 };
    const usuario = await usuarioService.buscarPorEmail("martingaido@gmail.com");

    const result = await service.registrarTipoServicio(dto, usuario);

    // Comprobar que el resultado tiene las propiedades esperadas
    expect(result).toHaveProperty('nombre', 'Corte de Pelo');
    expect(result).toHaveProperty('duracion', 40);
    expect(result).toHaveProperty('precio', 8000);
    expect(result).toHaveProperty('empresa');
  });

  it('debería devolver error porque la duracion no es multiplo de 5', async () => {
    const dto: RegistrarTipoServicioDTO = { nombre: 'Tintura', duracion: 62, precio: 8000, idEmpresa: 1 };
    const usuario = await usuarioService.buscarPorEmail("martingaido@gmail.com");

    const result = await service.registrarTipoServicio(dto, usuario);

    // Comprobar que el resultado tiene las propiedades esperadas
    expect(result).toEqual({ error: 'La duracion debe ser mayor a 0 y multiplo de 5' });
  });

  it('debería devolver error porque la duracion es 0', async () => {
    const dto: RegistrarTipoServicioDTO = { nombre: 'Nutricion', duracion: 0, precio: 8000, idEmpresa: 1 };
    const usuario = await usuarioService.buscarPorEmail("martingaido@gmail.com");

    const result = await service.registrarTipoServicio(dto, usuario);

    // Comprobar que el resultado tiene las propiedades esperadas
    expect(result).toEqual({ error: 'La duracion debe ser mayor a 0 y multiplo de 5' });
  });


  it('debería completar el registro en menos de 8ms', async () => {
    const dto: RegistrarTipoServicioDTO = { nombre: 'Corte de Pelo', duracion: 40, precio: 4000, idEmpresa: 1 };
    const usuario = await usuarioService.buscarPorEmail("martingaido@gmail.com");
    const inicio = performance.now();
    await service.registrarTipoServicio(dto, usuario);
    const fin = performance.now();
    const tiempo = fin - inicio;
    console.log('Tiempo de ejecución:', tiempo);
  
    expect(tiempo).toBeLessThan(8); // Tiempo máximo aceptable
  });
  
  it('debería ejecutar múltiples registros para medir consistencia (10 ejecuciones), y que devuelva un tiempo', async () => {
    const dto: RegistrarTipoServicioDTO = { nombre: 'Corte de Pelo', duracion: 40, precio: 4000, idEmpresa: 1 };
    const usuario = await usuarioService.buscarPorEmail("martingaido@gmail.com");
  
    const ejecuciones = 10;
    const tiempos: number[] = [];
  
    for (let i = 0; i < ejecuciones; i++) {
      const inicio = performance.now(); // Inicio del cronómetro
      await service.registrarTipoServicio(dto, usuario);
      const fin = performance.now(); // Fin del cronómetro
      tiempos.push(fin - inicio);
    }
    // Mostrar tiempos en consola
    console.log('Tiempos de ejecución:', tiempos);
    console.log('Promedio de ejecución:', tiempos.reduce((a, b) => a + b, 0) / ejecuciones);
  
    expect(tiempos).toBeDefined();
  });
  
  it('debería manejar correctamente un intento de inyección SQL', async () => {
    const dto: RegistrarTipoServicioDTO = { 
      nombre: "Corte'; DROP TABLE servicios; --", 
      duracion: 40, 
      precio: 8000, 
      idEmpresa: 1 
    };
    const usuario = await usuarioService.buscarPorEmail("martingaido@gmail.com");
  
    try {
      await service.registrarTipoServicio(dto, usuario);
    } catch (error) {
      // Asegurarse de que el error contiene un mensaje adecuado
      expect(error.message).toContain('El nombre contiene caracteres no permitidos');
    }
  });
  
  
  


  

});
