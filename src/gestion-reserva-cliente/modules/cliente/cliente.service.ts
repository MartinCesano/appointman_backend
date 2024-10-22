import {BadRequestException, Injectable} from '@nestjs/common';
import {Cliente} from './cliente.entity';
import {RegistrarClienteDTO} from "../../../auth/interfaces/registrarCliente.dto";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from '../reserva/reserva.entity';


@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente) // Inyecta el repositorio de Cliente
        private readonly repository: Repository<Cliente>,
    ) {}

    registrar(nuevoCliente: RegistrarClienteDTO): Promise<Cliente> {
        try {
            const newCliente = new Cliente();
            Object.assign(newCliente, nuevoCliente);
            return this.repository.save(newCliente);
        } catch (error) {
            throw new BadRequestException(`Error creating cliente: ${error.message}`);
        }
    }

    async buscar(idCliente: number): Promise<Cliente> {
        return this.repository.findOne({
            where: { id: idCliente },
            relations: ['reservas'] // Asegúrate de cargar las relaciones necesarias
        });
    }

    async actualizar(cliente: Cliente): Promise<Cliente> {
        return await this.repository.save(cliente);
    }

    async registrarReserva(reserva: Reserva, idCliente: number): Promise<Reserva> {
        // Buscar al cliente de forma síncrona
        const cliente = await this.buscar(idCliente);
    
        // Si no se encuentra el cliente, lanzar un error
        if (!cliente) {
            throw new Error(`Cliente con ID ${idCliente} no encontrado`);
        }
        console.log(cliente);
    
        // Asociar la nueva reserva al cliente
        cliente.reservas.push(reserva);
    
        // Guardar los cambios del cliente con la nueva reserva
        await this.actualizar(cliente);
    
        return reserva;
    }
    




}
