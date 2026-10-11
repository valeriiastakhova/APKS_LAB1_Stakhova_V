# Command: create-project

## Мета

Викликати skill `project-scaffold` і створити початковий мінімальний
TypeScript-проєкт Hello World.

## Передумови

- Команда запускається після успішного `git-init` або в уже наявному
  workspace.
- Існує каталог `.github/skills/project-scaffold/SKILL.md`.
- Визначено корінь workspace.
- Перед запуском перевірено Git-стан і список наявних файлів.
- Параметри за замовчуванням: `projectName=hello-world`, `nodeVersion=20`,
  `overwrite=false`.

## Дії

1. Прочитай інструкцію `.github/skills/project-scaffold/SKILL.md`.
2. Передай skill параметри `workspace`, `projectName`, `nodeVersion` та
   `overwrite`.
3. Створи відсутні `src/index.ts`, `package.json`, `tsconfig.json` і
   `README.md`, дотримуючись правил skill.
4. Створи або доповни `.gitignore`, не видаляючи наявні правила.
5. Виконай `npm install`, якщо створено або змінено `package.json`.
6. Не перезаписуй наявні файли, якщо `overwrite=false`; у звіті познач
   пропущені файли та причину.

Повторний запуск повинен пропускати вже коректні файли, не дублювати
конфігурацію та не видаляти артефакти або користувацькі зміни.

## Очікувані файли

- `src/index.ts`;
- `package.json`;
- `package-lock.json` після `npm install`;
- `tsconfig.json`;
- `.gitignore`;
- `README.md`.

## Команди перевірки

```bash
npm install
npm run build
npm start
git diff --check
```

Очікується, що `npm start` виведе `Hello, World!`, а `dist/index.js` буде
створено збіркою.

## Повідомлення про помилку

- `Помилка: skill project-scaffold недоступний за вказаним шляхом.`
- `Помилка: початковий проєкт не створено: <перелік файлів і причин>.`
- `Помилка: npm install завершився невдало: <stderr>.`
- `Помилка: TypeScript-збірка не пройшла: <stderr>.`
- `Помилка: Hello World має неочікуваний результат запуску: <фактичний вивід>.`

Не маскуй помилку успішним статусом і не видаляй частково створені файли.
