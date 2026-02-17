<template>
  <div class="welcome">
    <n-space vertical align="center" justify="center" style="height: 80vh">
      <n-image :src="Logo" width="300" />
      
      <n-card style="width: 400px; margin-top: 20px">
        <n-space vertical>
          <n-text>{{ $t('username-label') }}</n-text>
          <n-input 
            v-model:value="username" 
            placeholder="AnonyDog"
            size="large"
            @keyup.enter="save"
          >
            <template #prefix>
              <n-icon><PersonIcon /></n-icon>
            </template>
          </n-input>
          <n-button type="success" size="large" block @click="save">
            {{ $t('button-save') }}
          </n-button>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NSpace, NCard, NInput, NButton, NIcon, NImage, NText } from 'naive-ui'
import Logo from '@/assets/logo/personalboard-horiz.png'
import { useGlobalStore } from '@/store/global'

const router = useRouter()
const globalStore = useGlobalStore()
const username = ref('')

const save = () => {
  globalStore.setUsername(username.value)
  router.push('/dashboard')
}
</script>

<style scoped>
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
