# 🎯 FSD Алиасы - Руководство по использованию

## ✅ Настроенные алиасы

В `tsconfig.json` настроены следующие алиасы для FSD слоев:

```json
{
    "paths": {
        "@/*": ["./*"], // Корень проекта
        "@/app/*": ["./src-new/app/*"], // Настройки приложения
        "@/pages/*": ["./src-new/pages/*"], // Страницы
        "@/widgets/*": ["./src-new/widgets/*"], // Композитные UI блоки
        "@/features/*": ["./src-new/features/*"], // Бизнес-функции
        "@/entities/*": ["./src-new/entities/*"], // Бизнес-сущности
        "@/shared/*": ["./src-new/shared/*"] // Переиспользуемые ресурсы
    }
}
```

## 📝 Примеры использования алиасов

### 🔧 Shared слой - переиспользуемые ресурсы

```typescript
// UI компоненты
import { Logo, SearchIcon, ThemeSwitch } from '@/shared/ui';
import { Counter } from '@/shared/ui/counter/counter';

// Конфигурация
import { siteConfig } from '@/shared/config';
import { fontSans } from '@/shared/config/fonts';

// Утилиты и библиотеки
import { debounce } from '@/shared/lib/debounce';
import { cn } from '@/shared/ui/primitives';

// Типы
import { CardWithTags } from '@/shared/types';

// Стили
import '@/shared/styles/globals.css';
```

### 📦 Entities слой - бизнес-сущности

```typescript
// Модели и сторы карточек
import { Card, useCardStore } from '@/entities/card';

// Модели и сторы тегов
import { Tag, TagColor, useTagsStore } from '@/entities/tag';

// Стор задач
import { useTaskStore } from '@/entities/task';
```

### 🎯 Features слой - бизнес-функции

```typescript
// AI функции
import {
    generateQuestions,
    Topic,
    useDeepResearch,
    AiAnimationWrapper,
} from '@/features/ai-questions';

// Создание карточек
import { CardCreationForm, CardItemModal } from '@/features/card-creation';

// Взаимодействие с карточками
import { CardItem, CardContent, CardItemDropdown } from '@/features/card-interaction';

// Управление тегами
import { TagInput, Tag, useGenerateTags } from '@/features/tag-management';
```

### 🧩 Widgets слой - композитные UI блоки

```typescript
// Список карточек
import { CardsList, HomeContent } from '@/widgets/cards-list';

// Сессия обучения
import { Learn, CardStack, AnimatedCard, ShowAnswerButton, Side } from '@/widgets/learning-session';

// Панель поиска
import { SearchBar, SearchInput, useSearch } from '@/widgets/search-panel';

// Навигация
import { Navbar } from '@/widgets/navbar';
```

### 📄 Pages слой - страницы

```typescript
// Главная страница
import { HomePage } from '@/pages/home';

// Страница обучения
import { LearnPage, LearnLayout } from '@/pages/learn';

// Страница исследования
import { ResearchPage, ResearchLayout } from '@/pages/research';
```

### ⚙️ App слой - настройки приложения

```typescript
// Лейаут и провайдеры
import { RootLayout } from '@/app/layout';
import { Providers } from '@/app/providers';
import { ErrorBoundary } from '@/app/error';
```

## ✅ Правила использования алиасов FSD

### 🔄 Направление зависимостей

```
app → pages → widgets → features → entities → shared
```

### ✅ Правильные импорты

```typescript
// ✅ Pages может импортировать из widgets, features, entities, shared
import { SearchBar } from '@/widgets/search-panel';
import { CardCreationForm } from '@/features/card-creation';
import { Card } from '@/entities/card';
import { Button } from '@/shared/ui';

// ✅ Widgets может импортировать из features, entities, shared
import { CardItem } from '@/features/card-interaction';
import { useCardStore } from '@/entities/card';
import { cn } from '@/shared/ui/primitives';

// ✅ Features может импортировать из entities, shared
import { Tag } from '@/entities/tag';
import { debounce } from '@/shared/lib';

// ✅ Entities может импортировать только из shared
import { CardWithTags } from '@/shared/types';
```

### ❌ Неправильные импорты

```typescript
// ❌ НЕЛЬЗЯ: entities импортирует из features
import { SomeFeature } from '@/features/some-feature'; // ОШИБКА!

// ❌ НЕЛЬЗЯ: shared импортирует из entities
import { Card } from '@/entities/card'; // ОШИБКА!

// ❌ НЕЛЬЗЯ: features импортирует из widgets
import { SomeWidget } from '@/widgets/some-widget'; // ОШИБКА!
```

## 🚀 Миграция старых импортов

### Старая структура → FSD алиасы

```typescript
// ❌ Старые импорты
import { Card } from '@/src/models/card';
import { useCardStore } from '@/src/store/cards';
import { SearchBar } from '@/src/components/search-bar';
import { Learn } from '@/src/components/learn';

// ✅ Новые FSD импорты
import { Card, useCardStore } from '@/entities/card';
import { SearchBar } from '@/widgets/search-panel';
import { Learn } from '@/widgets/learning-session';
```

## 🔧 Автозамена импортов

Для массовой замены импортов можно использовать поиск и замену в IDE:

1. **Entities:**

    - `@/src/models/card` → `@/entities/card`
    - `@/src/store/cards` → `@/entities/card`
    - `@/src/models/tag` → `@/entities/tag`
    - `@/src/store/tags` → `@/entities/tag`

2. **Shared:**

    - `@/src/components/icons` → `@/shared/ui`
    - `@/src/lib/` → `@/shared/lib`
    - `@/src/config/` → `@/shared/config`
    - `@/src/types/` → `@/shared/types`

3. **Features/Widgets:**
    - `@/src/components/card-creation-form` → `@/features/card-creation`
    - `@/src/components/search-bar` → `@/widgets/search-panel`
    - `@/src/components/learn` → `@/widgets/learning-session`

🎉 **Теперь у вас настроена полная система алиасов для FSD архитектуры!**
