<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="handleCancel">
    <div class="modal-dialog">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="handleCancel">&times;</button>
      </div>
      <div class="modal-body">
        <slot></slot>
        <div v-if="!isValid" class="alert alert-danger">
          <span class="material-icons">new_releases</span>
          <span>{{ invalidMessage }}</span>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-cancel" @click="handleCancel">{{ cancelText }}</button>
        <button class="btn btn-accept" @click="handleAccept" :disabled="!isValid">{{ acceptText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PBDialog',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Dialog'
    },
    acceptText: {
      type: String,
      default: 'Accept'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    isValid: {
      type: Boolean,
      default: true
    },
    invalidMessage: {
      type: String,
      default: 'Invalid input'
    }
  },
  emits: ['accept', 'cancel', 'update:isOpen'],
  methods: {
    handleAccept() {
      if (this.isValid) {
        this.$emit('accept')
      }
    },
    handleCancel() {
      this.$emit('cancel')
      this.$emit('update:isOpen', false)
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-dialog {
  background: white;
  border-radius: 8px;
  min-width: 400px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #333;
}

.btn-cancel:hover {
  background-color: #e0e0e0;
}

.btn-accept {
  background-color: #4caf50;
  color: white;
}

.btn-accept:hover:not(:disabled) {
  background-color: #45a049;
}

.btn-accept:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.alert {
  padding: 12px;
  margin-top: 15px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.alert-danger {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ef5350;
}

.alert .material-icons {
  font-size: 20px;
}
</style>
