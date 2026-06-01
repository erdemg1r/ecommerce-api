# Postman Collection Testing Guide - Coupon Service

A Postman collection has been created specifically for testing the Coupon Service. It is located at:
[coupon-postman-collection.json](file:///Users/erdem/Desktop/ecommerce-api/coupon-postman-collection.json)

## How to Test

1. **Import the Collection**:
   - Open Postman.
   - Click the **Import** button in the top left.
   - Choose the file [coupon-postman-collection.json](file:///Users/erdem/Desktop/ecommerce-api/coupon-postman-collection.json).

2. **Set Up Environment Variables** (Or let Postman handle it):
   - The collection uses a collection variable `base_url` set to `http://localhost:3000` by default.
   - The auth scripts will automatically store and extract the variables `admin_token`, `customer_token`, and `coupon_id` after successful requests.

3. **Execution Order**:
   - **Step 1: Admin Login** - Logs in as `admin@test.com` and saves `admin_token`.
   - **Step 2: Customer Login** - Logs in as `customer@test.com` and saves `customer_token`.
   - **Step 3: Create Coupon** - Creates a coupon `HMWRK50` (50% discount, min spend 50 TL) and saves `coupon_id`.
   - **Step 4: Get All Coupons** - Lists all coupons (requires Admin token).
   - **Step 5: Get Coupon By ID** - Fetches the created coupon using `{{coupon_id}}`.
   - **Step 6: Get Coupon By Code** - Fetches the coupon using code `HMWRK50` (Customer role).
   - **Step 7: Validate Coupon - Success** - Validates code `HMWRK50` on a 100 TL order (Returns valid: true, discount: 50 TL).
   - **Step 8: Validate Coupon - Fail (Low Order Amount)** - Validates code `HMWRK50` on a 20 TL order (Returns 422 ValidationError due to minimum amount condition).
   - **Step 9: Update Coupon** - Updates the coupon's discount percentage to 40% (requires Admin token).
   - **Step 10: Delete Coupon** - Deletes the coupon from the database (requires Admin token).
