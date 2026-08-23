import type { Project } from '../../domain/project/project.entity.ts';

export interface ProjectRepository {
  findById(id: string): Promise<Project | null>;
  findByTitle(title: string): Promise<Project | null>;
  delete(projectId: string): Promise<void>;
  save(project: Project): Promise<void>;
}
