import type { Revision } from "../../domain/revision/revision.entity.ts";

export interface RevisionRepository {
    findById(revisionId: string): Promise<Revision | null>;
    findByRevisionItemId(revisionItemId: string): Promise<Revision | null>;
    save(revision: Revision): Promise<void>;
}