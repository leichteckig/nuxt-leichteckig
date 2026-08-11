<template>
  <a
    v-if="ready"
    :href="`mailto:${user}@${domain}`"
  >{{ user }}@{{ domain }}</a>
  <span v-else-if="plainFallback">{{ user }}@{{ domain }}</span>
  <span v-else>{{ user }} [at] {{ domain }}</span>
</template>

<script setup>
// Assembles the address on the client only: the full email and a mailto: link
// never appear in the prerendered HTML, so spam harvesters that don't run
// JavaScript can't scrape it. Without JS, a readable fallback is shown that a
// human can still use ("user [at] domain").
defineOptions({ name: 'ObfuscatedEmail' })

defineProps({
  user: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  // Legal pages (e.g. the imprint) must show a directly usable address even
  // without JS, so the fallback keeps the real "@" instead of "[at]". This
  // trades a little spam protection for that no-JS readability.
  plainFallback: {
    type: Boolean,
    default: false
  }
})

const ready = ref(false)

onMounted(() => {
  ready.value = true
})
</script>
