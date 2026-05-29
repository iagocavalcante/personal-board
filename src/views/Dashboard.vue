<template>
  <div class="dashboard">
    <div class="header-container">
      <img :src="Logo" width="200" height="80" alt="Personal Board">
      <div class="user-section">
        <div class="user-info">
          <img class="avatar" src="https://api.adorable.io/avatars/400/86345c54239c93f31229c54772935b4d.png" alt="Avatar"/>
          <h1 class="ml-10">{{ $t('welcome-user')}} {{ username }}</h1>
        </div>
        <div class="actions">
          <button class="btn-add" @click="isActive = true">
            <span class="material-icons">add</span>
          </button>
        </div>
      </div>
      <div class="divider">
        {{$t('my-board')}}
      </div>
      <draggable
        class="boards-container"
        v-model="reactiveBoard"
        item-key="id">
        <template #item="{element: board}">
          <div class="board-card">
            <div class="card-header" @click="goToBoard(board)">
              <h3>{{board.title}}</h3>
              <button class="btn-icon btn-star">
                <span class="material-icons">star_border</span>
              </button>
            </div>
            <div class="card-body" @click="goToBoard(board)">
              <span>{{board.description}}</span>
            </div>
            <div class="card-footer">
              <button class="btn-icon btn-delete" @click.prevent="exclude(board.id)">
                <span class="material-icons">delete</span>
              </button>
              <button class="btn-icon btn-edit" @click.prevent="openBoard(board)">
                <span class="material-icons">edit</span>
              </button>
            </div>
          </div>
        </template>
      </draggable>
      <PBDialog
        v-model:is-open="isActive"
        @cancel="clearDialog"
        @accept="chooseAction"
        :title="!isBoardSelected ? 'New Board' : 'Edit Board'"
        :is-valid="validField"
        :accept-text="!isBoardSelected ? $t('create') : $t('edit')"
        :cancel-text="$t('cancel')"
        :invalid-message="$t('dialog-invalid')">
        <div class="form-content">
          <p v-html="$t('board-dialog')"></p>
          <input
            class="input-field"
            type="text"
            :placeholder="$t('board-name-placeholder')"
            v-model="title"
          />
          <textarea
            class="textarea-field"
            :placeholder="$t('board-description-placeholder')"
            v-model="description"
            rows="4"
          ></textarea>
        </div>
      </PBDialog>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@/stores/global'
import draggable from 'vuedraggable'
import PBDialog from '@/components/PBDialog.vue'
import Logo from '@/assets/logo/personalboard-horiz.png'

export default {
  name: 'Dashboard',
  components: {
    draggable,
    PBDialog
  },
  setup() {
    const router = useRouter()
    const globalStore = useGlobalStore()

    const isActive = ref(false)
    const title = ref('')
    const description = ref('')
    const isBoardSelected = ref(false)
    const boardSelected = ref({})
    const tempBoard = ref([])

    const username = computed(() => globalStore.username)
    const boards = computed(() => globalStore.boards)

    const validField = computed(() => {
      return title.value.length > 0 && description.value.length > 0
    })

    const reactiveBoard = computed({
      get: () => tempBoard.value,
      set: (value) => {
        tempBoard.value = [...value]
        globalStore.saveBoards(tempBoard.value)
      }
    })

    onMounted(() => {
      tempBoard.value = [...boards.value]
    })

    const create = () => {
      const payload = {
        title: title.value,
        description: description.value
      }
      globalStore.createBoard(payload)
    }

    const clearDialog = () => {
      title.value = ''
      description.value = ''
      isBoardSelected.value = false
    }

    const openBoard = (board) => {
      isBoardSelected.value = true
      boardSelected.value = { ...board }
      isActive.value = true
      title.value = board.title
      description.value = board.description
    }

    const edit = (board) => {
      const payload = {
        id: board.id,
        title: title.value,
        description: description.value,
        starred: board.starred,
        lists: board.lists
      }
      globalStore.editBoard(payload)
    }

    const exclude = (id) => {
      const payload = { id }
      globalStore.deleteBoard(payload)
      tempBoard.value = [...boards.value]
    }

    const goToBoard = (board) => {
      router.push({ name: 'board', params: { board: board } })
    }

    const chooseAction = () => {
      if (!isBoardSelected.value) create()
      else edit(boardSelected.value)

      alert(!isBoardSelected.value ? 'New Board Created' : 'Board edited' + `\nBoard title: ${title.value}`)

      tempBoard.value = [...boards.value]
      clearDialog()
      isActive.value = false
    }

    return {
      Logo,
      username,
      boards,
      isActive,
      title,
      description,
      isBoardSelected,
      boardSelected,
      tempBoard,
      validField,
      reactiveBoard,
      create,
      clearDialog,
      openBoard,
      edit,
      exclude,
      goToBoard,
      chooseAction
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 20px 0;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.ml-10 {
  margin-left: 10px;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn-add {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.btn-add:hover {
  background-color: #45a049;
}

.divider {
  width: 100%;
  text-align: center;
  padding: 20px 0;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 20px;
}

.boards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 20px 0;
}

.board-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.board-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.card-header {
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
}

.card-body {
  padding: 15px;
  min-height: 80px;
}

.card-footer {
  padding: 10px 15px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  background-color: #fafafa;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover {
  background-color: rgba(0,0,0,0.05);
}

.btn-star {
  color: #ffd700;
}

.btn-delete {
  color: #f44336;
}

.btn-edit {
  color: #2196f3;
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
  border-color: #4caf50;
}

.textarea-field {
  resize: vertical;
  font-family: inherit;
}
</style>
