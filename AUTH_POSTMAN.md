# Auth Postman Sorguları

Base URL:

```text
http://localhost:3000/api/v1
```

Postman environment değişkenleri:

```text
base_url=http://localhost:3000/api/v1
accessToken=
verifyToken=
resetToken=
```

Postman'da endpointleri `{{base_url}}/...` şeklinde kullan.

## 1. Health

Method:

```text
GET
```

URL:

```text
http://localhost:3000/health
```

Body yok.

Beklenen sonuç:

```json
{
  "success": true,
  "data": {
    "status": "OK"
  }
}
```

## 2. Register

Method:

```text
POST
```

URL:

```text
{{base_url}}/auth/register
```

Headers:

```text
Content-Type: application/json
```

Body:

```json
{
  "email": "customer1@example.com",
  "name": "Customer One",
  "password": "Password123",
  "confirmPassword": "Password123"
}
```

Beklenen sonuç:

```json
{
  "success": true,
  "data": {
    "user": {
      "email": "customer1@example.com",
      "name": "Customer One",
      "role": "CUSTOMER",
      "isVerified": false
    },
    "message": "Kayıt başarılı! Email adresinizi doğrulamak için linke tıklayın."
  }
}
```

Not:
Kayıttan sonra kullanıcı giriş yapamaz. Önce email doğrulanmalı.

## 3. Verify Email

Method:

```text
GET
```

URL:

```text
{{base_url}}/auth/verify-email?token={{verifyToken}}
```

Body yok.

Token nereden alınır:

Mail içindeki linkten `token=` sonrasındaki 64 karakterlik değeri al.

Link örneği:

```text
http://localhost:3000/api/v1/auth/verify-email?token=TOKEN_DEGERI
```

Postman environment:

```text
verifyToken=TOKEN_DEGERI
```

Beklenen sonuç:

```json
{
  "success": true,
  "data": {
    "verified": true
  }
}
```

## 4. Resend Verification

Method:

```text
POST
```

URL:

```text
{{base_url}}/auth/resend-verification
```

Headers:

```text
Content-Type: application/json
```

Body:

```json
{
  "email": "customer1@example.com"
}
```

Beklenen sonuç:

```json
{
  "success": true,
  "data": {
    "message": "Eğer bu email kayıtlı ve doğrulanmamışsa yeni link gönderildi."
  }
}
```

## 5. Login

Method:

```text
POST
```

URL:

```text
{{base_url}}/auth/login
```

Headers:

```text
Content-Type: application/json
```

Body:

```json
{
  "email": "customer1@example.com",
  "password": "Password123"
}
```

Beklenen sonuç:

```json
{
  "success": true,
  "data": {
    "user": {
      "email": "customer1@example.com",
      "role": "CUSTOMER"
    },
    "accessToken": "JWT_ACCESS_TOKEN"
  }
}
```

Önemli:

```text
refreshToken cookie olarak gelir.
```

Postman otomatik cookie saklar. Cookie adı:

```text
refreshToken
```

Tests sekmesine ekle:

```javascript
const json = pm.response.json();

if (json.data && json.data.accessToken) {
  pm.environment.set("accessToken", json.data.accessToken);
}
```

## 6. Me

Method:

```text
POST
```

URL:

```text
{{base_url}}/auth/me
```

Authorization:

```text
Bearer Token
```

Token:

```text
{{accessToken}}
```

Body yok.

Beklenen sonuç:

```json
{
  "success": true,
  "data": {
    "user": {
      "email": "customer1@example.com",
      "role": "CUSTOMER",
      "isActive": true,
      "isVerified": true
    }
  }
}
```

## 7. Session

Method:

```text
POST
```

URL:

```text
{{base_url}}/auth/session
```

Authorization:

```text
Bearer Token
```

Token:

```text
{{accessToken}}
```

Body yok.

Beklenen sonuç:

```json
{
  "success": true,
  "data": {
    "session": [
      {
        "id": "refresh_token_id",
        "userAgent": "PostmanRuntime/...",
        "ipAddress": "::1",
        "createdAt": "date",
        "expiresAt": "date"
      }
    ]
  }
}
```

## 8. Refresh

Method:

```text
POST
```

URL:

```text
{{base_url}}/auth/refresh
```

Authorization yok.

Body yok.

Gereken:

```text
Postman cookie jar içinde refreshToken cookie olmalı.
```

Beklenen sonuç:

```json
{
  "success": true,
  "data": {
    "accessToken": "NEW_JWT_ACCESS_TOKEN"
  }
}
```

Refresh token rotation:

```text
Bu endpoint çalışınca eski refresh token revoke edilir.
Yeni refreshToken cookie olarak set edilir.
```

Tests sekmesine ekle:

```javascript
const json = pm.response.json();

if (json.data && json.data.accessToken) {
  pm.environment.set("accessToken", json.data.accessToken);
}
```

## 9. Logout

Method:

```text
POST
```

URL:

```text
{{base_url}}/auth/logout
```

Authorization gerekmez.

Body yok.

Gereken:

```text
refreshToken cookie olmalı.
```

Beklenen sonuç:

```json
{
  "success": true,
  "data": {
    "message": "Çıkış Başarılı!"
  }
}
```

Sonuç:

```text
Mevcut refresh token revoke edilir.
Cookie temizlenir.
```

## 10. Logout All

Method:

```text
POST
```

URL:

```text
{{base_url}}/auth/logout-all
```

Authorization:

```text
Bearer Token
```

Token:

```text
{{accessToken}}
```

Body yok.

Beklenen sonuç:

```json
{
  "success": true,
  "data": {
    "message": "Tüm Cihazlardan Çıkış Başarılı!"
  }
}
```

Sonuç:

```text
Kullanıcının tüm aktif refresh token kayıtları revoke edilir.
```

## 11. Forgot Password

Method:

```text
POST
```

URL:

```text
{{base_url}}/auth/forgot-password
```

Headers:

```text
Content-Type: application/json
```

Body:

```json
{
  "email": "customer1@example.com"
}
```

Beklenen sonuç:

```json
{
  "success": true,
  "data": {
    "message": " Sıfırlama Maili gönderildi."
  }
}
```

Token nereden alınır:

Mail içindeki reset linkinden `token=` değerini al.

## 12. Reset Password

Method:

```text
POST
```

URL:

```text
{{base_url}}/auth/reset-password
```

Headers:

```text
Content-Type: application/json
```

Body:

```json
{
  "token": "{{resetToken}}",
  "password": "NewPassword123",
  "confirmPassword": "NewPassword123"
}
```

Beklenen sonuç:

```json
{
  "success": true,
  "data": {
    "message": "Şifre başarıyla sıfırlandı, Lütfen yeniden giriş yapın"
  }
}
```

Sonuç:

```text
Şifre değişir.
Kullanıcının tüm aktif refresh token kayıtları revoke edilir.
Tekrar login gerekir.
```

## 13. RBAC Örnekleri

Admin isteyen endpoint:

```text
POST {{base_url}}/categories
```

Authorization:

```text
Bearer {{accessToken}}
```

Body:

```json
{
  "name": "Test Kategori",
  "slug": "test-kategori"
}
```

CUSTOMER rolü ile beklenen sonuç:

```text
403 Forbidden
```

Admin kullanıcı ile beklenen sonuç:

```text
201 Created
```

Admin veya producer isteyen endpoint:

```text
POST {{base_url}}/products
```

Authorization:

```text
Bearer {{accessToken}}
```

## 14. Sıralı Test Akışı

```text
1. Register
2. Mailden verify token al
3. Verify Email
4. Login
5. Me
6. Session
7. Refresh
8. Me
9. Forgot Password
10. Mailden reset token al
11. Reset Password
12. Yeni şifre ile Login
13. Logout
14. Login
15. Logout All
```

## 15. Sık Hatalar

Email doğrulanmadan login:

```text
401 Unauthorized
Email adresi doğrulanmamış. Lütfen giriş için mail adresinizi doğrulayın
```

Access token yokken korumalı endpoint:

```text
401 Unauthorized
Access token eksik
```

Yanlış role sahip kullanıcı:

```text
403 Forbidden
Bu işlem için yetkiniz yok
```

Refresh cookie yokken refresh:

```text
401 Unauthorized
Refresh Token bulunamadı
```

Eski refresh token tekrar kullanılırsa:

```text
401 Unauthorized
Oturum güvenliği ihlali. Tüm oturumlarınız sonlandırıldı
```
