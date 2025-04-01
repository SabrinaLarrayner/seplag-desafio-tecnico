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

export class PessoasAbertoFiltroPayload {
  nome?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: string;
  pagina?: number;
  porPagina?: number;
  status!: string;
}

export class PessoasAbertoFiltroResponse {
    totalPages!: number
    totalElements!: number
    pageable!: {
      pageNumber: number
      paged: boolean
      pageSize: number
      unpaged: boolean
      offset: number
      sort: {
        sorted: boolean
        unsorted: boolean
        empty: boolean
      }
    }
    numberOfElements?: number
    first?: boolean
    last?: boolean
    size?: number
    content?: 
      {
        id: number
        nome?: string
        idade: number
        sexo: Gender
        vivo: boolean
        urlFoto: string
        ultimaOcorrencia: {
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
      }[]
    number?: number
    sort?: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    empty?: boolean
}

export async function pessoasAbertoFiltroService(payload?: PessoasAbertoFiltroPayload) {
  return useGet<PessoasAbertoFiltroResponse>("v1/pessoas/aberto/filtro", { ...payload });
}
