export class Problem {
  id: number;
  description: string | undefined;

  constructor(id: number = 0, description?: string) {
    this.id = id;
    this.description = description
  }
}
