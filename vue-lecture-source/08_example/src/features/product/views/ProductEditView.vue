<script setup>

import ProductForm from "@/features/product/components/ProductForm.vue";
import {onMounted, ref} from "vue";
import {getProduct, updateProduct} from "@/features/product/api.js";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const isLoading = ref(true);
const product = ref(null);
const error = ref(null);
const isSubmitting = ref(false);

const fetchProduct = async () => {
  error.value =null;
  isLoading.value = true;
  try{

    const resp = await getProduct(route.params.id);
    product.value = resp.data.data.product;
    isLoading.value = false;
  }catch(e){
    console.log('상품 상세 조회 실패', e);
    error.value ='상품 데이터 조회 실패'
  }
}

const handleEdit = async ({payload, file}) => {
  isSubmitting.value = true;
  error.value = null;
  try{
    await updateProduct({ id : route.params.id, payload, file });
    await router.push(`/products/${route.params.id}`);
  }catch(e){
    console.log('상품 수정 요청 실패', e);
    error.value ='상품 수정에 실패'
  }
  isSubmitting.value = false;

}

onMounted(fetchProduct);
</script>

<template>
  <h1>상품 수정</h1>

  <div v-if="isLoading">Loading...</div>
  <ProductForm v-else
               :initial-data="product"
               :submit-label="'수정'"
               :disabled="isSubmitting"
               @submit="handleEdit"
  />
  <div v-if="error" class="error">{{ error }}</div>
</template>

<style scoped>
h1 { margin:10px; padding:10px; border-bottom:1px solid #000; }
.error { color: red; margin-top: 10px; }
</style>