import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('tasks') //Ruta base (http://localhost:3000/api/tasks)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Obtener todas las tareas
  @Get()
  findAll() {
    return this.tasksService.getAll();
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

  // Eliminar una tarea
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.delete(id);
  }
}
