<template>
  <vs-list>
    <vs-list-header :title="listHeader" color="primary"></vs-list-header>
    <draggable v-model="tasks" :options="{group:'tasks-group'}">
      <vs-list-item :title="task.title" :subtitle="task.description" :key="index" v-for="(task, index) in tasks">
        <div class="close"></div>
      </vs-list-item>
      <div style="text-align: end; padding: 10px;" slot="footer">
        <slot name="footer"></slot>
      </div>
    </draggable>
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
    tasks: {
      set (value) {
        this.list.tasks = [...value]
        this.saveTasks({boardId: this.boardId, list: this.list})  
      },
      get () {
        return this.list.tasks
      }
    }
  },
  methods: {
    ...mapActions('Global', ['saveTasks']),
  }
}
</script>

<style>

</style>
