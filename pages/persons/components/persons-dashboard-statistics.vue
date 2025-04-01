<template>
  <div class="p-6 bg-gray-50">
    <h1 class="text-2xl font-bold mb-6">Estatísticas de Pessoas</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div class="bg-white border rounded shadow p-4">
        <h2 class="text-lg font-semibold text-gray-700">Desaparecidos</h2>
        <p class="text-3xl font-bold text-red-600">
          {{ store.estatisticas?.quantPessoasDesaparecidas ?? '—' }}
        </p>
      </div>
      <div class="bg-white border rounded shadow p-4">
        <h2 class="text-lg font-semibold text-gray-700">Encontrados</h2>
        <p class="text-3xl font-bold text-green-600">
          {{ store.estatisticas?.quantPessoasEncontradas ?? '—' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePersonsStore } from '~/store/persons.store'
const store = usePersonsStore()
</script>
