<template>
  <div class="pb-list">
    <div class="list-header">
      {{ listHeader }}
    </div>
    <draggable
      v-model="tasks"
      group="tasks-group"
      item-key="id"
      class="list-content">
      <template #item="{element: task}">
        <div class="list-item">
          <div class="item-content">
            <div class="item-title">{{ task.title }}</div>
            <div class="item-subtitle">{{ task.description }}</div>
          </div>
          <div class="item-actions">
            <button class="action-btn edit-btn" @click="openEdit(task)">
              <span class="material-icons">edit</span>
            </button>
            <button class="action-btn delete-btn" @click="removeTask(task)">
              <span class="material-icons">remove</span>
            </button>
          </div>
        </div>
      </template>
    </draggable>
    <div class="list-footer">
      <slot name="footer"></slot>
    </div>

    <PBDialog
      v-model:is-open="isActiveTask"
      @cancel="clearDialog()"
      @accept="changeTask()"
      :title="$t('task-title')"
      :is-valid="validFieldTask"
      :accept-text="$t('edit')"
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
import { ref, computed } from 'vue'
import { useGlobalStore } from '@/stores/global'
import draggable from 'vuedraggable'
import PBDialog from './PBDialog.vue'

export default {
  name: 'PBLists',
  components: {
    draggable,
    PBDialog
  },
  props: {
    listHeader: {
      type: String,
      required: true
    },
    boardId: {
      type: String,
      required: true
    },
    list: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const globalStore = useGlobalStore()

    const isActiveTask = ref(false)
    const taskTitle = ref('')
    const taskDescription = ref('')
    const task = ref(null)

    const validFieldTask = computed(() => {
      return taskTitle.value.length > 0 && taskDescription.value.length > 0
    })

    const tasks = computed({
      get: () => props.list.tasks || [],
      set: (value) => {
        props.list.tasks = [...value]
        globalStore.saveTasks({ boardId: props.boardId, list: props.list })
      }
    })

    const clearDialog = () => {
      taskTitle.value = ''
      taskDescription.value = ''
    }

    const openEdit = (taskItem) => {
      isActiveTask.value = true
      task.value = taskItem
      taskTitle.value = taskItem.title
      taskDescription.value = taskItem.description
    }

    const removeTask = (taskItem) => {
      globalStore.deleteTask({ boardId: props.boardId, listId: props.list.id, task: taskItem })
    }

    const changeTask = () => {
      const updatedTask = {
        id: task.value.id,
        title: taskTitle.value,
        description: taskDescription.value
      }
      globalStore.editTask({ boardId: props.boardId, listId: props.list.id, task: updatedTask })
      clearDialog()
      isActiveTask.value = false
    }

    return {
      isActiveTask,
      taskTitle,
      taskDescription,
      task,
      validFieldTask,
      tasks,
      clearDialog,
      openEdit,
      removeTask,
      changeTask
    }
  }
}
</script>

<style scoped>
.pb-list {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  margin: 10px;
  min-width: 280px;
}

.list-header {
  background-color: #2196f3;
  color: white;
  padding: 15px;
  font-weight: bold;
  font-size: 16px;
}

.list-content {
  overflow: auto;
  max-height: 50vh;
  min-height: 200px;
}

.list-item {
  padding: 12px 15px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
  cursor: move;
}

.list-item:hover {
  background-color: #f8f8f8;
}

.item-content {
  flex: 1;
}

.item-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.item-subtitle {
  color: #666;
  font-size: 14px;
}

.item-actions {
  display: flex;
  gap: 5px;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background-color: rgba(0,0,0,0.05);
}

.edit-btn {
  color: #2196f3;
}

.delete-btn {
  color: #f44336;
}

.list-footer {
  text-align: end;
  padding: 10px;
  border-top: 1px solid #f0f0f0;
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
