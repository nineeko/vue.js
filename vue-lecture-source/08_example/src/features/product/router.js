export const productRoutes = [
    {
        path: '/products',
        name : 'ProductList',
        component : () => import('@/features/product/views/ProductListView.vue')
    },
    {
        path : '/products/:id',
        name : 'ProductDetail',
        component : () => import('@/features/product/views/ProductDetailView.vue')
    },
    {
        path : '/products/new',
        name : 'ProductCreate',
        component : () => import('@/features/product/views/ProductCreateView.vue')
    },
    {
        path : '/products/:id/edit',
        name : 'ProductEdit',
        component : () => import('@/features/product/views/ProductEditView.vue')
    }
]