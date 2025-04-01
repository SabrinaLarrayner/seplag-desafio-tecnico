import { useGet } from "../base/use-get";

export class PessoasAbertoEstatisticoPayload {}

export class PessoasAbertoEstatisticoResponse {
  quantPessoasDesaparecidas!: number
  quantPessoasEncontradas!: number
}

export async function pessoasAbertoEstatisticoService(payload?: PessoasAbertoEstatisticoPayload) {
  return useGet<PessoasAbertoEstatisticoResponse>("v1/pessoas/aberto/estatistico", { ...payload });
}
