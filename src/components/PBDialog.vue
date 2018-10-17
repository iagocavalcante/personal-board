<template>
  <vs-prompt
    @vs-cancel="canceltAlert"
    @vs-accept="acceptAlert"
    :vs-title="isBoard ? 'New Board' : 'New Card'"
    :vs-is-valid="validField"
    :vs-accept-text="$t('create')"
    :vs-cancel-text="$t('cancel')"
    :vs-active.sync="activePrompt"
    color="danger"
    class="con-vs-dialog">
      <div class="con-exemple-prompt">
      Enter your {{ isBoard ? 'board' : 'card'}} name and {{ isBoard ? 'board' : 'card'}} description to <b>continue</b>.
        <vs-input :placeholder="placeholderTitle" v-model="title"/>
        <vs-textarea :label="placeholderText" v-model="description" />

        <vs-alert :vs-active="!validField" color="danger" vs-icon="new_releases" >
          {{$t('dialog-invalid')}}
        </vs-alert>
      </div>
    </vs-prompt>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    placeholderTitle: {
      type: String,
      default: ''
    },
    placeholderText: {
      type: String,
      default: ''
    },
    isBoard: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    title: '',
    description: ''
  }),
  computed: {
    validField () {
      return (this.title.length > 0 && this.description.length > 0)
    },
    ...mapState('Global', ['activePrompt'])
  },
  methods:{
    ...mapActions('Global', ['closeDialog']),
    acceptAlert(){
      this.$vs.notify({
        color:'success',
        title: this.title,
        text: this.description
      })
    },
    canceltAlert(){
      this.title = ''
      this.description = ''
      this.closeDialog()
    }
  }
}
</script>

<style>
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
