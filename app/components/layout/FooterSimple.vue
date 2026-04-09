<template>
  <footer class="footer-simple py-7 mt-6 text-center w-full">
    {{ t('footer.developedBy') }}
    <a
      href="https://www.linkedin.com/in/mateus-dev-lopes/"
      target="_blank"
      rel="noopener noreferrer"
      @click="trackFooterLinkClick"
    >
      < Mateus Lopes />
    </a>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { gtag } = useGtag()

const trackFooterLinkClick = () => {
  gtag('event', 'footer_link_click', {
    link_url: 'https://www.linkedin.com/in/mateus-dev-lopes/',
    link_text: 'Mateus Lopes',
    section: 'footer',
  })
}
</script>
