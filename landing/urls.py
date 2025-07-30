from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from . import viewsets

router = DefaultRouter()
router.register(r'categories', viewsets.CategoryViewSet)
router.register(r'subcategories', viewsets.SubcategoryViewSet)
router.register(r'units', viewsets.UnitViewSet)
router.register(r'storagetypes', viewsets.StorageTypeViewSet)
router.register(r'storelocationtypes', viewsets.StoreLocationTypeViewSet)
router.register(r'suppliers', viewsets.SupplierViewSet)
router.register(r'storelocations', viewsets.StoreLocationViewSet)
router.register(r'products', viewsets.ProductViewSet)
router.register(r'inventory', viewsets.InventoryViewSet)
router.register(r'productstorelocations', viewsets.ProductStoreLocationViewSet)
router.register(r'roles', viewsets.RolesViewSet)
router.register(r'employees', viewsets.EmployeeViewSet)
router.register(r'salestransactions', viewsets.SalesTransactionViewSet)
router.register(r'orders', viewsets.OrderViewSet)

urlpatterns = [
    path('api/register/', views.RegisterView.as_view(), name='register'),
    path('api/login/', views.LoginView.as_view(), name='login'),
    path('api/logout/', views.LogoutView.as_view(), name='logout'),
    path('api/', include(router.urls)),
]
