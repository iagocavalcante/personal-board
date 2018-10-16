<template>
  <vs-prompt
    @vs-cancel="title='',description=''"
    @vs-accept="acceptAlert"
    :vs-title="isBoard ? 'New Board' : 'New Card'"
    :vs-is-valid="validField"
    :vs-accept-text="$t('create')"
    :vs-cancel-text="$t('cancel')"
    :vs-active.sync="isActivePrompt"
    color="success"
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
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    title: '',
    description: '',
    activePrompt: false
  }),
  computed: {
    validField () {
      return (this.title.length > 0 && this.description.length > 0)
    },
    isActivePrompt: {
      set: function () {
        return this.activePrompt = !this.activePrompt
      },
      get: function () {
        return this.activePrompt = this.isActive
      }
    }
  },
  mounted () {
    this.$on('update:vsActive', this.setActive) 
    console.log(this.$parent)
  },
  methods:{
    setActive () {
      this.isActivePrompt = false
    },
    acceptAlert(){
      this.$vs.notify({
        color:'success',
        title: this.title,
        text: this.description
      })
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
