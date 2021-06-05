export class ScreenCapture{
  id:string;
  fileName:string;
  logTime:Date
  constructor(options: any = {}) {
    this.id = options.id || null;
    this.fileName = options.fileName || null;
    this.logTime = options.logTime ? new Date(options.logTime): null || null;
  }
}