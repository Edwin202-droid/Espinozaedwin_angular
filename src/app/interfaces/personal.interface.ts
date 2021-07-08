
export class PersonalModel{
    constructor(
    public ApPaterno: string,
    public ApMaterno:string,
    public Nombre1: string,
    public Nombre2: string,
    public Dni: string,
    public PersonalId?: string,
    public FechaNacimiento?:string,
    public FechaIngreso?:string,
    public NombreCompleto?:string
    ){}
}

export interface Personal{
    personalId:string,
    apPaterno:string,
    apMaterno:string,
    nombre1: string,
    nombre2: string,
    dni:string,
    nombreCompleto:string,
    fechaNacimiento:string,
    fechaIngreso:string
}