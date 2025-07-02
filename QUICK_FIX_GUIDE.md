# 🔧 Быстрое исправление FSD нарушений

## 🎯 Найдено 55 ошибок - система защиты работает!

ESLint успешно обнаружил все прямые импорты из `@/src/`, которые нарушают FSD архитектуру.

## ⚡ Автоматическое исправление

### Windows PowerShell:

```powershell
# Замена всех @/src/ на @/ в TypeScript файлах
Get-ChildItem -Path "src" -Include "*.ts","*.tsx" -Recurse | ForEach-Object {
    (Get-Content $_.FullName) -replace '@/src/', '@/' | Set-Content $_.FullName
}

# Также исправить в корневых файлах app/
Get-ChildItem -Path "app" -Include "*.ts","*.tsx" -Recurse | ForEach-Object {
    (Get-Content $_.FullName) -replace '@/src/', '@/' | Set-Content $_.FullName
}
```

### Linux/Mac/Git Bash:

```bash
# Замена во всех TypeScript файлах
find src/ -name "*.ts" -o -name "*.tsx" | xargs sed -i 's/@\/src\//@\//g'
find app/ -name "*.ts" -o -name "*.tsx" | xargs sed -i 's/@\/src\//@\//g'
```

## 📝 Ручное исправление основных файлов

### 1. `src/app/layout.tsx`

```typescript
// ❌ Было:
import { siteConfig } from '@/src/shared/config';
import { fontSans } from '@/src/shared/config';
import { Navbar } from '@/src/widgets/navbar';

// ✅ Стало:
import { siteConfig } from '@/shared/config';
import { fontSans } from '@/shared/config';
import { Navbar } from '@/widgets/navbar';
```

### 2. `src/entities/card/model/store.ts`

```typescript
// ❌ Было:
import { Tag } from '@/src/entities/tag';
import { CardWithTags } from '@/src/shared/types';

// ✅ Стало:
import { Tag } from '@/entities/tag';
import { CardWithTags } from '@/shared/types';
```

### 3. `src/features/ai-questions/model/use-deep-research.ts`

```typescript
// ❌ Было:
import { useTaskStore } from '@/src/entities/task';
import { extractErrorMessage } from '@/src/shared/utils';

// ✅ Стало:
import { useTaskStore } from '@/entities/task';
import { extractErrorMessage } from '@/shared/utils';
```

## ✅ Проверка после исправления

```bash
# Запуск ESLint для проверки
npm run lint

# Должно показать значительно меньше ошибок
# Оставшиеся ошибки будут только мелкие (неиспользуемые переменные и т.д.)
```

## 🎯 Ожидаемый результат

После исправления все импорты должны использовать только FSD алиасы:

-   ✅ `@/app/*`
-   ✅ `@/pages/*`
-   ✅ `@/widgets/*`
-   ✅ `@/features/*`
-   ✅ `@/entities/*`
-   ✅ `@/shared/*`

❌ Никаких `@/src/*` импортов!

## 🚀 После исправления

Ваш проект будет полностью соответствовать FSD архитектуре с автоматической защитой от нарушений!
