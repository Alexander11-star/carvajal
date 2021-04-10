export interface AutenticarUserResponseI{
    idUsuario?: Number;
    email?: string;
    password?: string;
    idDocument?: Number;
    nombreCompleto?: string;
    valido?: boolean;
    result?: {
      mensaje: string;
      valor: Number;
    }  
}

export interface AutenticarUserI{
    email?: string;
    password?: string;
}

export interface CreateUserI{
    idUser?: Number;
    firstName?: string;
    lastName?: string;
    idDocument?: Number; 
    type?:string;  
    idNumber?: Number; 
    email?: string;
    password?: string;
 }

 export interface getUsersI{
    idUser?: Number,
    firstName?: string;
    lastName?: string;
    idDocument?: Number,
    type?: string;
    idNumber?: Number,
    email?: string;
    password?: string; 
}

export interface getDocumentI{
    idDocument?: Number,
    type?: string; 
}