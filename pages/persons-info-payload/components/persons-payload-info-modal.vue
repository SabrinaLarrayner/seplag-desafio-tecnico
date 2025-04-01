<template>
    <ClientOnly>
      <el-dialog title="Adicionar Informações" v-model="store.modalVisible" :style="{ width: '50vw' }" :before-close="store.closeModal">
        <el-form :model="store.modalForm" :label-width="isMobile ? '' : '120px'" :label-position="isMobile ? 'top' : 'left'" ref="formRef">
          <el-form-item label="Informação" prop="informacao">
            <el-input v-model="store.modalForm.informacao" @blur="touched.informacao = true" />
            <p v-if="touched.informacao && !store.modalForm.informacao" class="text-red-500 text-xs mt-1">Campo obrigatório</p>
          </el-form-item>
          <el-form-item label="Descrição" prop="descricao">
            <el-input type="textarea" v-model="store.modalForm.descricao" @blur="touched.descricao = true" />
            <p v-if="touched.descricao && !store.modalForm.descricao" class="text-red-500 text-xs mt-1">Campo obrigatório</p>
          </el-form-item>
          <el-form-item label="Data" prop="data">
            <el-date-picker v-model="store.modalForm.data" type="date" placeholder="Selecione a data" @blur="touched.data = true" />
            <p v-if="touched.data && !store.modalForm.data" class="text-red-500 text-xs mt-1">Campo obrigatório</p>
          </el-form-item>
          <el-form-item label="Anexar imagem" prop="anexos">
            <input type="file" class="w-full" @change="onFileChange" @blur="touched.anexos = true" />
            <p v-if="touched.anexos && !store.modalForm.anexos" class="text-red-500 text-xs mt-1">Campo obrigatório</p>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="store.closeModal">Cancelar</el-button>
          <el-button type="success" :disabled="!isFormValid" @click="store.submitModalForm">Confirmar</el-button>
        </template>
      </el-dialog>
    </ClientOnly>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref, computed, onMounted, onBeforeUnmount } from 'vue'
  import { usePersonsDetailsStore } from '~/store/persons-details.store'
  
  const store = usePersonsDetailsStore()
  
  const touched = reactive({
    informacao: false,
    descricao: false,
    data: false,
    anexos: false,
  })
  
  const isFormValid = computed(() => {
    return (
      !!store.modalForm.informacao &&
      !!store.modalForm.descricao &&
      !!store.modalForm.data &&
      !!store.modalForm.anexos
    )
  })
  
  function onFileChange(e: Event) {
    const target = e.target as HTMLInputElement
    const file = target?.files?.[0] || null
    store.modalForm.anexos = file
    touched.anexos = true
  }
  
  const isMobile = ref(false)
  
  const checkScreen = () => {
    isMobile.value = window.innerWidth <= 640
  }
  
  onMounted(() => {
    checkScreen()
    window.addEventListener('resize', checkScreen)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreen)
  })
  </script>
  