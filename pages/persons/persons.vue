<template>
  <PersonsHeader />
  <PersonsDashboardStatistics />
  <PersonsFilters />
  <PersonsCards />
  <PersonsFooter />
</template>

<script setup>
import usePersonsStore from "~/store/persons.store";
const store = usePersonsStore();
store.init();
</script>
