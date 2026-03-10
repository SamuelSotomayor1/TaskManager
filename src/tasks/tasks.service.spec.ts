// import { Repository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Task, TaskPriority, TaskStatus } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

const mockQueryBuilder = {
  andWhere: jest.fn().mockReturnThis(),
  getMany: jest.fn(),
};

describe('TasksService', () => {
  let service: TasksService;
  let repository: jest.Mocked<Repository<Task>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
            preload: jest.fn(),
            create: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<jest.Mocked<Repository<Task>>>(
      getRepositoryToken(Task),
    );

    jest.clearAllMocks();
    mockQueryBuilder.andWhere.mockClear();
    mockQueryBuilder.getMany.mockClear();
  });
  describe('getAll', () => {
    it('debería retornar una lista de tareas', async () => {
      const mockTasks = [
        {
          id: '550e8400-e29b-41d4-a716-446655440000', // UUID real
          title: 'Tarea 1',
          description: 'Descripción de la tarea 1',
          status: TaskStatus.OPEN,
          priority: TaskPriority.LOW,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          title: 'Tarea 2',
          description: 'Descripción de la tarea 2',
          status: TaskStatus.IN_PROGRESS,
          priority: TaskPriority.MEDIUM,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(mockTasks as Task[]);

      const result = await service.getAll({});

      expect(result).toEqual(mockTasks);
      expect(result[0].id).toBeDefined();
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('debería crear una nueva tarea', async () => {
      const createTaskDTO = {
        title: 'Nueva Tarea',
        description: 'Descripción de la nueva tarea',
        status: TaskStatus.OPEN,
        priority: TaskPriority.MEDIUM,
      };
      const mockTask = {
        id: 'uuid-generado',
        ...createTaskDTO,
        status: TaskStatus.OPEN,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repository.create.mockReturnValue(mockTask as Task);
      repository.save.mockResolvedValue(mockTask as Task);

      const result = await service.create(createTaskDTO);

      expect(() => repository.create(createTaskDTO)).not.toThrow();
      expect(result).toEqual(mockTask);
      expect(result.title).toBe(createTaskDTO.title);
      expect(result.id).toBeDefined();
    });
  });

  describe('update', () => {
    it('debería actualizar una tarea correctamente', async () => {
      const updateDTO = { title: 'Tarea Actualizada' };
      const mockUpdatedTask = {
        id: 'uuid-1',
        title: 'Tarea Actualizada',
        status: TaskStatus.OPEN,
      };

      repository.preload.mockResolvedValue(mockUpdatedTask as Task);
      repository.save.mockResolvedValue(mockUpdatedTask as Task);

      const result = await service.update('uuid-1', updateDTO);

      expect(result.title).toBe('Tarea Actualizada');
      expect(result).toEqual(mockUpdatedTask);
    });
  });

  describe('delete', () => {
    it('debería eliminar una tarea exitosamente', async () => {
      repository.delete.mockResolvedValue({
        affected: 1,
        raw: [],
      });
      await expect(() => service.delete('uuid-real')).resolves.not.toThrow();
    });

    it('debería lanzar NotFoundException si la tarea no existe', async () => {
      repository.delete.mockResolvedValue({
        affected: 0,
        raw: [],
      });
      await expect(() => service.delete('uuid-falso')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
