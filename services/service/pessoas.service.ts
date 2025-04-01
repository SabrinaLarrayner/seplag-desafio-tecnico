import { useGet } from "../base/use-get";

export enum Gender {
    MASCULINO = 'MASCULINO',
    FEMININO = 'FEMININO'
  }
  
  export enum ListPoster {
    PDF_DESAPARECIDO = 'PDF_DESAPARECIDO',
    PDF_LOCALIZADO = 'PDF_LOCALIZADO',
    JPG_DESAPARECIDO = 'JPG_DESAPARECIDO',
    JPG_LOCALIZADO = 'JPG_LOCALIZADO',
    INSTA_DESAPARECIDO = 'INSTA_DESAPARECIDO',
    INSTA_LOCALIZADO = 'INSTA_LOCALIZADO'
  }

export class PessoasPayload {
  id?: string;
}

export class PessoasResponse {
  id!: number
  nome?: string
  idade?: number
  sexo?: Gender
  vivo?: boolean
  urlFoto?: string
  ultimaOcorrencia?: {
    dtDesaparecimento: Date
    dataLocalizacao: Date
    encontradoVivo: boolean
    localDesaparecimentoConcat: string
    ocorrenciaEntrevDesapDTO: {
      informacao: string
      vestimentasDesaparecido: string
    }
    listaCartaz: 
      {
        urlCartaz: string
        tipoCartaz: ListPoster
      }[]
    ocoId: number
  }
}

export async function pessoasService(payload?: PessoasPayload) {
  return useGet<PessoasResponse>(`v1/pessoas/${payload?.id}`, { ...payload });
}
