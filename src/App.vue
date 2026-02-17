<template>
  <n-config-provider>
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <router-view />
          <footer>
            <p class="footer">
              Personal Board, Version {{ appVersion }} - Developed by Iago Cavalcante
            </p>
          </footer>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/store/global'
import { NConfigProvider, NMessageProvider, NDialogProvider, NNotificationProvider } from 'naive-ui'

const globalStore = useGlobalStore()
const { appVersion } = storeToRefs(globalStore)
</script>

<style scoped>
.footer {
  background-color: #e5e5e5;
  padding: 10px;
  text-align: center;
  color: rgb(31, 116, 255);
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
