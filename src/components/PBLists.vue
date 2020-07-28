<template>
  <vs-list>
    <vs-list-header :title="listHeader" color="primary"></vs-list-header>
    <draggable v-model="tasks" :options="{group:'tasks-group'}">
      <vs-list-item :title="task.title" :subtitle="task.description" :key="index" v-for="(task, index) in tasks">
        <div class="close">
          <vs-avatar class="list-action" icon="edit" color="primary" @click="openEdit(task)" />
          <vs-avatar class="list-action" icon="remove" color="danger" @click="removeTask(task)" />
        </div>
      </vs-list-item>
      <div style="text-align: end; padding: 10px;" slot="footer">
        <slot name="footer"></slot>
      </div>
    </draggable>
    <vs-prompt
      @cancel="clearDialog()"
      @accept="changeTask()"
      :title="$t('task-title')"
      :is-valid="validFieldTask"
      :accept-text="$t('edit')"
      :cancel-text="$t('cancel')"
      :active.sync="isActiveTask"
      :color="'success'"
      class="con-vs-dialog"
    >
      <div class="con-exemple-prompt">
      <span v-html="$t('task-dialog')"></span>
        <vs-input :placeholder="$t('task-name-placeholder')" v-model="taskTitle"/>
        <vs-textarea :label="$t('task-description-placeholder')" v-model="taskDescription" />

        <vs-alert :active="!validFieldTask" color="danger" icon="new_releases" >
          {{$t('dialog-invalid')}}
        </vs-alert>
      </div>
    </vs-prompt>
  </vs-list>
</template>

<script>
import { mapActions } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'List',
  components: {
    draggable
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
  computed: {
    validFieldTask () {
      return (this.taskTitle.length > 0 && this.taskDescription.length > 0)
    },
    tasks: {
      set (value) {
        this.list.tasks = [...value]
        this.saveTasks({ boardId: this.boardId, list: this.list })
      },
      get () {
        return this.list.tasks
      }
    }
  },
  data: () => ({
    isActive: false,
    isActiveTask: false,
    taskTitle: '',
    taskDescription: '',
    task: null
  }),
  methods: {
    ...mapActions('Global', ['saveTasks', 'deleteTask', 'editTask']),
    clearDialog () {
      this.listTitle = ''
      this.taskTitle = ''
      this.taskDescription = ''
    },
    openEdit (task) {
      this.isActiveTask = true
      this.task = task
      this.taskTitle = task.title
      this.taskDescription = task.description
    },
    removeTask (task) {
      this.deleteTask({ boardId: this.boardId, listId: this.list.id, task: task })
    },
    changeTask () {
      const task = {
        id: this.task.id,
        title: this.taskTitle,
        description: this.taskDescription
      }
      this.editTask({ boardId: this.boardId, listId: this.list.id, task })
    }
  }
}
</script>

<style scoped>
.close {
  padding-left: 10px;
  cursor: pointer;
}

.list-action {
  cursor: pointer;
}

.vs-list .vs-list-item .list-subtitle {
  padding-top: 10px  !important;
  padding-bottom: 10px !important;
}

.vs-list > :nth-child(2) {
  overflow: auto;
  max-height: 50vh;
}
</style>
