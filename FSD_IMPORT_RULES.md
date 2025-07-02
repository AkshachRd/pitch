# 🚫 Правила импортов FSD - Защита архитектуры

## ✅ Настроенная защита

### 1. **ESLint правила** - запрещают нарушения на уровне линтера

### 2. **TypeScript paths** - блокируют прямые импорты на уровне компилятора

### 3. **Import restrictions** - контролируют направление зависимостей между слоями

---

## 🚫 Запрещенные импорты

### ❌ Прямые импорты из `src`

```typescript
// ❌ ОШИБКА: Прямой импорт из src
import { Card } from 'src/models/card';
import { useCardStore } from './src/store/cards';
import { SearchBar } from '../src/components/search-bar';
import { Card } from '@/src/models/card';

// ✅ ПРАВИЛЬНО: Импорт через FSD слои
import { Card, useCardStore } from '@/entities/card';
import { SearchBar } from '@/widgets/search-panel';
```

**Ошибка ESLint:**

```
❌ Прямые импорты из src запрещены! Используйте FSD слои: @/app, @/pages, @/widgets, @/features, @/entities, @/shared
```

---

## 🔒 Правила направления зависимостей FSD

### Архитектура слоев (снизу вверх):

```
app     ← может импортировать из всех слоев ниже
↑
pages   ← может импортировать из widgets, features, entities, shared
↑
widgets ← может импортировать из features, entities, shared
↑
features ← может импортировать из entities, shared
↑
entities ← может импортировать только из shared
↑
shared  ← не может импортировать из других слоев
```

---

## ❌ Нарушения архитектуры

### 1. **Shared → Entities** (❌ Запрещено)

```typescript
// ❌ ОШИБКА: shared импортирует из entities
// Файл: src/shared/ui/card-display.tsx
import { Card } from '@/entities/card'; // ОШИБКА!
```

**Ошибка ESLint:**

```
❌ Shared слой не может импортировать из вышестоящих слоев!
```

### 2. **Entities → Features** (❌ Запрещено)

```typescript
// ❌ ОШИБКА: entities импортирует из features
// Файл: src/entities/card/model/store.ts
import { CardCreationForm } from '@/features/card-creation'; // ОШИБКА!
```

**Ошибка ESLint:**

```
❌ Entities может импортировать только из shared слоя!
```

### 3. **Features → Widgets** (❌ Запрещено)

```typescript
// ❌ ОШИБКА: features импортирует из widgets
// Файл: src/features/card-creation/ui/form.tsx
import { CardsList } from '@/widgets/cards-list'; // ОШИБКА!
```

**Ошибка ESLint:**

```
❌ Features может импортировать только из shared и entities слоев!
```

### 4. **Widgets → Pages** (❌ Запрещено)

```typescript
// ❌ ОШИБКА: widgets импортирует из pages
// Файл: src/widgets/navbar/ui/navbar.tsx
import { HomePage } from '@/pages/home'; // ОШИБКА!
```

**Ошибка ESLint:**

```
❌ Widgets может импортировать только из shared, entities и features слоев!
```

### 5. **Pages → App** (❌ Запрещено)

```typescript
// ❌ ОШИБКА: pages импортирует из app
// Файл: src/pages/home/ui/home-page.tsx
import { RootLayout } from '@/app/layout'; // ОШИБКА!
```

**Ошибка ESLint:**

```
❌ Pages может импортировать только из shared, entities, features и widgets слоев!
```

---

## ✅ Правильные импорты

### **Shared слой** - только внутренние импорты

```typescript
// ✅ ПРАВИЛЬНО: shared → shared
// Файл: src/shared/ui/button.tsx
import { cn } from '@/shared/ui/primitives';
import { ThemeConfig } from '@/shared/config';
```

### **Entities слой** - может импортировать из shared

```typescript
// ✅ ПРАВИЛЬНО: entities → shared
// Файл: src/entities/card/model/store.ts
import { CardWithTags } from '@/shared/types';
import { debounce } from '@/shared/lib';
```

### **Features слой** - может импортировать из entities и shared

```typescript
// ✅ ПРАВИЛЬНО: features → entities + shared
// Файл: src/features/card-creation/ui/form.tsx
import { Card, useCardStore } from '@/entities/card';
import { Tag } from '@/entities/tag';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/ui/primitives';
```

### **Widgets слой** - может импортировать из features, entities и shared

```typescript
// ✅ ПРАВИЛЬНО: widgets → features + entities + shared
// Файл: src/widgets/cards-list/ui/cards-list.tsx
import { CardItem } from '@/features/card-interaction';
import { CardCreationForm } from '@/features/card-creation';
import { Card, useCardStore } from '@/entities/card';
import { Button } from '@/shared/ui';
```

### **Pages слой** - может импортировать из widgets, features, entities и shared

```typescript
// ✅ ПРАВИЛЬНО: pages → widgets + features + entities + shared
// Файл: src/pages/home/ui/home-page.tsx
import { CardsList } from '@/widgets/cards-list';
import { SearchBar } from '@/widgets/search-panel';
import { TagInput } from '@/features/tag-management';
import { Tag } from '@/entities/tag';
import { Container } from '@/shared/ui';
```

### **App слой** - может импортировать из всех слоев

```typescript
// ✅ ПРАВИЛЬНО: app → любые слои
// Файл: src/app/layout.tsx
import { Navbar } from '@/widgets/navbar';
import { HomePage } from '@/pages/home';
import { ThemeProvider } from '@/shared/providers';
```

---

## 🛠️ Как исправить нарушения

### 1. **Переместить код в правильный слой**

```typescript
// ❌ Было: shared импортирует entities
// src/shared/ui/card-preview.tsx
import { Card } from '@/entities/card'; // ОШИБКА!

// ✅ Стало: переместить в widgets или features
// src/widgets/card-preview/ui/card-preview.tsx
import { Card } from '@/entities/card'; // ОК!
```

### 2. **Использовать dependency injection**

```typescript
// ❌ Было: entities импортирует features
// src/entities/card/model/store.ts
import { validateCard } from '@/features/card-validation'; // ОШИБКА!

// ✅ Стало: передать функцию как параметр
// src/features/card-creation/model/create-card.ts
import { Card } from '@/entities/card';
import { validateCard } from './validation';

export const createCard = (data: CardData) => {
    const validatedData = validateCard(data);
    return new Card(validatedData);
};
```

### 3. **Вынести общий код в shared**

```typescript
// ❌ Было: нарушение архитектуры
// src/entities/card/ui/card-styles.ts
import { getTheme } from '@/features/theme'; // ОШИБКА!

// ✅ Стало: вынести в shared
// src/shared/ui/card-styles.ts
export const cardStyles = {
    base: 'card-base',
    theme: {
        light: 'card-light',
        dark: 'card-dark',
    },
};
```

---

## 🔧 Дополнительные команды

### Проверка импортов

```bash
# Запуск ESLint для проверки импортов
npm run lint

# Исправление автоматически исправимых нарушений
npm run lint:fix
```

### Поиск нарушений

```bash
# Поиск прямых импортов из src
grep -r "from.*src/" src/

# Поиск импортов между слоями
grep -r "from.*@/" src/ | grep -v "@/shared"
```

---

## 📋 Чек-лист для review

При code review проверяйте:

-   [ ] ✅ Нет прямых импортов из `src/`
-   [ ] ✅ Shared не импортирует из других слоев
-   [ ] ✅ Entities импортирует только из shared
-   [ ] ✅ Features импортирует только из entities и shared
-   [ ] ✅ Widgets импортирует только из features, entities и shared
-   [ ] ✅ Pages импортирует только из widgets, features, entities и shared
-   [ ] ✅ App может импортировать из любых слоев

🎯 **Эти правила гарантируют чистую FSD архитектуру!**
