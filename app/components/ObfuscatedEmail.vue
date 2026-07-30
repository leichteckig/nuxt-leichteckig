<template>
  <a
    v-if="ready"
    :href="`mailto:${user}@${domain}`"
  >{{ user }}@{{ domain }}</a>
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
  }
})

const ready = ref(false)

onMounted(() => {
  ready.value = true
})
</script>
