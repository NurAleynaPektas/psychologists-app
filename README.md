Psychologists Services — React + Firebase Application

Psychologists Services, kullanıcıların psikolog profillerini görüntüleyebildiği, favorilere ekleyebildiği, sıralayabildiği ve psikologlarla görüşme talebi oluşturabildiği modern bir web uygulamasıdır.
Proje, verilen teknik şartnameye uygun olarak React, Firebase Authentication, Firebase Realtime Database ve CSS Modules kullanılarak geliştirilmiştir.

Home Page:
-Şirket sloganı, hero alanı ve “Get started” CTA butonu içerir.
-Kullanıcıyı “Psychologists” sayfasına yönlendirir.
-3 farklı renk temasını destekler (Orange, Blue, Green).

Psychologists Page:
-Firebase Realtime Database’ten dinamik olarak psikolog verileri çekilir.
-Kartlarda şu bilgiler görüntülenir:
 avatar_url, name, experience, rating, price_per_hour, specialization, license,  initial_consultation, about
-Sıralama seçenekleri (A–Z, Z–A, fiyat ve popülerlik) desteklenir.
-İlk 3 kart görüntülenir; “Load more” ile ek kartlar yüklenebilir.
-“Read more” → ekstra bilgiler ve müşteri yorumları açılır.
-“Make an appointment” → form içeren modal açılır.

Favorites Page:
-Kullanıcının favorilere eklediği tüm psikologlar gösterilir.
-Kart tasarımı Psychologists sayfasıyla birebir aynıdır.
-Favoriler localStorage üzerinden kalıcıdır.

Favorites Button Behavior:
-Yetkisiz kullanıcı tıklarsa uyarı gösterilir.
-Giriş yapan kullanıcı favori ekleyebilir/kaldırabilir.
-Sayfa yenilense bile favori durumu korunur.

Firebase Authentication:
-Email + Password ile:
Register
Login
Current user state
Logout
-React-hook-form + yup ile alan doğrulaması yapılmaktadır.
-Modal: ESC, backdrop ve X ile kapanabilir.

Appointment Form:
-React-hook-form + yup doğrulamalı form içerir.
-Alanlar: name, email, phone, comment.
-Modal olarak açılır ve başarı sonrası kapanır.



Technologies:
-React (Vite)
-React Router
-CSS Modules
-Firebase Authentication
-Firebase Realtime Database
-React Hook Form
-Yup
-LocalStorage
-Modern responsive CSS


src/
│── assets/
│── components/
│   ├── Header/
│   ├── PsychologistCard/
│   ├── UI/Modal/
│   └── Appointment/
│── context/
│── firebase/
│── pages/
│   ├── Home/
│   ├── Psychologists/
│   └── Favorites/
│── styles/
│── App.jsx
│── main.jsx



Developer

Nur Aleyna Pektaş
Frontend Developer — React & Firebase
🔗 LinkedIn: https://www.linkedin.com/in/nur-aleyna-pekta%C5%9F-16b401332/


