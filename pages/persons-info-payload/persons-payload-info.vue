<template>
    <PersonsPayloadInfoPerson />
</template>
<script setup lang="ts">
import { usePersonsInfoPayloadStore } from '~/store/persons-info-payload.store'

const store = usePersonsInfoPayloadStore()
const route = useRoute()

store.init({ id: route.params.id as string })
</script>