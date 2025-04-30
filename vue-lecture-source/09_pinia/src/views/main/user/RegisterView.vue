<script setup>

import RegisterForm from "@/components/user/RegisterForm.vue";
import {registerUser} from "@/api/user.js";
import {useRouter} from "vue-router";

const router = useRouter();

const handleRegister = async (formData) => {
  // 회원 가입 api 호출
  try {
    await registerUser(formData);
    await router.push('/login');
  } catch (e) {
    console.log('회원 가입 실패', e);
  }
}


</script>

<template>
  <div class="container">
    <h1>회원 가입</h1>
    <RegisterForm @submit="handleRegister"/>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>