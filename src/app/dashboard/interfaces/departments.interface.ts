export interface DatumDepartments {
    status: string;
    message: string;
    data: Departments[];
}

export interface Departments {
    id: number;
    code: string;
    name: string;
    department: string;
}
