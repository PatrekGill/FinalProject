export class ServiceType {
  id: number;
  description: string | undefined;
  name: string | undefined;

  constructor(id: number = 0, description?: string, name?: string) {
    this.id = id;
    this.description = description
    this.name = name;
  }
}
