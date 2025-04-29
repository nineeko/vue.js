import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

/* 상품 목록 조회 api */
export const getProducts = params =>
    api.get("/products", {params});

/* 특정 상품 상세 조회 api */
export const getProduct = id => api.get(`/products/${id}`);

/* 특정 상품 삭제 api */
export const deleteProduct = id => api.delete(`/products/${id}`);

/* 상품 등록 api */
export const createProduct = ({payload, file }) => {
    const formData = new FormData();
    formData.append(
        'productCreateRequest',
        new Blob([JSON.stringify(payload)], {type: 'application/json'})
    )
    formData.append('productImg', file);
    return api.post(`/products`,formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


/* 상품 수정 api */
export const updateProduct = ({payload, file, id }) => {
    const formData = new FormData();
    formData.append(
        'productUpdateRequest',
        new Blob([JSON.stringify(payload)], {type: 'application/json'})
    )
    formData.append('productImg', file);
    return api.put(`/products/${id}`,formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}