from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    Category, Subcategory, Unit, Supplier,
    StoreLocation, Product, Inventory, Employee,
    SalesTransaction, Order, StoreType, StorageType, EmployeeRole
)
from .serializers import (
    CategorySerializer, SubcategorySerializer, UnitSerializer, SupplierSerializer,
    StoreLocationSerializer,
    ProductSerializer, InventorySerializer,
    EmployeeRoleSerializer, EmployeeSerializer, SalesTransactionSerializer, OrderSerializer, StoreTypeSerializer, StorageTypeSerializer
)

class BaseViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        print("Query Params:", self.request.query_params)
        print("GET Params:", self.request.GET)
        """
        This view should return a list of all the objects
        for the currently authenticated user.
        """
        return self.queryset.filter(account_id=self.request.user.id)

    def perform_create(self, serializer):
        """
        Automatically add the account_id to the object.
        """
        serializer.save(account_id=self.request.user.id)

class CategoryViewSet(BaseViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SubcategoryViewSet(BaseViewSet):
    queryset = Subcategory.objects.all()
    serializer_class = SubcategorySerializer

class UnitViewSet(BaseViewSet):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer

class StoreTypeViewSet(BaseViewSet):
    queryset = StoreType.objects.all()
    serializer_class = StoreTypeSerializer

class StorageTypeViewSet(BaseViewSet):
    queryset = StorageType.objects.all()
    serializer_class = StorageTypeSerializer

class SupplierViewSet(BaseViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class StoreLocationViewSet(BaseViewSet):
    queryset = StoreLocation.objects.all()
    serializer_class = StoreLocationSerializer

class ProductViewSet(BaseViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

class InventoryViewSet(BaseViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

class EmployeeRoleViewSet(BaseViewSet):
    queryset = EmployeeRole.objects.all()
    serializer_class = EmployeeRoleSerializer

class EmployeeViewSet(BaseViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class SalesTransactionViewSet(BaseViewSet):
    queryset = SalesTransaction.objects.all()
    serializer_class = SalesTransactionSerializer

class OrderViewSet(BaseViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
