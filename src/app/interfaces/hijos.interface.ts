
export class HijoModel{
    constructor(
    public ApPaterno: string,
    public ApMaterno:string,
    public Nombre1: string,
    public Nombre2: string,
    public FechaNacimiento: string,
    public PersonalId?: string,
    public DerHabId?:string,
    public NombreCompleto?:string,
    ){}
}

export interface Hijos{
    derHabId:string,
    apPaterno:string,
    apMaterno:string,
    nombre1: string,
    nombre2: string,
    fechaNacimiento:string,
    nombreCompleto:string,
    personalId:string
}