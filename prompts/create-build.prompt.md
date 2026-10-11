# Command: create-build

## Мета

Викликати skill `build-and-test`, налаштувати npm scripts для складання
TypeScript і додати юніт-тестування через Vitest.

## Передумови

- У workspace існують `package.json`, `tsconfig.json` і `src/`.
- Початковий проєкт пройшов `create-project` або його еквівалентну перевірку.
- Існує `.github/skills/build-and-test/SKILL.md`.
- Перед змінами перевірено `package.json`, наявні scripts і тести.
- Параметри: `testPattern=src/**/*.test.ts`, `coverage=false`,
  `packageManager=npm`.

## Дії

1. Прочитай `.github/skills/build-and-test/SKILL.md`.
2. Виклич skill із параметрами workspace і тестового шаблону.
3. Додай Vitest як dev dependency лише якщо його ще немає.
4. Додай відсутні scripts `build`, `test` і `test:run`, зберігши сумісні
   наявні scripts.
5. Створи або доповни `src/index.ts` експортованою функцією Hello World.
6. Створи `src/index.test.ts`, якщо еквівалентного тесту ще немає.
7. Онови lock-файл через npm і не видаляй наявні тести.

Повторний запуск має виявляти вже налаштовані scripts, залежності та тести,
не створювати дублікати й не перезаписувати користувацьку логіку.

## Очікувані файли

- `package.json` з `build`, `test` і `test:run`;
- `package-lock.json`;
- `src/index.ts` — за потреби доповнений перевірюваною функцією;
- `src/index.test.ts`;
- `vitest.config.ts` — лише якщо стандартної конфігурації недостатньо.

## Команди перевірки

```bash
npm install
npm run build
npm run test:run
git diff --check
```

Перевір, що Vitest знайшов тест, усі тести пройшли, а `dist/` створено.

## Повідомлення про помилку

- `Помилка: skill build-and-test недоступний або не може бути виконаний.`
- `Помилка: package.json не містить сумісної конфігурації: <опис>.`
- `Помилка: встановлення Vitest завершилося невдало: <stderr>.`
- `Помилка: TypeScript-збірка не пройшла: <stderr>.`
- `Помилка: Vitest повідомив про невдалі тести: <короткий звіт>.`

Зупинись на невдалому етапі, покажи exit code і не оголошуй команду успішною.
