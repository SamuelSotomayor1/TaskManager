import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  // Método para obtener todas las tareas
  async getAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  // Método para crear una nueva tarea
  async create(createTaskDTO: CreateTaskDTO): Promise<Task> {
    try {
      const task = this.taskRepository.create(createTaskDTO);
      return await this.taskRepository.save(task);
    } catch (error) {
      this.logger.error(
        `Error al crear tarea: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      );
      throw new InternalServerErrorException(
        'Error al guardar en la base de datos',
      );
    }
  }

  async update(id: string, updateTaskDTO: UpdateTaskDTO): Promise<Task> {
    const task = await this.taskRepository.preload({
      id: id,
      ...updateTaskDTO,
    });
    // Verificar si la tarea existe antes de intentar guardarla
    if (!task) {
      throw new NotFoundException(
        `No se encontró la tarea con ID ${id} para actualizar`,
      );
    }

    try {
      // Guardar la tarea actualizada en la base de datos
      return await this.taskRepository.save(task);
    } catch (error) {
      this.logger.error(
        `Error al actualizar tarea: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      );
      throw new InternalServerErrorException(
        'Error al procesar la actualización en la base de datos',
      );
    }
  }

  //Método para eliminar una tarea por su ID
  async delete(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `No se encontró la tarea con ID ${id} para eliminar`,
      );
    }
  }
}
