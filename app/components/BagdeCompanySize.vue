<template>
  <UBadge
    v-if="badgeBgColor"
    icon="i-lucide-building-2"
    size="md"
    color="primary"
    variant="solid"
    class="w-fit rounded-xl font-normal py-1 px-3 text-white"
    :class="badgeBgColor"
  >
    {{ props.size }}
  </UBadge>
</template>

<script setup lang="ts">
const props = defineProps<{
  size: string
}>()

const sizeColorMap: Record<string, string> = {
  Startup: 'bg-purple',
  Pequena: 'bg-blue',
  Média: 'bg-green',
  Grande: 'bg-orange',
}

const badgeBgColor = computed(() => sizeColorMap[props.size] ?? 'bg-red')
</script>
