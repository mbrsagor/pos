from django.urls import path
from base.views.dashboard_view import Dashboard
from base.views.auth_view import UserLoginView, LogoutView
from base.views.category_view import CategoryCreateView, CategoryListView, CategoryUpdateView, CategoryDeleteView
from base.views.inventory_view import CreateInventoryView, InventoryListView, InventoryDetailView, \
    InventoryUpdateView, InventoryDeleteView
from base.views.tag_view import CreateListTagView, TagDeleteView
from base.views.product_view import CreateProductView, ProductListView, CategoryByProduct, \
    ProductGridView

from base.views.pos import POSView, bulling_detail, cart_add, cart_updated, cart_remove

urlpatterns = [
    path('', UserLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('dashboard/', Dashboard.as_view(), name='dashboard'),
    path('create-category/', CategoryCreateView.as_view(), name='create_category'),
    path('category/', CategoryListView.as_view(), name='category_list'),
    path('category/<pk>/', CategoryUpdateView.as_view(), name='category_update'),
    path('category-delete/<pk>/', CategoryDeleteView.as_view(), name='category_delete'),
    path('create-inventory/', CreateInventoryView.as_view(), name='inventory_create'),
    path('inventory/', InventoryListView.as_view(), name='inventory_list'),
    path('inventory/<pk>/', InventoryDetailView.as_view(), name='inventory_detail'),
    path('inventory-update/<pk>/', InventoryUpdateView.as_view(), name='inventory_update'),
    path('inventory-delete/<pk>/', InventoryDeleteView.as_view(), name='inventory_delete'),
    path('tag/', CreateListTagView.as_view(), name='create_list_tag'),
    path('tag/<pk>/', TagDeleteView.as_view(), name='tag_delete'),
    path('create-product/', CreateProductView.as_view(), name='product_create'),
    path('product-list/', ProductListView.as_view(), name='product_list'),
    path('category-list-page/', CategoryByProduct.as_view(), name='category_by_product'),
    path('product-grid-view/<int:id>/', ProductGridView.as_view(), name='product_grid_view'),
    path('bulling-detail/', bulling_detail, name='bulling_detail'),
    path('cart/<int:id>/', cart_add, name='cart_add'),
    path('cart-update/<int:id>/', cart_updated, name='cart_updated'),
    path('cart-remove/<int:id>/', cart_remove, name='cart_remove'),
    path('pos/', POSView.as_view(), name='pos_view'),
]
