from django.db import models
import uuid

class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    account_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

class Category(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Subcategory(BaseModel):
    category_id = models.CharField(max_length=255)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Unit(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class StoreType(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class StorageType(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Supplier(BaseModel):
    name = models.CharField(max_length=255)
    contact_info = models.TextField()
    lead_time = models.IntegerField() # in days

    def __str__(self):
        return self.name

class StoreLocation(BaseModel):
    store_name = models.CharField(max_length=255)
    store_type_id = models.CharField(max_length=255)
    address = models.TextField()
    contact_info = models.TextField()

    def __str__(self):
        return self.store_name

class Product(BaseModel):
    name = models.CharField(max_length=255)
    category_id = models.CharField(max_length=255)
    subcategory_id = models.CharField(max_length=255)
    unit_id = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    supplier_id = models.CharField(max_length=255)
    shelf_life = models.IntegerField() # in days
    reorder_threshold = models.IntegerField()
    storage_type_id = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Inventory(BaseModel):
    product_id = models.CharField(max_length=255)
    location_id = models.CharField(max_length=255)
    quantity_available = models.IntegerField()
    date_received = models.DateTimeField()
    expiration_date = models.DateTimeField()
    batch_number = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Inventory"



class Roles(BaseModel):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Roles"

class Employee(BaseModel):
    name = models.CharField(max_length=255)
    role_id = models.CharField(max_length=255)
    store_location_id = models.CharField(max_length=255)

class SalesTransaction(BaseModel):
    date_time = models.DateTimeField()
    product_id = models.CharField(max_length=255)
    quantity_sold = models.IntegerField()
    store_location_id = models.CharField(max_length=255)
    price_at_sale = models.DecimalField(max_digits=10, decimal_places=2)
    employee_id = models.CharField(max_length=255)

class Order(BaseModel):
    product_id = models.CharField(max_length=255)
    supplier_id = models.CharField(max_length=255)
    date_time = models.DateTimeField()
    expected_delivery = models.DateTimeField()
    quantity_ordered = models.IntegerField()
    status = models.CharField(max_length=255)