import { PlaybackPosition } from "../../../domain/revision-item/revision-item.value-objects.ts";
import type { RevisionRepository } from "../../ports/revision-repository.ts";

export interface CreateRevisionItemInput {
    revisionId: string;
    milliseconds: number;
    comment: string;
}

export class CreateRevisionItemUseCase {
    constructor(
        private readonly revisionRepository: RevisionRepository,
    ) {}

    async execute(input: CreateRevisionItemInput) {
        const revision = await this.revisionRepository.findById(input.revisionId);
        if (!revision) {
            throw new Error("Revision not found!");
        }

        revision.addRevisionItem({
            playbackPosition: PlaybackPosition.fromMilliseconds(input.milliseconds),
            comment: input.comment,
        });

        await this.revisionRepository.save(revision);
    }
}