import { Project } from '../../../domain/project/project.entity.ts';
import type { ProjectRepository } from '../../ports/project-repository.ts';

export interface CreateProjectInput {
  title: string;
  description: string;
  thumbnailUrl: string;
  clientLogoUrl: string;
}

export class CreateProjectUseCase {
  constructor(private readonly repository: ProjectRepository) {}

  async execute(input: CreateProjectInput): Promise<void> {
    const project = Project.create(input);
    await this.repository.save(project);
  }
}
