<template>
  <UBadge
    v-if="badgeBgColor"
    icon="i-lucide-building-2"
    size="md"
    color="primary"
    variant="solid"
    class="w-fit rounded-xl font-normal py-1 px-2 text-white/90"
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
  Startup: 'bg-purple/70',
  Pequena: 'bg-blue/70',
  Média: 'bg-green/70',
  Grande: 'bg-orange/70',
}

const badgeBgColor = computed(() => sizeColorMap[props.size] ?? 'bg-red')
</script>
