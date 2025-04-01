import { defineStore } from 'pinia'
import { format, differenceInDays, differenceInMonths, differenceInYears } from 'date-fns'
import { PessoasPayload, PessoasResponse, pessoasService } from '~/services/service/pessoas.service'
import { ocorrenciasInformacoesDesaparecidoService } from '~/services/service/ocorrencias-informacoes-desaparecido.service'

export const usePersonsDetailsStore = defineStore('usePersonsDetailsStore', {
  state: () => ({
    person: null as PessoasResponse | null,
    loading: false,
    error: null as string | null,
    modalVisible: false,
    modalForm: {
      informacao: '',
      descricao: '',
      data: null,
      anexos: null as File | null
    }
  }),

  getters: {
    diasDesaparecido(state): string | null {
      const dataDesap = state.person?.ultimaOcorrencia?.dtDesaparecimento
      if (!dataDesap) return null
      const hoje = new Date()
      const dataDesapDate = new Date(dataDesap)
      const diasTotais = differenceInDays(hoje, dataDesapDate)
      const mesesTotais = differenceInMonths(hoje, dataDesapDate)
      const anos = differenceInYears(hoje, dataDesapDate)
      if (diasTotais <= 0) return 'Hoje'
      if (anos >= 1) {
        const restanteMeses = mesesTotais - anos * 12
        const restanteDias = diasTotais - (anos * 365 + restanteMeses * 30)
        const partes = []
        if (anos) partes.push(`${anos} ${anos === 1 ? 'ano' : 'anos'}`)
        if (restanteMeses) partes.push(`${restanteMeses} ${restanteMeses === 1 ? 'mês' : 'meses'}`)
        if (restanteDias) partes.push(`${restanteDias} ${restanteDias === 1 ? 'dia' : 'dias'}`)

        return partes.join(', ')
      }
      if (mesesTotais >= 1) {
        const restanteDias = diasTotais - mesesTotais * 30
        if (restanteDias > 0) {
          return `${mesesTotais} ${mesesTotais === 1 ? 'mês' : 'meses'} e ${restanteDias} ${restanteDias === 1 ? 'dia' : 'dias'}`
        } else {
          return `${mesesTotais} ${mesesTotais === 1 ? 'mês' : 'meses'}`
        }
      }
      return `${diasTotais} ${diasTotais === 1 ? 'dia' : 'dias'}`
    }
  },

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

    openModal() {
      this.modalVisible = true
    },

    closeModal() {
      this.modalVisible = false
      this.modalForm = {
        informacao: '',
        descricao: '',
        data: null,
        anexos: null
      }

      const route = useRouter()
      route.push({ name: 'persons-details', params: { id: this.person?.id } })
    },

    async submitModalForm() {
      if (!this.person?.ultimaOcorrencia?.ocoId) return

      const formData = new FormData()
      formData.append('informacao', this.modalForm.informacao)
      formData.append('descricao', this.modalForm.descricao)
      formData.append('data', (this.modalForm.data || new Date()).toISOString().split('T')[0])
      formData.append('ocoId', this.person.ultimaOcorrencia.ocoId.toString())

      if (this.modalForm.anexos) {
        formData.append('anexo', this.modalForm.anexos)
      }

      try {
        await ocorrenciasInformacoesDesaparecidoService(formData as any)
        this.closeModal()
      } catch (error) {
        console.error('Erro ao enviar informações adicionais:', error)
        throw error
      }
    },

    reset() {
      this.person = null
      this.loading = false
      this.error = null
    }
  }
})

export default usePersonsDetailsStore
