# Command: init

## Мета

Оркеструвати повну ідемпотентну ініціалізацію TypeScript Hello World:
послідовно виконати `git-init`, `create-project`, `create-build`,
`create-actions` і `check`.

## Передумови

- Визначено корінь workspace.
- Доступні Git, Node.js, npm і AI skills у `.github/skills/`.
- Доступні команди:
  - `prompts/git-init.prompt.md`;
  - `prompts/create-project.prompt.md`;
  - `prompts/create-build.prompt.md`;
  - `prompts/create-actions.prompt.md`;
  - `prompts/check.prompt.md`.
- Є права читання, запису та запуску локальних команд.
- Оркестратор не видаляє файли й не виконує commit або push.

## Дії

Виконуй кроки строго послідовно, передаючи контекст workspace і результати
попереднього кроку:

1. **`git-init`** — перевір репозиторій і підготуй `.gitignore`.
2. **`create-project`** — виклич `project-scaffold` і створи початковий
   TypeScript Hello World.
3. **`create-build`** — виклич `build-and-test`, налаштуй npm scripts і
   Vitest.
4. **`create-actions`** — виклич `github-actions` і створи CI workflow.
5. **`check`** — виконай read-only фінальну перевірку всіх результатів.

Після кожного кроку:

- перевір exit code і очікувані файли;
- збережи список змінених файлів та діагностику;
- переходь далі лише зі статусом `passed`;
- не повторюй успішний крок без потреби.

Повторний запуск має бути безпечним: кожна дочірня команда повинна пропускати
коректні файли, не дублювати записи та не видаляти користувацькі зміни.
Оркестратор не запускає наступний крок, якщо попередній має статус `failed`
або `blocked`.

## Очікувані файли

Після успішного виконання очікуються:

- `.gitignore`;
- `src/index.ts`;
- `src/index.test.ts`;
- `package.json`;
- `package-lock.json`;
- `tsconfig.json`;
- `.github/workflows/ci.yml`;
- наявний або доповнений `README.md`.

`dist/`, `coverage/` і `node_modules/` можуть з'явитися під час перевірок, але
мають бути проігноровані Git і не видаляються оркестратором автоматично.

## Команди перевірки

Оркестратор запускає перевірки, визначені дочірніми командами:

```bash
git status --short --branch
npm ci
npm run build
npm run test:run
git diff --check
```

Фінальний `check` додатково підтверджує структуру файлів і YAML workflow з
матрицею `windows-latest`, `ubuntu-latest`, `macos-latest`. Підсумок має
містити статус кожного з п'яти кроків.

## Повідомлення про помилку

- `INIT FAILED: крок <command> не виконано: <причина>.`
- `INIT BLOCKED: крок <command> пропущено через помилку попереднього кроку.`
- `INIT FAILED: відсутні очікувані файли: <список>.`
- `INIT FAILED: фінальна перевірка не пройдена: <діагностика>.`
- `INIT INCOMPLETE: проєкт частково створено; безпечні наступні дії: <список>.`

У разі помилки зупинись на першому невдалому кроці, не виконуй автоматичний
відкат і не видаляй частково створені файли. У фінальному звіті покажи
виконані кроки, exit codes, змінені файли та точну причину зупинки.
