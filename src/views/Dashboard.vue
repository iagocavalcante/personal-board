<template>
  <vs-row vs-justify="center">
    <vs-col vs-type="flex" vs-align="center" vs-justify="center" vs-w="12">
      <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="6">
        <vs-avatar class="ml-10" size="large" src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"/>
        <h1 class="ml-10">{{ $t('welcome-user')}} {{ this.data.username }}</h1>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="space-between" vs-align="center" vs-w="6">
        <vs-col vs-type="flex" vs-align="flex-end" vs-w="2"></vs-col>
        <vs-col vs-type="flex" vs-align="flex-end" vs-w="2"></vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="flex-end" vs-w="2">
          <vs-button style="border-radius: 50%" color="success" vs-type="relief" @click.prevent="openAlert" vs-icon="add"></vs-button>
        </vs-col>
      </vs-col>
    </vs-col>
    <vs-divider position="center">
      My Boards
    </vs-divider>
    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="12">
      <vs-col :key="board.id" v-for="board in data.boards" vs-type="flex" vs-w="3">
        <vs-card actionable>
          <div slot="header">
            <vs-row vs-justify="center">
              <vs-col vs-type="flex" vs-w="12">
                <vs-col vs-type="flex" vs-w="6">
                  <h3>
                    {{board.name}}
                  </h3>
                </vs-col>
                <vs-col vs-type="flex" vs-justify="flex-end" vs-align="flex-end" vs-w="6">
                  <vs-button vs-type="flat" color="rgb(255,223,0)" vs-icon="star_border"></vs-button>
                </vs-col>
              </vs-col>
            </vs-row>
          </div>
          <div>
            <span>{{board.description}}</span>
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button class="ml-5" vs-type="filled" color="danger" vs-icon="delete"></vs-button>
              <vs-button class="ml-5" color="primary" vs-icon="edit"></vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </vs-col>
    <pb-dialog
      :placeholderTitle="$t('board-name-placeholder')"
      :placeholderText="$t('board-description-placeholder')"
      :isActive="isActive"
    >
    </pb-dialog>
  </vs-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PbDialog from '@/components/PBDialog'
export default {
  name: 'Dashboard',
  components: {
    PbDialog
  },
  computed: {
    ...mapState('Global', ['data'])
  },
  data: () => ({
    isActive: false
  }),
  methods:{
    openAlert(){
      this.isActive = true
    }
  }
}
</script>

<style scoped>
.con-vs-card {
  margin-right: 10px;
}

.ml-10 {
  margin-left: 10px;
}

.ml-5 {
  margin-left: 5px;
}
</style>


