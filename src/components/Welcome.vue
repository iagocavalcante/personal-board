<template>
  <div class="welcome-container">
    <div class="logo-container">
      <img :src="Logo" alt="Personal Board">
    </div>
    <div class="form-container">
      <div class="box">
        <div>
          <label :for="$t('username-label')">{{ $t("username-label") }}</label>
          <input
            class="input-field"
            type="text"
            :placeholder="$t('username-placeholder')"
            v-model="username"
            @keyup.enter="save()"
          />
          <button class="btn-save" @click="save()">
            {{ $t("button-save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@/stores/global'
import Logo from '@/assets/logo/personalboard-horiz.png'

export default {
  name: 'Welcome',
  setup() {
    const router = useRouter()
    const globalStore = useGlobalStore()
    const username = ref('')

    const save = () => {
      globalStore.saveUser(username.value)
      router.push('dashboard')
    }

    return {
      username,
      Logo,
      save
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.logo-container img {
  max-width: 80%;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.box {
  text-align: center;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box div {
  vertical-align: middle;
  width: 290px;
}

.input-field {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #4caf50;
}

.btn-save {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-save:hover {
  background-color: #45a049;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}
</style>
