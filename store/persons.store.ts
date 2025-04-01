import { defineStore } from 'pinia'
import { PessoasAbertoFiltroPayload, pessoasAbertoFiltroService } from '~/services/service/pessoas-aberto-filtro.service'
import { format } from 'date-fns'
import { pessoasAbertoEstatisticoService } from '~/services/service/pessoas-aberto-estatistico.service'
import { watch } from 'vue'

export const usePersonsStore = defineStore('usePersonsStore', {
  state: () => ({
    people: [] as any[],
    totalPages: 0,
    page: 0,
    loading: false,
    error: null as string | null,
    filtros: {
      pagina: 0,
      porPagina: 10,
      status: 'DESAPARECIDO',
    } as PessoasAbertoFiltroPayload,
    estatisticas: null as any,
    nome: '',
    idadeInicio: 0 as number | null,
    idadeFim: null as number | null,
    sexo: '',
    status: ''
  }),

  actions: {
    async init(payload?: PessoasAbertoFiltroPayload) {
      this.loading = true
      this.error = null
      try {
        const response = await pessoasAbertoFiltroService(payload || this.filtros)
        this.people = response.content || []
        this.totalPages = response.totalPages
        this.page = response.number || 0
        await this.buscarEstatisticas()
      } catch (err: any) {
        this.error = 'Erro ao buscar pessoas'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async buscarEstatisticas() {
      try {
        this.estatisticas = await pessoasAbertoEstatisticoService()
      } catch (err) {
        console.error('Erro ao buscar estatísticas:', err)
      }
    },

    async atualizarFiltro(payload: PessoasAbertoFiltroPayload) {
      this.filtros = payload
      await this.init()
    },

    handlePageChange(page: number) {
      this.atualizarFiltro({ ...this.filtros, pagina: page - 1 })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    formatarData(data: string) {
      return format(new Date(data), 'dd/MM/yyyy HH:mm')
    },
    

    reset() {
      this.people = []
      this.error = null
      this.loading = false
      this.estatisticas = null
    },

    iniciarWatchFiltros() {
      watch(
        () => [this.nome, this.idadeInicio, this.idadeFim, this.sexo, this.status],
        () => {
          this.atualizarFiltro({
            nome: this.nome || undefined,
            faixaIdadeInicial: this.idadeInicio || undefined,
            faixaIdadeFinal: this.idadeFim || undefined,
            sexo: this.sexo || undefined,
            status: this.status || 'DESAPARECIDO',
            pagina: 0,
            porPagina: 10
          })
        },
        { deep: true }
      )
    }
  }
})

export default usePersonsStore