import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { RegistrarClienteDTO } from '../../../auth/interfaces/registrarCliente.dto'; // Asegúrate de que la ruta sea correcta
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity'; // Asegúrate de que la ruta sea correcta
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('ClienteService', () => {
    let service: ClienteService;
    let repository: Repository<Cliente>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ClienteService,
                {
                    provide: getRepositoryToken(Cliente),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<ClienteService>(ClienteService);
        repository = module.get<Repository<Cliente>>(getRepositoryToken(Cliente));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('registrar', () => {
        it('debería registrar un nuevo cliente', async () => {
            const registrarClienteDto: RegistrarClienteDTO = {
                fechaNacimiento: '1990-01-01',
                documento: 1234567890,
            };

            const cliente = new Cliente();
            cliente.id = 1;

            jest.spyOn(repository, 'save').mockResolvedValue(cliente);

            const result = await service.registrar(registrarClienteDto);
            expect(result).toEqual(cliente);
            expect(repository.save).toHaveBeenCalledWith(expect.objectContaining(registrarClienteDto)); // Cambia para que espere un objeto que contenga las propiedades
        });

        it('debería lanzar un error si el registro falla', async () => {
          const registrarClienteDto: RegistrarClienteDTO = {
              fechaNacimiento: '1990-01-09',
              documento: 5465983165,
          };
      
          jest.spyOn(repository, 'save').mockRejectedValue(new BadRequestException('Error al registrar el cliente'));
      
          await expect(service.registrar(registrarClienteDto)).rejects.toThrow(BadRequestException);
      });
    });
});