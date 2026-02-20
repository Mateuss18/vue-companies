<template>
  <UCard
    class="company-card w-md"
    :ui="{ body: 'bg-bg-secondary border-gray border-2 rounded-md' }"
  >
    <div class="head flex gap-5">
      <img
        :src="`https://img.logo.dev/me.com.br?token=${publicKey}`"
        alt=""
        class="aside-left"
        width="85"
        height="85"
      />

      <div class="aside-right">
        <h3 class="text-2xl font-normal mb-1">Mercado Eletrônico</h3>

        <div class="flex flex-col">
          <UBadge
            icon="i-lucide-map-pin"
            size="md"
            class="text-sm font-light p-0 mb-2 bg-transparent text-white"
          >
            São Paulo, Brasil
          </UBadge>

          <UBadge
            icon="i-lucide-building-2"
            size="md"
            color="primary"
            variant="solid"
            class="w-fit rounded-xl font-normal py-2 px-3 border-r-3"
          >
            Média
          </UBadge>
        </div>
      </div>
    </div>

    <div class="body">
      <p class="font-light my-5">
        Principal ecossistema de soluções para geração de energia solar no Brasil e primeira
        plataforma de fintech solar na América Latina.
      </p>
    </div>

    <div class="footer flex gap-5">
      <UButton
        class="w-full p-3 text-base font-normal justify-center bg-accent text-white"
        :ui="{ leadingIcon: 'size-5' }"
      >
        <PhGlobeSimple :size="24" />
        Site
      </UButton>
      <UButton
        class="w-full p-3 text-base font-normal justify-center bg-[#0A66C2] text-white"
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

// const props = defineProps<{
//   domain: string
// }>()
</script>
