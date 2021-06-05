export class Leave {

  department: number;
  employeeId: string;
  strarDate: Date;
  LeaveType: number;
  id: string;
  endDate: Date;
  description: string; 

  constructor(options: any = {}) {
    this.id = options.id || "";
    this.LeaveType = options.LeaveType || null;
    this.description = options.description || ""; 
    this.employeeId = options.employeeId || "";
    this.department = options.department || "";
    this.strarDate = options.strarDate ? new Date(options.strarDate) : null;
    this.endDate = options.endDate ? new Date(options.endDate) : null;
  }
}