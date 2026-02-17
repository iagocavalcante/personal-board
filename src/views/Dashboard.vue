<template>
  <div class="dashboard">
    <n-space vertical size="large">
      <!-- Header -->
      <n-space align="center" justify="space-between">
        <n-space align="center">
          <n-avatar :src="avatarUrl" size="large" />
          <n-h2>{{ $t('welcome-user') }} {{ username }}</n-h2>
        </n-space>
        <n-button type="success" circle @click="showDialog = true">
          <template #icon>
            <n-icon><AddIcon /></n-icon>
          </template>
        </n-button>
      </n-space>

      <n-divider>{{ $t('my-board') }}</n-divider>

      <!-- Boards Grid -->
      <n-grid :cols="4" :x-gap="16" :y-gap="16" responsive="screen">
        <n-grid-item v-for="board in boards" :key="board.id">
          <n-card hoverable @click="goToBoard(board)" class="board-card">
            <template #header>
              <n-space justify="space-between" align="center">
                <n-text strong>{{ board.title }}</n-text>
                <n-button quaternary circle size="small" @click.stop="board.starred = !board.starred">
                  <template #icon>
                    <n-icon><StarIcon /></n-icon>
                  </template>
                </n-button>
              </n-space>
            </template>
            <n-text>{{ board.description }}</n-text>
            <template #action>
              <n-space justify="end">
                <n-button type="error" quaternary @click.stop="deleteBoard(board.id)">
                  <template #icon>
                    <n-icon><DeleteIcon /></n-icon>
                  </template>
                </n-button>
                <n-button type="primary" quaternary @click.stop="openEdit(board)">
                  <template #icon>
                    <n-icon><EditIcon /></n-icon>
                  </template>
                </n-button>
              </n-space>
            </template>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-space>

    <!-- Create/Edit Dialog -->
    <n-modal v-model:show="showDialog" preset="dialog" :title="isEditing ? 'Edit Board' : 'New Board'" :positive-text="$t('create')" :negative-text="$t('cancel')" @positive-click="saveBoard" @negative-click="clearForm">
      <n-form>
        <n-form-item :label="$t('board-name-placeholder')">
          <n-input v-model:value="form.title" placeholder="Board name" />
        </n-form-item>
        <n-form-item :label="$t('board-description-placeholder')">
          <n-input v-model:value="form.description" type="textarea" placeholder="Board description" />
        </n-form-item>
      </n-form>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/store/global'
import { NSpace, NButton, NIcon, NDivider, NGrid, NGridItem, NCard, NText, NModal, NForm, NFormItem, NInput, NAvatar, NH2, NAvatarGroup } from 'naive-ui'

const router = useRouter()
const message = useMessage()
const globalStore = useGlobalStore()
const { username, boards } = storeToRefs(globalStore)

const showDialog = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const form = ref({
  title: '',
  description: ''
})

const avatarUrl = 'https://api.dicebear.com/7.x/avataaars/svg?seed=86345c54239c93f31229c54772935b4d'

const goToBoard = (board) => {
  globalStore.setBoardSelected(board)
  router.push({ name: 'board', params: { board } })
}

const deleteBoard = (id) => {
  globalStore.deleteBoard({ id })
  message.success('Board deleted')
}

const openEdit = (board) => {
  isEditing.value = true
  editingId.value = board.id
  form.value = { title: board.title, description: board.description }
  showDialog.value = true
}

const saveBoard = () => {
  if (!form.value.title || !form.value.description) {
    message.error('Please fill all fields')
    return
  }

  if (isEditing.value) {
    globalStore.editBoard({ id: editingId.value, ...form.value })
    message.success('Board edited')
  } else {
    globalStore.createBoard(form.value)
    message.success('Board created')
  }
  
  clearForm()
}

const clearForm = () => {
  form.value = { title: '', description: '' }
  isEditing.value = false
  editingId.value = null
  showDialog.value = false
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.board-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.board-card:hover {
  transform: translateY(-4px);
}
</style>
