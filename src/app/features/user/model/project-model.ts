export class Project{
  id:string;
  title:string;
  isArchived:boolean;
  constructor(options: any = {}) {
    this.id = options.id || "";
    this.title = options.title || "";
    this.isArchived = options.isArchived || false;
  }
}