<template>
  <div class="p-4 bg-gray-50 min-h-screen">
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
      <div v-if="!store.loading && store.people.length === 0" class="text-center text-gray-600 text-lg font-medium mt-10">
        Sem resultados
      </div>  
      <div v-for="p in store.people" :key="p.id" class="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col gap-3">
        <div class="w-full h-full bg-gray-100 flex items-center justify-center rounded overflow-hidden">
          <div v-if="p.urlFoto">
            <img :src="p.urlFoto || fallbackImg" alt="Foto" class="w-full h-full object-cover object-center" @error="handleImgError" />
          </div>
          <div v-else>
            <img src="~/assets/image/not_url_img.png" alt="Foto" class="w-full h-full object-cover object-center" />
          </div>
        </div>
        <div>
          <div class="w-full text-center text-xs font-bold py-1 uppercase"  :class="p.ultimaOcorrencia.dataLocalizacao ? 'bg-green-100 text-green-700' : 'bg-red-500 text-white'">
            {{ p.ultimaOcorrencia.dataLocalizacao ? 'Localizado' : 'Desaparecido' }}
          </div>
        </div>  
        <div class="text-base font-bold text-gray-800">{{ p.nome }}</div>
        <div class="flex flex-col gap-1 text-sm text-gray-700">
          <span><strong>Idade:</strong> {{ p?.idade }} anos</span>
          <span><strong>Sexo:</strong> {{ p?.sexo }}</span>
          <span><strong>Desaparecimento:</strong> {{ store.formatarData(p?.ultimaOcorrencia?.dtDesaparecimento) }}</span>
          <span v-if="p?.ultimaOcorrencia?.dataLocalizacao"><strong>Localização:</strong> {{ store.formatarData(p?.ultimaOcorrencia?.dataLocalizacao) }}</span>
          <span><strong>Local:</strong> {{ p?.ultimaOcorrencia?.localDesaparecimentoConcat }}</span>
          <span><strong>Descrição:</strong> {{ p?.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido || 'NÃO INFORMADO' }}</span>
        </div>
        <el-button size="small" class="self-end " type="primary" @click="goDetails(p)">
          Detalhes
        </el-button>
      </div>          
    </div>
    <div class="flex justify-center mt-8">
      <el-pagination background layout="prev, pager, next" :current-page="store.page + 1" :page-size="10" :total="store.totalPages * 10" 
      @current-change="store.handlePageChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePersonsStore } from '~/store/persons.store'
import { useRouter } from 'vue-router'

const store = usePersonsStore()
const router = useRouter()

store.init()

const fallbackImg = new URL('~/assets/image/not_url_img.png', import.meta.url).href

function handleImgError(e: Event) {
  const target = e.target as HTMLImageElement
  target.src = fallbackImg
}

function goDetails(p: any) {
  router.push({ name: 'persons-details', params: { id: p.id } })
}

</script>
