<template>
  <PersonsHeader />
  <div class="px-6 py-4 bg-gray-50 min-h-screen flex flex-col items-center">
    <h1 class="text-2xl font-bold text-center mb-6">Detalhes da Pessoa</h1>

    <div class="flex flex-col md:flex-row gap-8 max-w-7xl w-full items-start justify-center">
      <div v-if="store.person?.ultimaOcorrencia?.listaCartaz?.length" class="w-full md:w-64 border rounded shadow p-2 bg-white flex flex-col items-center">
        <img :src="store.person.ultimaOcorrencia.listaCartaz[0].urlCartaz" alt="Cartaz" class="w-full h-auto rounded"   />
        <p class="mt-2 text-sm text-center font-semibold">
          {{ store.person.ultimaOcorrencia.listaCartaz[0].tipoCartaz }}
        </p>
        <a :href="store.person.ultimaOcorrencia.listaCartaz[0].urlCartaz" :download="`cartaz_${store.person?.id}_${store.person.ultimaOcorrencia.listaCartaz[0].tipoCartaz}.jpg`" target="_blank" class="mt-2 text-blue-600 text-sm underline hover:text-blue-800">Baixar cartaz</a>
      </div>
      <img :src="store.person?.urlFoto || fallbackImg" alt="Foto" class="w-full md:w-64 rounded-lg shadow-md object-cover aspect-[3/4]" @error="handleImgError" />
      <div class="flex flex-col gap-3 text-base text-gray-800 w-full md:w-1/2">
        <div class="text-sm font-semibold px-3 py-1 rounded w-fit" :class="store.person?.ultimaOcorrencia?.dataLocalizacao ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" :title="store.person?.ultimaOcorrencia?.dataLocalizacao ? 'Esta pessoa foi localizada' : 'Ainda está desaparecida'">
          {{
            store.person?.ultimaOcorrencia?.dataLocalizacao
              ? "Localizado"
              : "Desaparecido(a)"
          }}
        </div>

        <h1 class="text-2xl font-bold">{{ store.person?.nome }}</h1>
        <span class="text-sm text-gray-500">
          {{ store.person?.idade }} anos, {{ store.person?.sexo }}
        </span>

        <hr class="my-2 border-t border-gray-300 w-full md:w-4/5" />
        <h1 class="text-lg font-bold">Dados sobre o Desaparecimento</h1>

        <span class="text-sm text-gray-500">
          <strong>Local:</strong>
          {{ store.person?.ultimaOcorrencia?.localDesaparecimentoConcat }}
        </span>

        <span class="text-sm text-gray-500">
          <strong>Informações:</strong>
          {{
            store.person?.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO
              ?.informacao || "NÃO INFORMADO"
          }}
        </span>

        <span class="text-sm text-gray-500">
          <strong>Vestimentas:</strong>
          {{
            store.person?.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO
              ?.vestimentasDesaparecido || "NÃO INFORMADO"
          }}
        </span>

        <span v-if="store.person?.ultimaOcorrencia?.dtDesaparecimento" class="text-sm text-gray-500">
          <strong>Desaparecimento:</strong>
          {{ store.formatarData(store.person?.ultimaOcorrencia?.dtDesaparecimento) }}
        </span>

        <span v-if="store.person?.ultimaOcorrencia?.dataLocalizacao" class="text-sm text-gray-500">
          <strong>Localização:</strong>
          {{
            store.formatarData(store.person?.ultimaOcorrencia?.dataLocalizacao)
          }}
        </span>

        <div class="flex gap-3 mt-4">
          <el-button type="primary" @click="goPersons()">Voltar</el-button>
          <el-button type="success" @click="store.openModal()">Adicionar Informações</el-button>
        </div>
        <PersonsInfoPayloadModal />
      </div>
    </div>
  </div>
  <PersonsFooter />
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { usePersonsDetailsStore } from "~/store/persons-details.store";

const store = usePersonsDetailsStore();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  await store.init({ id: route.params.id as string })
  store.openModal()
})

function goPersons() {
  router.push(`/persons`);
}

const fallbackImg = new URL('~/assets/image/not_url_img.png', import.meta.url).href

function handleImgError(e: Event) {
  const target = e.target as HTMLImageElement
  target.src = fallbackImg
}
</script>
