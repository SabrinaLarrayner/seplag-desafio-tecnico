import { usePost } from "../base/use-post";

export class OcorrenciasInformacoesDesaparecidoPayload {
  informacao?: string;
  descricao?: string;
  data?: Date;
  ocoId?: string;
  informacaoId?: string[];
}

export class OcorrenciasInformacoesDesaparecidoResponse {
  ocoId!: string;
  informacao!: string;
  descricao!: string;
  data!: Date;
  anexos!: string[];
  informacaoId!: string[];
}

export async function ocorrenciasInformacoesDesaparecidoService(
  payload: OcorrenciasInformacoesDesaparecidoPayload
) {
  return usePost<OcorrenciasInformacoesDesaparecidoResponse>(
    "v1/ocorrencias/informacoes-desaparecido",
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
}
