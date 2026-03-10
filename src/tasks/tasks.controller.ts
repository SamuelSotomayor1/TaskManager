import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTaskFilter } from './dto/get-task-filter';
import { TaskStatus } from './entities/task.entity';

@Controller('tasks') //Ruta base (http://localhost:3000/api/tasks)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Obtener todas las tareas o filtrar por estado, prioridad o búsqueda
  @Get()
  findAll(@Query() filterDto: GetTaskFilter) {
    return this.tasksService.getAll(filterDto);
  }

  // Obtener una tarea por su ID
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.findOne(id);
  }

  // Crear una tarea
  @Post()
  create(@Body() createTaskDTO: CreateTaskDTO) {
    return this.tasksService.create(createTaskDTO);
  }

  // Actualizar una tarea
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ) {
    return this.tasksService.update(id, updateTaskDTO);
  }

  //Actualizar el estado de una tarea específica
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status', new ParseEnumPipe(TaskStatus)) status: TaskStatus,
  ) {
    return this.tasksService.update(id, { status });
  }

  // Eliminar una tarea
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.delete(id);
  }
}
