<template>
  <UCard
    class="company-card w-md h-auto rounded-md lg:w-full"
    :ui="{
      body: `bg-bg-secondary border-gray border-2 hover:border-primary rounded-md h-full flex flex-col p-3 sm:p-4 lg:p-4 xxl:p-5 ${
        props.directoryItem.kind === 'consultancy' ? 'border-primary/40' : ''
      }`,
    }"
  >
    <div class="head flex gap-3 items-center">
      <img
        :src="companyLogoSrc"
        @error="handleLogoError"
        :alt="`${props.directoryItem.name} logo`"
        class="aside-left rounded-md w-[75px] h-auto sm:w-[85px]"
        width="85"
        height="85"
        :loading="props.directoryItem.id >= 3 ? 'lazy' : 'eager'"
        decoding="async"
      />

      <div class="aside-right">
        <h2 class="text-md font-normal mb-1 sm:text-lg md:text-xl">
          {{ props.directoryItem.name }}
        </h2>

        <div class="flex flex-col">
          <UBadge
            icon="i-lucide-map-pin"
            size="xs"
            class="text-xs font-light p-0 mb-2 bg-transparent text-white"
          >
            <template v-if="props.directoryItem.city">
              {{ props.directoryItem.city }}, {{ props.directoryItem.country }}
            </template>
            <template v-else>
              {{ props.directoryItem.country }}
            </template>
          </UBadge>

          <div class="flex flex-wrap gap-1.5">
            <BadgeCompanySize :size="props.directoryItem.size" />

            <UBadge
              v-for="value in props.directoryItem.workModel ?? []"
              :key="value"
              size="xs"
              class="text-xs rounded-xl font-light py-1 px-2 bg-transparent text-white border border-white"
            >
              {{ value }}
            </UBadge>

            <UBadge
              v-if="props.directoryItem.kind === 'consultancy'"
              size="xs"
              class="text-xs rounded-xl font-light py-1 px-2 bg-transparent text-white border border-primary"
            >
              Consultoria
            </UBadge>
          </div>
        </div>
      </div>
    </div>

    <div class="body flex-1">
      <p class="font-light my-4 text-sm md:text-base xxl:my-5">
        {{ props.directoryItem.description }}
      </p>
    </div>

    <div class="footer flex gap-5">
      <UButton
        v-if="props.directoryItem.website"
        :href="props.directoryItem.website"
        target="_blank"
        rel="noopener noreferrer"
        class="w-full p-2 text-base font-normal justify-center bg-accent text-white hover:bg-accent-dark cursor-pointer duration-300 ease-in-out sm:p-3"
        :ui="{ leadingIcon: 'size-5' }"
        @click="trackCompanyLinkClick('website')"
      >
        <PhGlobeSimple :size="24" />
        Site
      </UButton>

      <UButton
        v-if="props.directoryItem.linkedin"
        :href="props.directoryItem.linkedin"
        target="_blank"
        rel="noopener noreferrer"
        class="w-full p-2 text-base font-normal justify-center bg-[#0A66C2] text-white hover:bg-[#06509a] cursor-pointer duration-300 ease-in-out sm:p-2.5"
        :ui="{ leadingIcon: 'size-5' }"
        @click="trackCompanyLinkClick('linkedin')"
      >
        <PhLinkedinLogo :size="24" />
        LinkedIn
      </UButton>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { PhLinkedinLogo, PhGlobeSimple } from '@phosphor-icons/vue'

const { gtag } = useGtag()

const config = useRuntimeConfig()
const publicKey = config.public.logoDevPublicKey

type CompanyKind = 'company' | 'consultancy'

type DirectoryItem = {
  id: number
  name: string
  slug: string
  kind: CompanyKind
  country: string
  size: string
  website?: string
  domain?: string
  linkedin: string
  description: string
  createdAt: string
  logo?: string
  city?: string
  tags?: string[]
  workModel?: string[]
}

const props = defineProps<{
  directoryItem: DirectoryItem
}>()

const companyLogoUrls = computed(
  () =>
    [
      props.directoryItem.logo,
      `https://img.logo.dev/${props.directoryItem.domain}?token=${publicKey}&size=85&fallback=404`,
      `https://img.logo.dev/name/${props.directoryItem.name}?token=${publicKey}&size=85&fallback=404`,
      '/imgs/log/placeholder-logo.svg',
    ].filter(Boolean) as string[],
)
const currentIndex = ref<number>(0)
const companyLogoSrc = computed(() => companyLogoUrls.value[currentIndex.value])

const trackCompanyLinkClick = (type: 'website' | 'linkedin') => {
  gtag('event', 'company_link_click', {
    link_type: type,
    company_id: props.directoryItem.id,
    company_slug: props.directoryItem.slug,
    company_name: props.directoryItem.name,
    link_url: type === 'website' ? props.directoryItem.website : props.directoryItem.linkedin,
    company_domain: props.directoryItem.domain,
  })
}

const handleLogoError = () => {
  if (currentIndex.value < companyLogoUrls.value.length - 1) {
    currentIndex.value++
  }
}
</script>
