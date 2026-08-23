import { Revision } from '../../../domain/revision/revision.entity.ts';
import type { RevisionRepository } from '../../ports/revision-repository.ts';

export interface CreateRevisionInput {
  projectId: string;
  version: string;
  description: string;
}

export class CreateRevisionUseCase {
  constructor(private readonly revisionRepository: RevisionRepository) {}

  async execute(input: CreateRevisionInput) {
    const revision = Revision.create({
      projectId: input.projectId,
      version: input.version,
      description: input.description,
    });

    await this.revisionRepository.save(revision);
  }
}
