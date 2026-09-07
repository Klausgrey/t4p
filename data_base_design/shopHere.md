# Case Study 1: Shop Here

## Step 1: Entities

- Categories
- Items
- Suppliers
- Employees
- Purchase Orders

## Step 2: Attributes

**Categories**

- Category Number (PK)
- Category Name

**Items**

- Item Number (PK)
- Item Description
- Category Number (FK → Categories)
- Serial Number
- Unit Price
- Reorder Level

**Suppliers**

- Supplier Code (PK)
- Supplier Name
- Address
- Phone Number
- Country of Origin
- Shipment Mode Number
- Shipment Mode

**Employees**

- Employee ID (PK)
- Employee Name

**Purchase Orders**

- Purchase Order ID (PK)
- Supplier ID (FK → Suppliers)
- Employee ID (FK → Employees)
- Item Number (FK → Items)
- Order Date
- Shipment Date
- Shipment Method ID
- Quantity
- Charge

## Step 3: ER Diagram

```mermaid
erDiagram
    CATEGORY ||--o{ ITEM : contains
    SUPPLIER ||--o{ ORDER : receives
    EMPLOYEE ||--o{ ORDER : places
    SHIPMENT||--o{ ORDER : uses
    SHIPMENT ||--o{ SUPPLIER : ships_via
    ORDER ||--o{ ORDERDETAIL : includes
    ITEM ||--o{ ORDERDETAIL : ordered_in

    CATEGORY {
        int CategoryID PK
        string CategoryName
    }
    ITEM {
        int ItemNumber PK
        string ItemDescription
        int CategoryID FK
        string SerialNumber
        decimal UnitPrice
        int ReorderLevel
    }
    SUPPLIER {
        int SupplierCode PK
        string SupplierName
        string Address
        string PhoneNumber
        string CountryOfOrigin
        int ShipmentID FK
    }
    SHIPMENT {
        int ShipmentID PK
        string ShipmentDescription
    }
    EMPLOYEE {
        int EmployeeID PK
        string EmployeeName
    }
    ORDER {
        int OrderID PK
        int SupplierCode FK
        int EmployeeID FK
        date OrderDate
        date ShipmentDate
        int ShipmentModeID FK
        decimal FreightCharge
    }
    ORDERDETAIL {
        int OrderID FK
        int ItemNumber FK
        int Quantity
    }
```
