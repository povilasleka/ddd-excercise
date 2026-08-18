export abstract class BaseEntity {
    protected readonly id: string;
    protected readonly createdAt: Date;
    protected updatedAt: Date;

    protected constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
        this.id = id || crypto.randomUUID();
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    public getId = (): string => this.id;
    public getCreatedAt = (): Date => this.createdAt;
    public getUpdatedAt = (): Date => this.updatedAt;

    protected touch(): void {
        this.updatedAt = new Date();
    }
}