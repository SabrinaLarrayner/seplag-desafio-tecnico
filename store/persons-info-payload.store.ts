import { defineStore } from 'pinia'
import { format } from 'date-fns'
import { PessoasPayload, PessoasResponse, pessoasService } from '~/services/service/pessoas.service'
import { ocorrenciasInformacoesDesaparecidoService, OcorrenciasInformacoesDesaparecidoPayload } from '~/services/service/ocorrencias-informacoes-desaparecido.service'

export const usePersonsInfoPayloadStore = defineStore('usePersonsInfoPayloadStore', {
  state: () => ({
    person: null as PessoasResponse | null,
    loading: false,
    error: null as string | null,
    form: {
      informacao: '',
      descricao: '',
      data: '',
      anexos: [] as File[],
    }
  }),

  actions: {
    async init(payload?: PessoasPayload) {
      this.loading = true
      this.error = null
      try {
        const response = await pessoasService(payload)
        this.person = response
      } catch (err: any) {
        this.error = 'Erro ao buscar detalhes da pessoa'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    formatarData(data: string | Date) {
      return format(new Date(data), 'dd/MM/yyyy HH:mm')
    },

    handleFileUpload(files: FileList) {
      this.form.anexos = Array.from(files)
    },

    async confirm() {
      if (!this.person?.ultimaOcorrencia?.ocoId) {
        throw new Error('ID da ocorrência não encontrado.')
      }

      const payload: OcorrenciasInformacoesDesaparecidoPayload = {
        informacao: this.form.informacao,
        descricao: this.form.descricao,
        data: new Date(this.form.data),
        ocoId: this.person.ultimaOcorrencia.ocoId,
        informacaoId: []
      }

      try {
        await ocorrenciasInformacoesDesaparecidoService(payload)
        this.resetForm()
      } catch (error) {
        console.error('Erro ao enviar informações adicionais:', error)
        throw error
      }
    },

    resetForm() {
      this.form = {
        informacao: '',
        descricao: '',
        data: '',
        anexos: []
      }
    },

    reset() {
      this.person = null
      this.loading = false
      this.error = null
      this.resetForm()
    }
  }
})

export default usePerInfoStorPe
