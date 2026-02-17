<template>
  <div class="board">
    <n-space vertical>
      <!-- Header -->
      <n-space justify="space-between" align="center">
        <n-space align="center">
          <n-image :src="Logo" width="200" />
          <n-h2>{{ boardSelected?.title }}</n-h2>
        </n-space>
        <n-button text @click="goBack">← Go back to dashboard</n-button>
      </n-space>

      <n-divider>{{ $t('my-tasks') }}</n-divider>

      <n-space align="start">
        <n-button type="primary" @click="showListDialog = true">Create list</n-button>
      </n-space>

      <!-- Lists -->
      <n-space align="start" :size="16">
        <n-card v-for="list in boardSelected?.lists" :key="list.id" style="min-width: 280px; max-width: 280px">
          <template #header>
            <n-space justify="space-between" align="center">
              <n-text strong>{{ list.title }}</n-text>
            </n-space>
          </template>
          
          <n-space vertical>
            <n-card v-for="task in list.tasks" :key="task.id" size="small">
              <n-text strong>{{ task.title }}</n-text>
              <br>
              <n-text depth="3">{{ task.description }}</n-text>
              <template #action>
                <n-button quaternary size="tiny" type="error" @click="deleteTask(list.id, task)">Delete</n-button>
              </template>
            </n-card>
          </n-space>

          <template #footer>
            <n-button text type="primary" @click="openCreateTask(list)">+ Create task</n-button>
          </template>
        </n-card>
      </n-space>
    </n-space>

    <!-- Create List Dialog -->
    <n-modal v-model:show="showListDialog" preset="dialog" :title="$t('list-dialog')" :positive-text="$t('create')" :negative-text="$t('cancel')" @positive-click="createList" @negative-click="listTitle = ''">
      <n-input v-model:value="listTitle" :placeholder="$t('list-name-placeholder')" />
    </n-modal>

    <!-- Create Task Dialog -->
    <n-modal v-model:show="showTaskDialog" preset="dialog" :title="$t('task-title')" :positive-text="$t('create')" :negative-text="$t('cancel')" @positive-click="createTask" @negative-click="clearTaskForm">
      <n-space vertical>
        <n-input v-model:value="taskTitle" :placeholder="$t('task-name-placeholder')" />
        <n-input v-model:value="taskDescription" type="textarea" :placeholder="$t('task-description-placeholder')" />
      </n-space>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/store/global'
import { NSpace, NButton, NCard, NText, NModal, NInput, NDivider, NH2, NImage } from 'naive-ui'
import Logo from '@/assets/logo/personalboard-horiz.png'

const router = useRouter()
const route = useRoute()
const message = useMessage()
const globalStore = useGlobalStore()
const { boardSelected } = storeToRefs(globalStore)

const showListDialog = ref(false)
const showTaskDialog = ref(false)
const listTitle = ref('')
const taskTitle = ref('')
const taskDescription = ref('')
const selectedList = ref(null)

const goBack = () => {
  router.push('/dashboard')
}

const createList = () => {
  if (!listTitle.value) {
    message.error('Please enter a list title')
    return
  }
  globalStore.createList({ board: boardSelected.value, title: listTitle.value })
  message.success('List created')
  listTitle.value = ''
  showListDialog.value = false
}

const openCreateTask = (list) => {
  selectedList.value = list
  showTaskDialog.value = true
}

const createTask = () => {
  if (!taskTitle.value || !taskDescription.value) {
    message.error('Please fill all fields')
    return
  }
  globalStore.createTask({ 
    board: boardSelected.value, 
    list: selectedList.value, 
    title: taskTitle.value,
    description: taskDescription.value
  })
  message.success('Task created')
  clearTaskForm()
}

const clearTaskForm = () => {
  taskTitle.value = ''
  taskDescription.value = ''
  selectedList.value = null
  showTaskDialog.value = false
}

const deleteTask = (listId, task) => {
  globalStore.deleteTask({ 
    boardId: boardSelected.value.id, 
    listId, 
    task 
  })
  message.success('Task deleted')
}

onMounted(() => {
  if (route.params.board) {
    globalStore.setBoardSelected(route.params.board)
  }
})
</script>

<style scoped>
.board {
  padding: 20px;
}
</style>
