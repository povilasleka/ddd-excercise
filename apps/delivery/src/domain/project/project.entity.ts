import { BaseEntity } from "../shared/base-entity.ts";

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
            props.createdAt,
            props.updatedAt,
        )
    }

    getTitle = () => this.title;
    getDescription = () => this.description;
    getThumbnailUrl = () => this.thumbnailUrl;
    getClientLogoUrl = () => this.clientLogoUrl;
}