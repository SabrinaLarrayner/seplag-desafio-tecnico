<template>
  <div class="flex flex-col gap-4 px-4 bg-gray-50 mb-4">
    <h1 class="text-2xl font-bold px-2">Pessoas Desaparecidas e Localizadas</h1>
    <h1 class="text-lg font-bold px-2">Filtros</h1>
    <div class="flex flex-col sm:flex-row items-center gap-3">
      <el-input v-model="store.nome" placeholder="Nome" clearable class="w-48 sm:w-36" />
      <el-input-number v-model="store.idadeInicio" placeholder="Idade início"  class="w-1/2 sm:w-24" />
      <el-input-number v-model="store.idadeFim" placeholder="Idade fim"  class="w-1/2 sm:w-24" />
    </div>
    <div class="flex flex-col sm:flex-row items-center gap-3 bg-gray-50">
      <el-select v-model="store.sexo" placeholder="Sexo" clearable class="w-1/2 sm:w-1/2">
        <el-option label="Masculino" value="MASCULINO" />
        <el-option label="Feminino" value="FEMININO" />
      </el-select>
      <el-select v-model="store.status" placeholder="Status" clearable class="w-1/2 sm:w-1/2">
        <el-option label="Desaparecido" value="DESAPARECIDO" />
        <el-option label="Localizado" value="LOCALIZADO" />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePersonsStore } from '~/store/persons.store'
const store = usePersonsStore()
store.iniciarWatchFiltros()
</script>
