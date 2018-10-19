<template>
  <vs-row vs-justify="center">
    <vs-col vs-type="flex" vs-align="center" vs-justify="center" vs-w="12">
      <vs-avatar class="ml-10" size="large" src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"/>
      <h1 class="ml-10">{{ boardPassed.title }}</h1>
    </vs-col>
    <vs-divider position="center">
      {{$t('my-tasks')}}
    </vs-divider>
    <vs-row vs-justify="center">
      <vs-col vs-type="flex" vs-align="flex-end" vs-justify="flex-end" vs-w="10" vs-offset="1">
        <vs-button color="primary" vs-type="relief"  @click.prevent="isActive = true">Create list</vs-button>
      </vs-col>
    </vs-row>
    <draggable class="vs-row" style="justify-content: flex-start; display: flex; width: 100%;" v-model="lists" >
      <vs-col vs-type="flex" vs-justify="center" vs-align="flex-start" vs-w="3" :key="list.id" v-for="list in lists">
        <pb-lists :listHeader="list.title" :list="list" :boardId="boardPassed.id">
          <div slot="footer">
            <a href="" @click.prevent="openCreate(list)">Create task</a>
          </div>
        </pb-lists>
      </vs-col>
    </draggable>
    <vs-prompt
      @vs-cancel="clearDialog"
      @vs-accept="chooseAction"
      :vs-title="'New List'"
      :vs-is-valid="validField"
      :vs-accept-text="!isBoardSelected ? $t('create') : $t('edit')"
      :vs-cancel-text="$t('cancel')"
      :vs-active.sync="isActive"
      :color="'success'"
      class="con-vs-dialog">
        <div class="con-exemple-prompt">
        <span v-html="$t('board-dialog')"></span>
          <vs-input :placeholder="$t('board-name-placeholder')" v-model="listTitle"/>

          <vs-alert :vs-active="!validField" color="danger" vs-icon="new_releases" >
            {{$t('dialog-invalid')}}
          </vs-alert>
        </div>
    </vs-prompt>
    <vs-prompt
      @vs-cancel="clearDialog"
      @vs-accept="chooseActionTask"
      :vs-title="'Task Board'"
      :vs-is-valid="validFieldTask"
      :vs-accept-text="!isBoardSelected ? $t('create') : $t('edit')"
      :vs-cancel-text="$t('cancel')"
      :vs-active.sync="isActiveTask"
      :color="'success'"
      class="con-vs-dialog">
        <div class="con-exemple-prompt">
        <span v-html="$t('board-dialog')"></span>
          <vs-input :placeholder="$t('board-name-placeholder')" v-model="taskTitle"/>
          <vs-textarea :label="$t('board-description-placeholder')" v-model="taskDescription" />

          <vs-alert :vs-active="!validFieldTask" color="danger" vs-icon="new_releases" >
            {{$t('dialog-invalid')}}
          </vs-alert>
        </div>
    </vs-prompt>
  </vs-row>
</template>

<script>
import { mapActions } from 'vuex'
import draggable from 'vuedraggable'
import PBLists from '@/components/PBLists'
export default {
  name: 'Board',
  components: {
    draggable,
    'pb-lists': PBLists
  },
  data: () => ({
    isActive: false,
    isActiveTask: false,
    listTitle: '',
    isBoardSelected: false,
    boardSelected: {},
    taskTitle: '',
    taskDescription:'',
    copyTasks: [],
    boardPassed: {}
  }),
  mounted () {
    if ( this.$route.params.board ) {
      localStorage.setItem('boardSelected', JSON.stringify(this.$route.params.board))
    }
    this.boardPassed = this.$route.params.board ? {...this.$route.params.board} : JSON.parse(localStorage.getItem('boardSelected'))
  },
  beforeRouteUpdate(to) {
    this.boardPassed = to.params.board ?  to.params.board : JSON.parse(localStorage.getItem('boardSelected'))
  },
  computed: {
    validField () {
      return (this.listTitle.length > 0)
    },
    validFieldTask () {
      return (this.taskTitle.length > 0 && this.taskDescription.length > 0)
    },
    lists: {
      set (value) {
        this.boardPassed.lists = [...value]
        this.saveLists(this.boardPassed)
      },
      get () {
        return this.boardPassed.lists
      }
    }
  },
  methods:{
    ...mapActions('Global', ['createList', 'deleteBoard', 'editBoard', 'createTask', 'deleteBoard', 'editBoard', 'saveLists', 'saveTasks']),
    create () {
      const payload = {
        title: this.listTitle,
        board: this.boardPassed
      }
      this.createList(payload)
    },
    taskCreate () {
      const payload = {
        title: this.taskTitle,
        description: this.taskDescription,
        board: this.boardPassed,
        list: this.list,
      }
      this.createTask(payload)
    },
    clearDialog(){
      this.listTitle = ''
      this.taskTitle = ''
      this.taskDescription = ''
      this.isBoardSelected = false
    },
    openBoard ( board ) {
      this.isBoardSelected = true
      this.boardSelected = board
      this.isActive = true
      this.listTitle = board.title
      this.description = board.description
      
    },
    openCreate ( list ) {
      this.isActiveTask = true
      this.list = {...list}
    },
    chooseAction () {
      if ( !this.isBoardSelected ) this.create()
      else this.edit(this.boardSelected)
      this.$vs.notify({
        color:'primary',
        title: 'New List Created',
        text: `List title: ${this.listTitle}`
      })
      this.clearDialog()
    },
    chooseActionTask () {
      if ( !this.isBoardSelected ) this.taskCreate()
      else this.edit(this.boardSelected)
      this.$vs.notify({
        color:'primary',
        title: 'New Task Created',
        text: `Task title: ${this.taskTitle}`
      })
      this.clearDialog()
    }
  }
}
</script>

<style scoped>
.con-exemple-prompt {
  padding: 10px;
  padding-bottom: 0;
}

.con-exemple-prompt .vs-input {
  width: 100%;
  margin-top: 10px;
}

.vs-con-textarea {
  width: 100%;
  margin-top: 10px;
}

</style>
