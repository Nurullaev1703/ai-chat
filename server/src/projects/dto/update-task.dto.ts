import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto extends PartialType(CreateProjectDto) {
    status?: TaskStatus
}
