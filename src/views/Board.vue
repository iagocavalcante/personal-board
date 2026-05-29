<template>
  <div class="board-container">
    <div class="board-header">
      <div class="header-content">
        <img :src="Logo" width="200" height="80" alt="Personal Board">
        <h1 class="board-title">{{ boardSelected.title }}</h1>
      </div>
      <div class="navigation">
        <h3 class="go-back" @click="goBack()">Go back to dashboard</h3>
      </div>
      <div class="divider">
        {{$t('my-tasks')}}
      </div>
      <div class="actions-row">
        <button class="btn-create" @click.prevent="isActive = true">Create list</button>
      </div>
    </div>

    <draggable
      class="lists-container"
      v-model="lists"
      item-key="id">
      <template #item="{element: list}">
        <pb-lists :listHeader="list.title" :list="list" :boardId="boardSelected.id">
          <template #footer>
            <a href="#" @click.prevent="openCreate(list)" class="create-task-link">Create task</a>
          </template>
        </pb-lists>
      </template>
    </draggable>

    <PBDialog
      v-model:is-open="isActive"
      @cancel="clearDialog"
      @accept="chooseAction"
      :title="$t('list-dialog')"
      :is-valid="validField"
      :accept-text="!isBoardSelected ? $t('create') : $t('edit')"
      :cancel-text="$t('cancel')"
      :invalid-message="$t('dialog-invalid')">
      <div class="form-content">
        <p v-html="$t('list-name-placeholder')"></p>
        <input
          class="input-field"
          type="text"
          :placeholder="$t('list-name-placeholder')"
          v-model="listTitle"
        />
      </div>
    </PBDialog>

    <PBDialog
      v-model:is-open="isActiveTask"
      @cancel="clearDialog"
      @accept="chooseActionTask"
      :title="$t('task-title')"
      :is-valid="validFieldTask"
      :accept-text="!isBoardSelected ? $t('create') : $t('edit')"
      :cancel-text="$t('cancel')"
      :invalid-message="$t('dialog-invalid')">
      <div class="form-content">
        <p v-html="$t('task-dialog')"></p>
        <input
          class="input-field"
          type="text"
          :placeholder="$t('task-name-placeholder')"
          v-model="taskTitle"
        />
        <textarea
          class="textarea-field"
          :placeholder="$t('task-description-placeholder')"
          v-model="taskDescription"
          rows="4"
        ></textarea>
      </div>
    </PBDialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalStore } from '@/stores/global'
import draggable from 'vuedraggable'
import PBLists from '@/components/PBLists.vue'
import PBDialog from '@/components/PBDialog.vue'
import Logo from '@/assets/logo/personalboard-horiz.png'

export default {
  name: 'Board',
  components: {
    draggable,
    'pb-lists': PBLists,
    PBDialog
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const globalStore = useGlobalStore()

    const isActive = ref(false)
    const isActiveTask = ref(false)
    const listTitle = ref('')
    const isBoardSelected = ref(false)
    const taskTitle = ref('')
    const taskDescription = ref('')
    const list = ref(null)

    const boardSelected = computed(() => globalStore.boardSelected)
    const username = computed(() => globalStore.username)

    const validField = computed(() => {
      return listTitle.value.length > 0
    })

    const validFieldTask = computed(() => {
      return taskTitle.value.length > 0 && taskDescription.value.length > 0
    })

    const lists = computed({
      get: () => boardSelected.value.lists || [],
      set: (value) => {
        boardSelected.value.lists = [...value]
        globalStore.saveLists(boardSelected.value)
      }
    })

    onMounted(() => {
      if (route.params.board) {
        globalStore.saveBoardSelected(route.params.board)
      }
    })

    const goBack = () => {
      router.push({ name: 'dashboard' })
    }

    const create = () => {
      const payload = {
        title: listTitle.value,
        board: boardSelected.value
      }
      globalStore.createList(payload)
    }

    const taskCreate = () => {
      const payload = {
        title: taskTitle.value,
        description: taskDescription.value,
        board: boardSelected.value,
        list: list.value
      }
      globalStore.createTask(payload)
    }

    const clearDialog = () => {
      listTitle.value = ''
      taskTitle.value = ''
      taskDescription.value = ''
      isBoardSelected.value = false
    }

    const openCreate = (selectedList) => {
      isActiveTask.value = true
      list.value = { ...selectedList }
    }

    const chooseAction = () => {
      if (!isBoardSelected.value) create()
      alert('New List Created\nList title: ' + listTitle.value)
      clearDialog()
      isActive.value = false
    }

    const chooseActionTask = () => {
      if (!isBoardSelected.value) taskCreate()
      alert('New Task Created\nTask title: ' + taskTitle.value)
      clearDialog()
      isActiveTask.value = false
    }

    return {
      Logo,
      isActive,
      isActiveTask,
      listTitle,
      isBoardSelected,
      taskTitle,
      taskDescription,
      boardSelected,
      username,
      validField,
      validFieldTask,
      lists,
      goBack,
      create,
      taskCreate,
      clearDialog,
      openCreate,
      chooseAction,
      chooseActionTask
    }
  }
}
</script>

<style scoped>
.board-container {
  padding: 20px;
}

.board-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.board-title {
  font-size: 28px;
  margin: 0;
}

.navigation {
  margin-top: 15px;
}

.go-back {
  margin: 0;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
}

.go-back:hover {
  color: rgb(31,116,255);
}

.divider {
  width: 100%;
  text-align: center;
  padding: 20px 0;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 2px solid #e0e0e0;
  margin: 20px 0;
}

.actions-row {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.btn-create {
  padding: 12px 24px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.2s;
}

.btn-create:hover {
  background-color: #1976d2;
}

.lists-container {
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  width: 100%;
  overflow-x: auto;
  padding: 10px 0;
}

.create-task-link {
  color: #2196f3;
  text-decoration: none;
  font-size: 14px;
}

.create-task-link:hover {
  text-decoration: underline;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-field:focus,
.textarea-field:focus {
  outline: none;
  border-color: #2196f3;
}

.textarea-field {
  resize: vertical;
  font-family: inherit;
}
</style>
