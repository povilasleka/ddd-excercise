import type { ProjectRepository } from "../../ports/project-repository.ts";

export interface RemoveProjectInput {
    projectId: string;
}

export class RemoveProjectUseCase {
    constructor(
        private readonly repository: ProjectRepository,
    ) {}

    async execute(input: RemoveProjectInput) {
        await this.repository.delete(input.projectId);
    }
}