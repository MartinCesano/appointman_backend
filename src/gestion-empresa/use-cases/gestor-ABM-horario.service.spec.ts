import { Test, TestingModule } from '@nestjs/testing';
import { GestorABMHorariosService } from './gestor-ABM-horarios.service';
import { UsuarioService } from '../../auth/modules/usuario/usuario.service';
import { HoraService } from "../../gestion-reserva-cliente/modules/hora/hora.service";
import { HorarioService } from "../modules/horario/horario.service";
import { EmpresaService } from "../modules/empresa/empresa.service";
import { RegistrarHorarioDTO } from "../interfaces/registrar-horario.dto";
import { IUsuario } from "../../auth/interfaces/usuario.interface";

describe('GestorABMHorariosService', () => {
  let service: GestorABMHorariosService;
  let usuarioService: UsuarioService;
  let horaService: HoraService;
  let horarioService: HorarioService;
  let empresaService: EmpresaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GestorABMHorariosService,
        {
          provide: UsuarioService,
          useValue: {
            getEmpresa: jest.fn().mockResolvedValue({
              id: 1,
              nombre: 'Empresa Test'
            }),
            buscarPorEmail: jest.fn().mockResolvedValue({
              id: 1,
              email: "martingaido@gmail.com",
              empresa: { id: 1, nombre: 'Empresa Test' },
            }),
          },
        },
        {
          provide: HoraService,
          useValue: {
            getMultiplosHoras: jest.fn().mockResolvedValue(30), // Ejemplo de intervalo de 30 min
            getAll: jest.fn().mockResolvedValue([]), // Para retornar horas ya creadas (mock vacío)
            bulkInsert: jest.fn().mockResolvedValue([{ horaInicio: '12:00', horaFin: '12:30' }]), // Mock para bulk insert
          },
        },
        {
          provide: HorarioService,
          useValue: {
            insert: jest.fn((dto: RegistrarHorarioDTO) => {
              // Mock dinámico que retorna diferentes valores según el DTO
              return Promise.resolve({
                nombre: dto.nombre,
                horaInicio: dto.horaInicio,
                horaFin: dto.horaFin,
                diasActivos: dto.diasActivos,
                horas: [],
              });
            }),
          },
        },
        {
          provide: EmpresaService,
          useValue: {
            getHorarios: jest.fn().mockResolvedValue([]), // Mock de ejemplo para obtener horarios
            agregarHorario: jest.fn().mockResolvedValue(null), // Simula la adición de un horario a la empresa
          },
        },
      ],
    }).compile();

    service = module.get<GestorABMHorariosService>(GestorABMHorariosService);
    usuarioService = module.get<UsuarioService>(UsuarioService);
    horaService = module.get<HoraService>(HoraService);
    horarioService = module.get<HorarioService>(HorarioService);
    empresaService = module.get<EmpresaService>(EmpresaService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería devolver estado creado', async () => {
    const dto: RegistrarHorarioDTO = {
      nombre: "Fin de samana3",
      horaInicio: "12:00",
      horaFin: "16:00",
      diasActivos: ["martes", "miercoles", "jueves", "viernes"]
    };

    const usuario: IUsuario = await usuarioService.buscarPorEmail("martingaido@gmail.com");
    const result = await service.registrarHorario(dto, usuario);

    // Comprobar que el resultado tiene las propiedades esperadas
    expect(result).toHaveProperty('nombre', 'Fin de samana3');
    expect(result).toHaveProperty('horaInicio', "12:00");
    expect(result).toHaveProperty('horaFin', "16:00");
    expect(result).toHaveProperty('diasActivos', "martes,miercoles,jueves,viernes");
  });

  it('debería registrar el horario en un tiempo razonable', async () => {
    const dto: RegistrarHorarioDTO = {
      nombre: "Fin de semana rápido",
      horaInicio: "10:00",
      horaFin: "14:00",
      diasActivos: ["lunes", "miércoles", "viernes"]
    };

    const usuario: IUsuario = await usuarioService.buscarPorEmail("martingaido@gmail.com");

    // Medir el tiempo de ejecución
    const startTime = performance.now();
    const result = await service.registrarHorario(dto, usuario);
    const endTime = performance.now();

    const duration = endTime - startTime;
    console.log(`Tiempo de ejecución: ${duration} ms`);

    // Verificar que los datos sean correctos
    expect(result).toHaveProperty('nombre', 'Fin de semana rápido');
    expect(result).toHaveProperty('horaInicio', "10:00");
    expect(result).toHaveProperty('horaFin', "14:00");
    expect(result).toHaveProperty('diasActivos', "lunes,miércoles,viernes");

    // Asegurarse de que el tiempo de ejecución no sea mayor a 500 ms
    expect(duration).toBeLessThan(30);
  });

  it('debería registrar múltiples horarios en un tiempo razonable', async () => {
    const horarios: RegistrarHorarioDTO[] = Array.from({ length: 1000 }).map((_, index) => ({
      nombre: `Horario ${index + 1}`,
      horaInicio: "08:00",
      horaFin: "18:00",
      diasActivos: ["lunes", "martes", "miércoles", "jueves", "viernes"]
    }));
  
    const usuario: IUsuario = await usuarioService.buscarPorEmail("martingaido@gmail.com");
  
    const startTime = performance.now();
  
    for (const dto of horarios) {
      await service.registrarHorario(dto, usuario);
    }
  
    const endTime = performance.now();
    const duration = endTime - startTime;
  
    console.log(`Tiempo total para registrar 1000 horarios: ${duration} ms`);
    expect(duration).toBeLessThan(5000); // Verificar que no supere 5 segundos
  });

  it('debería manejar solicitudes concurrentes eficientemente', async () => {
    const horarios: RegistrarHorarioDTO[] = Array.from({ length: 50 }).map((_, index) => ({
      nombre: `Horario ${index + 1}`,
      horaInicio: "09:00",
      horaFin: "17:00",
      diasActivos: ["lunes", "miércoles"]
    }));
  
    const usuario: IUsuario = await usuarioService.buscarPorEmail("martingaido@gmail.com");
  
    const startTime = performance.now();
  
    const results = await Promise.all(
      horarios.map((dto) => service.registrarHorario(dto, usuario))
    );
  
    const endTime = performance.now();
    const duration = endTime - startTime;
  
    console.log(`Tiempo total para 50 solicitudes concurrentes: ${duration} ms`);
  
    expect(results).toHaveLength(50); // Verificar que se procesaron todas las solicitudes
    expect(duration).toBeLessThan(2000); // Máximo 2 segundos para procesar todas
  });

  it('debería escalar adecuadamente con carga incremental', async () => {
    const usuario: IUsuario = await usuarioService.buscarPorEmail("martingaido@gmail.com");
  
    const cargas = [10, 50, 100, 200]; 
    const tiempos: number[] = [];
  
    for (const carga of cargas) {
      const horarios: RegistrarHorarioDTO[] = Array.from({ length: carga }).map((_, index) => ({
        nombre: `Horario ${index + 1}`,
        horaInicio: "10:00",
        horaFin: "18:00",
        diasActivos: ["martes", "jueves"]
      }));
  
      const startTime = performance.now();
      await Promise.all(horarios.map((dto) => service.registrarHorario(dto, usuario)));
      const endTime = performance.now();
  
      const duration = endTime - startTime;
      tiempos.push(duration);
  
      console.log(`Carga: ${carga} - Tiempo: ${duration} ms`);
    }
  
    // Verificar que el tiempo no crezca desproporcionadamente
    expect(Math.max(...tiempos)).toBeLessThan(10000); // Ninguna carga debe tomar más de 10 segundos
  });
  


  it('debería manejar correctamente un intento de inyección SQL', async () => {
    // Inyección SQL en el campo 'nombre'
    const dto: RegistrarHorarioDTO = {
      nombre: "Corte'; DROP TABLE horarios; --",  // Intento de inyección
      horaInicio: "12:00",
      horaFin: "14:00",
      diasActivos: ["lunes", "miércoles"]
    };
  
    const usuario = await usuarioService.buscarPorEmail("martingaido@gmail.com");
  
    try {
      // Intento de registrar el horario con un valor malicioso
      await service.registrarHorario(dto, usuario);
    } catch (error) {
      // Asegurarse de que el error contiene un mensaje adecuado y no se ejecuta la inyección
      expect(error.message).toContain('El nombre contiene caracteres no permitidos');
      expect(error.message).not.toContain('DROP TABLE');  // Verificar que el SQL malicioso no se ejecute
    }
  });
  



  
});
