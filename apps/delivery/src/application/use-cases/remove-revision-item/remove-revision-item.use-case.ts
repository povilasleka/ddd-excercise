import type { RevisionRepository } from '../../ports/revision-repository.ts';

export interface RemoveRevisionItemInput {
  revisionItemId: string;
}

export class RemoveRevisionItemUseCase {
  constructor(private readonly revisionRepository: RevisionRepository) {}

  async execute(input: RemoveRevisionItemInput) {
    const revision = await this.revisionRepository.findByRevisionItemId(input.revisionItemId);
    if (!revision) {
      throw new Error('Revision not found!');
    }

    revision.removeRevisionItem(input.revisionItemId);

    await this.revisionRepository.save(revision);
  }
}
