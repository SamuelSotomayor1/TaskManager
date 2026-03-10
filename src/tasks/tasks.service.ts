import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTaskFilter } from './dto/get-task-filter';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  // Método para obtener todas las tareas
  async getAll(filterDTO: GetTaskFilter): Promise<Task[]> {
    const { status, priority, search } = filterDTO;
    // Se crea un query builder para construir la consulta de manera dinámica
    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (priority) {
      query.andWhere('task.priority = :priority', { priority });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `Error al obtener tareas: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      );
      throw new InternalServerErrorException(
        'Error al obtener tareas de la base de datos',
      );
    }
  }

  // Método para obtener una tarea por su ID
  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`No se encontró la tarea con ID ${id}`);
    }

    return task;
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
