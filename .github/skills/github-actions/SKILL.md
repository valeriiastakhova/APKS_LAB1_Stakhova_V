# Skill: GitHub Actions

## Призначення

Ця навичка створює CI-конвеєр GitHub Actions для TypeScript-проєкту. Конвеєр
виконує встановлення залежностей, збірку та Vitest на Windows, Linux і macOS
через матрицю операційних систем.

## Коли застосовувати

Застосовуй навичку, коли:

- у репозиторії ще немає `.github/workflows/ci.yml`;
- потрібно запускати однакові build і test перевірки на трьох ОС;
- локальні npm scripts уже визначені або їх налаштовує `build-and-test`;
- користувач просить додати або оновити GitHub Actions CI.

Перед редагуванням перевір наявні workflow. Не змінюй release, deploy або
publish-процеси, якщо вони не входять до запиту.

## Вхідні параметри

| Параметр | Обов'язковий | Опис |
| --- | --- | --- |
| `workspace` | так | Корінь GitHub-репозиторію |
| `nodeVersion` | ні | Версія Node.js; за замовчуванням `20` |
| `branches` | ні | Гілки запуску; за замовчуванням `main` і `pull_request` |
| `testCommand` | ні | Команда тестів; за замовчуванням `npm run test:run` |

Вхідні значення не повинні містити токени, паролі чи інші секрети. Для
приватних значень використовуй GitHub Actions Secrets, а не YAML-текст.

## Кроки створення

Створи файл `.github/workflows/ci.yml` з таким базовим конвеєром:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    name: Build and test (${{ matrix.os }})
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os: [windows-latest, ubuntu-latest, macos-latest]

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Unit tests
        run: npm run test:run
```

Якщо `package-lock.json` відсутній, спочатку запусти `npm install` локально та
додай lock-файл у репозиторій: `npm ci` у CI потребує узгодженого lock-файла.
Команди workflow мають посилатися на scripts із `package.json`, а не дублювати
логіку збірки в YAML.

## Очікуваний результат

Навичка створює:

- `.github/workflows/ci.yml` — workflow зі job `build-and-test`;
- матрицю `windows-latest`, `ubuntu-latest`, `macos-latest`;
- кроки checkout, setup Node.js із npm cache, `npm ci`, `npm run build` і
  `npm run test:run`.

Вона не створює secrets, не публікує пакети та не додає кроки deploy без
окремого запиту.

## Перевірка результату

Локально перевір:

```bash
npm ci
npm run build
npm run test:run
```

Потім перевір YAML:

1. файл має шлях `.github/workflows/ci.yml`;
2. `matrix.os` містить усі три runner-и;
3. workflow використовує `npm ci`, а не нестабільне встановлення без lock-файла;
4. build і test steps мають ненульовий exit code при помилці;
5. у GitHub Actions запусти workflow через push або pull request і переконайся,
   що всі три matrix jobs завершилися успішно.

Для синтаксичної перевірки можна використати GitHub Actions linter або
перевірку workflow у GitHub; не підміняй її лише локальним запуском npm.

## Дії у випадку помилки

- Якщо `npm ci` не працює — перевір наявність і актуальність
  `package-lock.json`, версію Node.js та різницю між lock-файлом і
  `package.json`.
- Якщо помилка лише на одній ОС — збережи назву runner-а, stdout/stderr і
  перевір OS-залежні шляхи, shell-команди та регістр імен файлів.
- Якщо workflow не запускається — перевір YAML-відступи, подію `on`, права
  workflow та назви scripts.
- Якщо build або tests падають — виправляй першопричину в проєкті або
  workflow і повторюй перевірку; не додавай `continue-on-error` для маскування
  помилки.
- Якщо GitHub Actions потребує секрет — використовуй `${{ secrets.NAME }}` і
  переконайся, що значення не друкується в логах.
- Не видаляй workflow чи інші файли автоматично. Якщо перевірку виконати
  неможливо без доступу до GitHub, познач це як обмеження та наведи виконані
  локальні перевірки.
