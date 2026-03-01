<template>
  <UCard
    class="company-card w-md h-auto rounded-md lg:w-full"
    :ui="{
      body: 'bg-bg-secondary border-gray border-2 hover:border-primary rounded-md h-full flex flex-col p-3 sm:p-4 lg:p-4 xxl:p-5',
    }"
  >
    <div class="head flex gap-3 items-center">
      <img
        :src="companyLogoSrc"
        @error="handleLogoError"
        :alt="`${props.company.name} logo`"
        class="aside-left rounded-md w-[75px] h-auto sm:w-[85px]"
        width="85"
        height="85"
        loading="lazy"
        decoding="async"
      />

      <div class="aside-right">
        <h3 class="text-md font-normal mb-1 sm:text-lg md:text-xl">{{ props.company.name }}</h3>
        <div class="flex flex-col">
          <UBadge
            icon="i-lucide-map-pin"
            size="xs"
            class="text-xs font-light p-0 mb-2 bg-transparent text-white"
          >
            {{ props.company.city }},
            {{ props.company.country }}
          </UBadge>

          <BagdeCompanySize :size="props.company.size" />
        </div>
      </div>
    </div>

    <div class="body flex-1">
      <p class="font-light my-4 text-sm md:text-base xxl:my-5">
        {{ props.company.description }}
      </p>
    </div>

    <div class="footer flex gap-5">
      <UButton
        :href="props.company.website"
        target="_blank"
        rel="noopener noreferrer"
        class="w-full p-2 text-base font-normal justify-center bg-accent text-white hover:bg-accent-dark cursor-pointer duration-300 ease-in-out sm:p-3"
        :ui="{ leadingIcon: 'size-5' }"
        @click="trackCompanyClick('website')"
      >
        <PhGlobeSimple :size="24" />
        Site
      </UButton>

      <UButton
        :href="props.company.linkedin"
        target="_blank"
        rel="noopener noreferrer"
        class="w-full p-2 text-base font-normal justify-center bg-[#0A66C2] text-white hover:bg-[#06509a] cursor-pointer duration-300 ease-in-out sm:p-2.5"
        :ui="{ leadingIcon: 'size-5' }"
        @click="trackCompanyClick('linkedin')"
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

type Company = {
  id: number
  name: string
  slug: string
  logo?: string
  country: string
  city: string
  size: string
  website: string
  domain: string
  linkedin: string
  description: string
  tags: string[]
  createdAt: string
}

const props = defineProps<{
  company: Company
}>()

const companyLogoUrls = computed(
  () =>
    [
      props.company.logo,
      `https://img.logo.dev/${props.company.domain}?token=${publicKey}&size=85&fallback=404`,
      `https://img.logo.dev/name/${props.company.name}?token=${publicKey}&size=85&fallback=404`,
      '/imgs/placeholder-logo.svg',
    ].filter(Boolean) as string[],
)
const currentIndex = ref<number>(0)
const companyLogoSrc = computed(() => companyLogoUrls.value[currentIndex.value])

const trackCompanyClick = (type: 'website' | 'linkedin') => {
  gtag('event', 'select_content', {
    content_type: type,
    item_id: props.company.slug,
    item_name: props.company.name,
    link_url: type === 'website' ? props.company.website : props.company.linkedin,
    company_domain: props.company.domain,
  })
}

const handleLogoError = () => {
  if (currentIndex.value < companyLogoUrls.value.length - 1) {
    currentIndex.value++
  }
}
</script>
