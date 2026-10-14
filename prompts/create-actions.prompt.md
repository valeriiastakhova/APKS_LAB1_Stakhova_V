# Command: create-actions

## Мета

Викликати skill `github-actions` і створити CI workflow для TypeScript-проєкту
з матрицею Windows, Linux та macOS.

## Передумови

- Існують `package.json`, `package-lock.json` і scripts `build` та `test:run`.
- Створено або перевірено `src/` і тести Vitest.
- Існує `.github/skills/github-actions/SKILL.md`.
- Перед змінами перевірено каталог `.github/workflows/` та наявні workflow.
- Параметри: `nodeVersion=20`, `branches=main`,
  `testCommand=npm run test:run`.

## Дії

1. Прочитай `.github/skills/github-actions/SKILL.md`.
2. Виклич skill із параметрами workspace, версії Node.js, гілок і test command.
3. Створи `.github/workflows/ci.yml`, якщо його немає.
4. Якщо workflow уже існує, доповнюй його лише після перевірки сумісності; не
   видаляй існуючі jobs або secrets.
5. Переконайся, що matrix містить `windows-latest`, `ubuntu-latest` і
   `macos-latest`, а кроки виконують `npm ci`, `npm run build` і
   `npm run test:run`.
6. Не додавай deploy, publish чи секрети без окремого запиту.

Повторний запуск не повинен дублювати workflow, jobs або steps.

## Очікувані файли

- `.github/workflows/ci.yml` — CI workflow із матрицею трьох ОС.

Інші файли змінюються лише тоді, коли це необхідно для узгодження workflow
з уже погодженою конфігурацією npm.

## Команди перевірки

```bash
npm ci
npm run build
npm run test:run
git diff --check
```

Додатково перевір YAML linter-ом або валідатором GitHub Actions. У GitHub
переконайся, що всі три matrix jobs стартують і завершуються успішно.

## Повідомлення про помилку

- `Помилка: skill github-actions недоступний за вказаним шляхом.`
- `Помилка: package-lock.json відсутній або не узгоджений із package.json.`
- `Помилка: ci.yml не створено або не оновлено: <причина>.`
- `Помилка: workflow не містить повної матриці ОС: <перелік відсутніх runner-ів>.`
- `Помилка: YAML або CI-перевірка не пройшла: <діагностика>.`

Не використовуй `continue-on-error` для приховування помилок і не видаляй
наявний workflow автоматично.
