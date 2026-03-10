import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDTO } from './create-task.dto';

// El DTO de actualización extiende del DTO de creación con todos los campos son opcionales
export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {}
