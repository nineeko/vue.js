<script setup>

import ProductForm from "@/features/product/components/ProductForm.vue";
import {ref} from "vue";
import {createProduct} from "@/features/product/api.js";
import {useRouter} from "vue-router";

const router =useRouter();
const isSubmitting = ref(false);
const error = ref(null);
const handleCreate = async ({payload, file}) => {
  isSubmitting.value = true;
  error.value = null;
  try {
    // 상품 등록 api 호출
    const resp = await createProduct({payload, file});
    console.log(resp);
    const productCode = resp.data.data.productCode;
    await router.push(`/products/${productCode}`)
  } catch(e){
    console.log('상품 등록 실패 ', e);
    error.value = '상품 등록에 실패하였습니다.';
  }
  isSubmitting.value = false;
}
</script>

<template>
  <h1>상품 등록</h1>
  <ProductForm
    :submitLabel="'등록'"
    :disabled="isSubmitting"
    @submit="handleCreate"
  />
  <div v-if="error" class="error">{{ error }}</div>
</template>

<style scoped>
h1 { margin:10px; padding:10px; border-bottom:1px solid #000; }
.error { color: red; margin-top: 10px; }
</style>