# map-set
dou you really want to live forever
# WeakMap & WeakSet — Batafsil tushuncha, qo‘llanishi, misollar

 **TL;DR**: `WeakMap` va `WeakSet` — xotira sızıntilarini kamaytirish va obyektlarga bog‘langan, lekin ularni majburan ushlab turmaydigan (zaif) kolleksiyalar. Ular **faqat obyektlarni** saqlaydi, **iteratsiya** va **.size** yo‘q. Kalit/element boshqa joyda kerak bo‘lmasa, **Garbage Collector** ularni tozalab yuboradi.





Oddiy `Map`/`Set` kolleksiyalari ichiga qo‘yilgan obyektlar, ular kerak bo‘lmay qolgan taqdirda ham, kolleksiya ichida turgani uchun **xotirada yashab qolishi** mumkin — bu **memory leak** (xotira sızıntisi) ga olib keladi.

`WeakMap`/`WeakSet` shu muammoni hal qiladi: agar obyektga tashqi (mustahkam) havola qolmasa, **kolleksiyadagi havola ham uni ushlab turmaydi** va obyekt **GC** tomonidan o‘chirib tashlanadi.




* **Reachability (yetarlilik)**: Obyektga dasturdan (global, closure, call stack, boshqa obyektlar orqali) yetib borish mumkin bo‘lsa, u **yetarli** hisoblanadi va GC o‘chirmaydi.
* **Weak reference (zaif havola)**: Kolleksiya obyektni ushlab turadi, lekin **o‘zi yolg‘iz o‘chirishga to‘sqinlik qilmaydi**. Shuning uchun ular "weak" deb ataladi.
* **GC vaqtini boshqarib bo‘lmaydi**: Qachon tozalashi — dvigatel (V8, SpiderMonkey va h.k.) ixtiyorida. Siz **aniq vaqtga suyanolmaysiz**.







`WeakMap` — kalit-qiymat juftliklarini saqlaydi, **faqat obyektlar** kalit bo‘la oladi. Kalit obyektga tashqi havola qolmasa, u (va u bilan bog‘langan qiymat) avtomatik tozalanadi.



* `new WeakMap()`
* `.set(objKey, value)`
* `.get(objKey)`
* `.has(objKey)`
* `.delete(objKey)`

> **Yo‘q**: `.keys()`, `.values()`, `.entries()`, `for..of`, spread (`...`), `.size`, `.clear()`



* DOM elementlar, Web API obyektlariga **metadata**/holat bog‘lash
* Obyektlarga **private ma’lumot** biriktirish (klass tashqarisidan ko‘rinmas)
* **Kesh/memoizatsiya** — hisoblangan natijani obyektga bog‘lab qayta ishlatish



**A DOM elementga metadata biriktirish**

```js
const meta = new WeakMap();

function attachInfo(el, info) {
  meta.set(el, info); ham "ketadi"
}

function getInfo(el) {
  return meta.get(el)
}


const btn = document.querySelector('#save')
attachInfo(btn, { clicks: 0, role: 'primary' })

btn.addEventListener('click', () => {
  const m = meta.get(btn)
  m.clicks++
})


**B Klass uchun xususiy (private) holat**

```js
const _priv = new WeakMap();

class User {
  constructor(name) {
    const state = { name, secretToken: Math.random().toString(36).slice(2) };
    _priv.set(this, state);
  }
  get name() {
    return _priv.get(this).name;
  }
  get token() {
    return _priv.get(this).secretToken; // tashqaridan ko‘rinmaydi
  }
}

const u = new User('Ali');
console.log(u.name);  // "Ali"
console.log(u.token); // maxfiy qiymat
// u ga havola yo‘qolsa => _priv dagi holat ham GC tomonidan tozalanadi
```

**C Memoizatsiya (kesh) obyekt kaliti bilan**

```js
const cache = new WeakMap()

function heavyCompute(obj) {
  if (cache.has(obj)) return cache.get(obj)
  
  const result = JSON.stringify(obj) + "#" + Date.now()
  cache.set(obj, result)
  return result
}

let item = { id: 42 }
heavyCompute(item)     
item = null yozuvi ham "yo‘qoladi"
```



## 4 WeakSet

### 4.1 Ta’rif

`WeakSet` — faqat obyektlarni saqlaydigan jamlama. Elementga tashqi havola qolmasa, u jamlamadan ham avtomatik chiqariladi.

### 4.2 API

* `new WeakSet()`
* `.add(obj)`
* `.has(obj)`
* `.delete(obj)`

> **Yo‘q**: iteratsiya, `.size`, `.keys()`, `.values()`, `.entries()`

### 4.3 Qachon foydali?

* **Qayta ishlangan obyektlarni belgilash** ("visited") — graf/DOM traversal
* Bir obyekt **faqat bir marta** ishlanishini kafolatlash (debounce/once)

### 4.4 Misollar

**A DFS/BFS da "visited" belgisi**

```js
function traverse(root) {
  const visited = new WeakSet()

  function dfs(node) {
    if (!node || visited.has(node)) return
    visited.add(node)
    
    for (const child of node.children || []) dfs(child)
  }

  dfs(root)
}
```

**B Bir marta ishlash kafolati**

```js
const onceDone = new WeakSet();

function initFor(obj) {
  if (onceDone.has(obj)) return; // allaqachon qilingan
  // ... bir martalik sozlashlar ...
  onceDone.add(obj);
}
```

---

## 5 Weak\* va Map/Set farqlari

| Xususiyat          | Map/Set                              | WeakMap/WeakSet                                |
| ------------------ | ------------------------------------ | ---------------------------------------------- |
| Kalit/element turi | Har qanday (Map kaliti primitiv ham) | **Faqat obyekt**                               |
| Iteratsiya         | Bor (`for..of`, `.keys()` va h.k.)   | **Yo‘q**                                       |
| `.size`            | Bor                                  | **Yo‘q**                                       |
| Garbage Collection | Kalit/elementni ushlab turadi        | **Tutmadi** (zaif havola)                      |
| JSONga aylantirish | Qo‘lda mumkin (Map → Array)          | Ma’nosiz (iteratsiya yo‘q)                     |
| Qo‘llanish         | Ro‘yxat, registr, LRU, hisob-kitob   | Metadata, private state, visited, ephemer kesh |

**Qaysi biri?**

* **Hisob-kitob, sanash, tartiblash, LRU/TTL kesh** kerak bo‘lsa → **Map/Set**
* **Obyektga bog‘langan yashirin ma’lumot** va **xotirani avtomatik tozalash** kerak bo‘lsa → **WeakMap/WeakSet**

---

## 6 Afzalliklar va kamchiliklar

**Afzalliklar**

*  Xotira boshqaruvi: keraksiz obyektlar uchun avtomatik tozalash
*  Obyektga bog‘langan maxfiy/metama’lumotni tashqariga chiqarmaslik
*  Event/DOM bilan ishlashda memory leak xavfini kamaytirish

**Kamchiliklar**

*  Iteratsiya yo‘q → sanash, eksport qilish qiyin
*  `.size` yo‘q → qancha yozuv borligini bilib bo‘lmaydi
*  Faqat obyektlar bilan ishlaydi (primitiv yo‘q)
*  GC **no-deterministik** → vaqtga suyanib bo‘lmaydi

---

## 7 Amaliy naqshlar (patterns)

1. **DOM/Event metadata**: DOM node ↔️ ma’lumot (oxir-oqibat node olib tashlansa ma’lumot ham ketadi)
2. **Private state**: klass instansiyalariga tashqaridan ko‘rinmaydigan holat
3. **Ephemer kesh**: obyektga bog‘langan natijalarni vaqtincha saqlash
4. **Visited belgilash**: graf/AST/DOM traversalda ikki marta ishlov bermaslik

---

## 8 Tez-tez beriladigan savollar (FAQ)

* **Nega iteratsiya yo‘q?** — Kalitlar istalgan vaqtda GC bilan yo‘qolishi mumkin. Iteratsiya semantikasi noaniq bo‘lib qolardi.
* **`.size` qani?** — Shuning uchun ham yo‘q: elementlar soni noaniq (har lahza o‘zgarishi mumkin).
* **Primitivlardan kalit qilsa bo‘ladimi?** — Yo‘q, **faqat obyekt**.
* **JSON.stringify ishlaydimi?** — Ma’nosiz: iteratsiya yo‘q, shuning uchun odatdagi yo‘l bilan eksport qilib bo‘lmaydi.
* **Memory leak to‘liq yo‘qoladimi?** — Faqat **WeakMap/WeakSet ichidagi havola** yengillashadi. Agar siz boshqa o‘zgaruvchida ham o‘sha obyektga havola saqlasangiz, GC uni baribir o‘chirmaydi.

---

## 9 Aloqador imkoniyatlar: `WeakRef` va `FinalizationRegistry`

* **WeakRef**: obyektga zaif havola yasash (qo‘lda `.deref()` bilan olishga urinasiz). Juda kam hollarda, ehtiyotkorlik bilan ishlatiladi.
* **FinalizationRegistry**: obyekt GC qilinayotganda "yakuniylash" callbacki chaqiriladi (vaqt kafolati yo‘q!). Monitoring/cheklangan resurslarni bo‘shatish uchun ishlatiladi.

```js
const registry = new FinalizationRegistry((label) => {
  console.log('GC bo‘ldi:', label);
});

(function() {
  let obj = { name: 'temp' };
  registry.register(obj, 'temp-obj');
  // obj shu scope dan chiqqanda va GC bo‘lganda callback ishlashi MUMKIN
})();
```

> **Eslatma**: Bular ham no-deterministik; ishlab chiqarishda ehtiyotkorlik bilan qo‘llanadi.

---

## 10 Ishlash murakkabligi va unumdorlik

* `set/get/has/delete` amallari odatda **O(1)** (amaliy jihatdan).
* Weak\* kolleksiyalaridagi boshqaruv (GC bilan) muvofiqlashtirishgina qo‘shimcha xarajat keltirishi mumkin, lekin odatda afzalliklari ko‘proq.

---

## 11 Anti-patternlar (noto‘g‘ri ishlatish)

*  LRU/TTL keshni `WeakMap` bilan qurish (enumeratsiya kerak bo‘ladi)
*  Hisob-kitob yoki statistika uchun elementlarni sanash ( `.size` yo‘q )
*  Primitiv kalitlardan foydalanish (imkonsiz)
*  GC vaqtiga tayanish: “falon vaqtda albatta o‘chadi” deb o‘ylamang

---

## 12 Qisqa “cheat sheet”

* **Map** → ro‘yxat/registr, sanash, iteratsiya, LRU
* **Set** → unikal qiymatlar to‘plami, iteratsiya
* **WeakMap** → obyektga bog‘liq maxfiy/kesh ma’lumot, avtomatik tozalash
* **WeakSet** → obyektlarni "visited"/"init done" sifatida belgilash, avtomatik tozalash

---

## 13 Mini-test (o‘zingizni tekshiring)

1. WeakMap kaliti sifatida nimalar bo‘lishi mumkin?
2. Nega WeakSet da `.size` yo‘q?
3. Qaysi holatda WeakMap o‘rniga Map tanlaysiz?
4. DOM node ga metadata bog‘lashda qaysi tur ma’qul?

> Javoblar: (1) faqat obyekt; (2) elementlar GC bilan dinamik yo‘qoladi; (3) sanash/iteratsiya/LRU kerak bo‘lsa; (4) WeakMap.

---

## 14 Qo‘shimcha maslahatlar

* Agar **kalitingiz primitiv** bo‘lsa (ID, string), WeakMap mos emas → `Map` ishlating yoki primitivni obyektga o‘rab oling (ko‘pincha keraksiz).
* Xotira sızıntisini aniq diagnostika qilish uchun — DevTools (Performance/Memory) dan foydalaning; Weak\* kolleksiyalar bu jarayonni osonlashtiradi.

Shu bo‘ldi. Savollaringiz bo‘lsa yoki o‘z loyihangizga mos **kod shabloni** kerak bo‘lsa, yozing — moslab beraman.

