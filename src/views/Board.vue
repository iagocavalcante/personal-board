<template>
  <vs-row vs-justify="center">
    <vs-col vs-type="flex" vs-align="center" vs-justify="center" vs-w="12">
      <vs-avatar class="ml-10" size="large" src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"/>
      <h1 class="ml-10">{{ this.username }}</h1>
    </vs-col>
    <vs-divider position="center">
      {{$t('my-tasks')}}
    </vs-divider>
    <draggable class="vs-row" style="justify-content: flex-start; display: flex; width: 100%;" v-model="board.lists">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3" :key="list.id" v-for="list in board.lists">
        <vs-list>
          <vs-list-header :title="list.title" color="primary"></vs-list-header>
          <draggable v-model="list.tasks">
            <vs-list-item :title="task.title" :subtitle="task.description" :key="index" v-for="(task, index) in list.tasks">
            </vs-list-item>
          </draggable> 
        </vs-list>
      </vs-col>
    </draggable>
  </vs-row>
</template>

<script>
import { mapState } from 'vuex'
import draggable from 'vuedraggable'
export default {
  name: 'Board',
  components: {
    draggable
  },
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('Global', ['username'])
  },
  created () {
    console.log(this.$route)
  }
}
</script>