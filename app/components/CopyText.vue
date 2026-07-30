<template>
  <div class="copy-text handdraw-border">
    <div class="copy-text__header">
      <h3 class="copy-text__title">
        {{ title }}
      </h3>
      <button
        type="button"
        class="copy-text__button"
        :class="{ 'is--copied': copied }"
        :data-cy="dataCy"
        @click="copy"
      >
        {{ copied ? $t('kitCopied') : $t('kitCopy') }}
      </button>
    </div>
    <p class="copy-text__body">
      {{ text }}
    </p>
  </div>
</template>

<script setup>
defineOptions({ name: 'CopyText' })

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  dataCy: {
    type: String,
    default: 'CopyButton'
  }
})

const copied = ref(false)
let timer = null

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text)
  } catch {
    // Fallback for browsers without the async clipboard API (or no permission)
    const area = document.createElement('textarea')
    area.value = props.text
    area.setAttribute('readonly', '')
    area.style.position = 'absolute'
    area.style.left = '-9999px'
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    document.body.removeChild(area)
  }

  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    copied.value = false
  }, 2000)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<style lang="scss" scoped>
.copy-text {
  padding: 20px 24px;
  background: var(--bg);
  margin-bottom: 24px;
}

.copy-text__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.copy-text__title {
  font-size: 26px;
  margin: 0;
  color: var(--color-primary);
}

.copy-text__button {
  flex-shrink: 0;
  cursor: pointer;
  font-family: var(--font-family-default);
  font-size: 14px;
  padding: 8px 20px;
  color: var(--color-primary);
  background: transparent;
  border: solid 3px var(--color-primary);
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-bottom-left-radius: 15px 255px;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover,
  &:focus-visible {
    background: var(--color-primary);
    color: var(--bg);
  }

  &.is--copied {
    background: var(--color-primary);
    color: var(--bg);
  }
}

.copy-text__body {
  margin: 0;
  line-height: 1.6;
  white-space: pre-line;
}
</style>
