<template>
  <UBadge
    v-if="badgeBgColor"
    icon="i-lucide-building-2"
    size="md"
    color="primary"
    variant="solid"
    class="w-fit rounded-xl px-2 py-1 font-normal text-white/90"
    :class="badgeBgColor"
  >
    {{ getCompanySizeLabel(props.size) }}
  </UBadge>
</template>

<script setup lang="ts">
const { getCompanySizeLabel, normalizeCompanySize } = useCompanyLabels()

const props = defineProps<{
  size: string
}>()

const sizeColorMap: Record<string, string> = {
  startup: 'bg-purple/70',
  small: 'bg-blue/70',
  medium: 'bg-green/70',
  large: 'bg-orange/70',
  enterprise: 'bg-red/70',
}

const badgeBgColor = computed(() => {
  const normalizedCompanySize = normalizeCompanySize(props.size)

  return normalizedCompanySize ? sizeColorMap[normalizedCompanySize] : 'bg-red/70'
})
</script>
