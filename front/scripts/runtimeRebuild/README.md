## Проблема
Данные могут добавляться через админку, и в таком случае нужно обновить статику и привязать к ней скрипты/стили

## Предположительное решение
Брать пример уже сбилженного темплэйта с привязанными скриптами, вытаскивать из него скрипты и подсовывать их в новые, обновленные с помощью eleventy, страницы. Это позволит не запускать вебпак (который не потянет сервер), и не тратить время на создание более сложных вещей

По итогу:
берётся файл, откуда тырить скрипты и стили
берётся папка/папки, в которые eleventy кладёт сбилженные страницы
эти страницы обогащаются уже лежащими на сервере скриптами и подсовываются в папку, откуда они подтаскиваются на сервере

Составные части:
* Часть, которая смотрит за изменениями
* Часть, которая вытягивает скрипты и стили
* Часть, которая подставляет скрипты и стили в новые темплэйты
* Часть, которая как - то отправляет всё это на сервер (наверное, задаётся извне)

Изменения не будут влиять на сборку стилей и скриптов, поэтом 