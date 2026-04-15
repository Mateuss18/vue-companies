<template>
  <div class="w-full flex justify-end absolute top-5 right-5">
    <URadioGroup
      v-model="selectedLocale"
      :items="items"
      variant="card"
      indicator="hidden"
      orientation="horizontal"
      :ui="{
        fieldset: 'grid grid-cols-2 gap-2',
        item: 'text-md rounded-lg border border-white/10 bg-bg-secondary transition-colors cursor-pointer flex items-center justify-center px-3.5 py-2',
        wrapper: 'w-full',
        label: 'w-full',
      }"
    >
      <template #label="{ item }">
        <span :class="`fi ${item.icon}`"></span>
      </template>
    </URadioGroup>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()

const items = ref([
  {
    value: 'pt-BR',
    label: 'Português',
    icon: 'fi-br',
  },
  {
    value: 'en',
    label: 'English',
    icon: 'fi-us',
  },
])

const selectedLocale = computed({
  get: () => locale.value,
  set: async (value: 'pt-BR' | 'en') => {
    await setLocale(value)
  },
})
</script>
