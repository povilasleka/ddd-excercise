import { BaseEntity } from "../shared/base-entity.ts";
import type { Revision } from "../revision/revision.entity.ts";
import { RevisionNotFoundError } from "./project.errors.ts";

export interface CreateProjectProps {
    title: string;
    description: string;
    thumbnailUrl: string;
    clientLogoUrl: string;
}

export interface RehydrateProjectProps {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    clientLogoUrl: string;
    revisions: Revision[];
    createdAt: Date;
    updatedAt: Date;
}

export class Project extends BaseEntity {
    private constructor(
        id: string,
        private readonly title: string,
        private readonly description: string,
        private readonly thumbnailUrl: string,
        private readonly clientLogoUrl: string,
        private readonly revisions: Revision[] = [],
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        super(id, createdAt, updatedAt);
    }

    static create(props: CreateProjectProps): Project {
        return new Project(
            crypto.randomUUID(),
            props.title,
            props.description,
            props.thumbnailUrl,
            props.clientLogoUrl
        )
    }

    static rehydrate(props: RehydrateProjectProps): Project {
        return new Project(
            props.id,
            props.title,
            props.description,
            props.thumbnailUrl,
            props.clientLogoUrl,
            props.revisions,
            props.createdAt,
            props.updatedAt,
        )
    }

    getTitle = () => this.title;
    getDescription = () => this.description;
    getThumbnailUrl = () => this.thumbnailUrl;
    getClientLogoUrl = () => this.clientLogoUrl;
    getIterations = () => this.revisions;

    addIteration(revision: Revision): void {
        this.revisions.push(revision);
        this.touch();
    }

    removeIteration(revisionId: string): void {
        const index = this.revisions.findIndex((iteration) => iteration.getId() === revisionId);
        if (index === -1) {
            throw new RevisionNotFoundError(revisionId);
        }

        this.revisions.splice(index, 1);
        this.touch();
    }
}