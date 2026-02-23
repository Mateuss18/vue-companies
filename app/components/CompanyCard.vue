<template>
  <UCard
    class="company-card w-md h-auto"
    :ui="{ body: 'bg-bg-secondary border-gray border-2 rounded-md h-full flex flex-col' }"
  >
    <div class="head flex gap-5">
      <img
        :src="`https://img.logo.dev/name/${props.company.name}?token=${publicKey}&size=85`"
        alt=""
        class="aside-left rounded-md"
        width="85"
        height="85"
      />

      <div class="aside-right">
        <h3 class="text-2xl font-normal mb-1">{{ props.company.name }}</h3>

        <div class="flex flex-col">
          <UBadge
            icon="i-lucide-map-pin"
            size="md"
            class="text-sm font-light p-0 mb-2 bg-transparent text-white"
          >
            {{ props.company.city }},
            {{ props.company.country }}
          </UBadge>

          <BagdeCompanySize :size="props.company.size" />
        </div>
      </div>
    </div>

    <div class="body flex-1">
      <p class="font-light my-5">
        {{ props.company.description }}
      </p>
    </div>

    <div class="footer flex gap-5">
      <UButton
        :href="props.company.website"
        target="_blank"
        class="w-full p-3 text-base font-normal justify-center bg-accent text-white hover:bg-accent-dark cursor-pointer duration-300 ease-in-out"
        :ui="{ leadingIcon: 'size-5' }"
      >
        <PhGlobeSimple :size="24" />
        Site
      </UButton>

      <UButton
        :href="props.company.linkedin"
        target="_blank"
        class="w-full p-3 text-base font-normal justify-center bg-[#0A66C2] text-white hover:bg-[#06509a] cursor-pointer duration-300 ease-in-out"
        :ui="{ leadingIcon: 'size- stroke-[1.5]' }"
      >
        <PhLinkedinLogo :size="24" />
        LinkedIn
      </UButton>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { PhLinkedinLogo, PhGlobeSimple } from '@phosphor-icons/vue'

const config = useRuntimeConfig()
const publicKey = config.public.logoDevPublicKey

const props = defineProps<{
  company: object
  domain: string
}>()
</script>
