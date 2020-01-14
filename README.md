# Электронная коллекция игр
---
# Возможности `users` :

## 1)Получение списка пользователей и поиск конкретных пользователей

  - Метод [Get](http://localhost:3000/api/#/users/get_users)
  - Путь: [/users](http://localhost:3000/users/)
  - Тело запроса (JSON): пустое
  - URL параметры:

 `query` - поиск по любой части возраста, страны.
 
или
- age - поиск по возрасту
- country - поиск по стране

Где, `query` - приоритетный параметр, а если он указан, то `age` и `country`, будут проигнорированы.
Поиск по полям `age`/`country` можно комбинировать;

Формат ответа: JSON массив с пользователями ИЛИ [ошибка](##Ошибки).
Если не указан ни один URL параметр, то будут возвращены все пользователи из базы данных `users`.

## 2)Получение пользователя по ID
- Метод: [GET](http://localhost:3000/api/#/users/get_users__userid_)
- Путь: [/users/id](http://localhost:3000/users/1)
- Тело запроса (JSON): пустое
- URL параметры: отсутствуют
- Формат ответа: JSON объект (пользователь) ИЛИ [ошибка](##Ошибки)

## 3)Добавление пользователя
- Метод: [POST](http://localhost:3000/api/#/users/post_users)
- Путь: [/users](http://localhost:3000/users)
- Тело запроса (JSON): 
    - `age` - возраст пользователя
    - `country` - страна пользователя
- URL параметры: отсутствуют
- Формат ответа: JSON объект ИЛИ [ошибка](##Ошибки)

Пример: 
```json
{
  "country": "Russia",
  "age": 16,
  "userid": 6
}
```

## 4)Редактирование пользователя
- Метод: [PUT](http://localhost:3000/api/#/users/put_users__userid_)
- Путь: [/users/id](http://localhost:3000/users/1)
- Тело запроса (JSON): 
    - `country` - страна пользователя
    - `age` - возраст пользователя 
- URL параметры: отсутствуют
- Формат ответа: JSON объект (пользователь) ИЛИ [ошибка](##Ошибки)


## 5)Удаление пользователя
- Метод: [DELETE](http://localhost:3000/api/#/users/delete_users__userid_)
- Путь: [/users/id](http://localhost:3000/users/1)
- Тело запроса (JSON): пустое
- URL параметры: отсутствуют
- Формат ответа: JSON объект с полями:
    - `affectedRows` - кол-во затронутых (удалённых) записей в базе данных
    - `ok` - успешно ли удаление (*true* или *false*)
  ИЛИ [ошибка](##Ошибки)

## 6)Тест-кейсы(cURL)
При использовании командной строки пользователь может отправить запрос и получить соответсувющий ответ.
- Поиск по ID:
curl -X GET "http://localhost:3000/users/1" -H "accept: application/json"

- Поиск по нескольким критериям:	
curl -X GET "http://localhost:3000/users?age=18&country=Poland&userid=2" -H  "accept: application/json" 

- Создание пользователя:
curl -X POST "http://localhost:3000/users" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{  \"country\": \"USA\",  \"age\": \"12\",  \"idbought\": \"1123123\"}"

- Редактирование пользователя:
curl -X PUT "http://localhost:3000/users/2" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{  \"country\": \"Poland\",  \"age\": \"20\",  \"idbought\": \"1\"}"

- Удаление пользователя из базы по ID:
curl -X DELETE "http://localhost:3000/users/3" -H  "accept: application/json"

## 7)Просмотр логов:

- Просмотр всех логов:
curl -X GET "http://localhost:3000/log" -H  "accept: application/json"

- Просмотр заданного количества логов в порядке убывания/возрастания
curl -X GET "http://localhost:3000/log?limit=5&sort=DESC" -H "accept: application/json"

## 8)Ошибки 
Представляют из себя объект с полями:
- `statusCode` - HTTP код ошибки
- `error` - соответствующий HTTP коду текст ошибки
- `message` - текст ошибки, отправленный сервисом

Например:
```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Could not find any entity of type \"Users\" matching: \"123\""}
}
```
---
# Возможности `buyGame` :

## 1)Получение списка информации по купленным играм и поиск конкретных записей по покупке

  - Метод [Get](http://localhost:3000/api/#/buyGame/get_buyGame)
  - Путь: [/buyGame](http://localhost:3000/buyGame/)
  - Тело запроса (JSON): пустое
  - URL параметры:

 `query` - поиск по любой части возраста, страны.
 
или
- gameid - поиск по идентификатору игры
- userid - поиск по идентификатору пользователя

Где, `query` - приоритетный параметр, а если он указан, то `gameid` и `userid`, будут проигнорированы.
Поиск по полям `gameid`/`userid` можно комбинировать;

Формат ответа: JSON массив с информацией по купленной игре ИЛИ [ошибка](##Ошибки.).
Если не указан ни один URL параметр, то будут возвращены весь список информации по купленным играм из базы данных `buyGame`.

## 2)Получение информации по купленной игре по ID
- Метод: [GET](http://localhost:3000/api/#/buyGame/get_buyGame__idbought_)
- Путь: [/buyGame/id](http://localhost:3000/buyGame/1)
- Тело запроса (JSON): пустое
- URL параметры: отсутствуют
- Формат ответа: JSON объект (информация по купленной игре) ИЛИ [ошибка](##Ошибки.)

## 3)Добавление информации по купленной игре
- Метод: [POST](http://localhost:3000/api/#/buyGame/post_buyGame)
- Путь: [/buyGame](http://localhost:3000/buyGame)
- Тело запроса (JSON): 
    - `gameid` - идентификатор игры
    - `userid` - идентификатор пользователя
- URL параметры: отсутствуют
- Формат ответа: JSON объект ИЛИ [ошибка](##Ошибки.)

Пример: 
```json
{
  "gameid": 101,
  "userid": 1,
  "idbought": 5,
  "databought": "2020-01-13T12:31:55.000Z"
}
```

## 4)Редактирование информации по купленной игре
- Метод: [PUT](http://localhost:3000/api/#/buyGame/put_buyGame__idbought_)
- Путь: [/buyGame/id](http://localhost:3000/buyGame/1)
- Тело запроса (JSON): 
    - `gameid` - идентификатор игры
    - `userid` - идентификатор пользователя
- URL параметры: отсутствуют
- Формат ответа: JSON объект (пользователь) ИЛИ [ошибка](##Ошибки.)


## 5)Удаление пользователя
- Метод: [DELETE](http://localhost:3000/api/#/buyGame/delete_buyGame__idbought_)
- Путь: [/buyGame/id](http://localhost:3000/buyGame/1)
- Тело запроса (JSON): пустое
- URL параметры: отсутствуют
- Формат ответа: JSON объект с полями:
    - `affectedRows` - кол-во затронутых (удалённых) записей в базе данных
    - `ok` - успешно ли удаление (*true* или *false*)
  ИЛИ [ошибка](##Ошибки.)

## 6)Тест-кейсы(cURL)
При использовании командной строки пользователь может отправить запрос и получить соответсувющий ответ.

- Поиск по ID:
curl -X GET "http://localhost:3000/buyGame/3" -H  "accept: application/json"

- Поиск по нескольким критериям:
curl -X GET "http://localhost:3000/buyGame?databought=1999-06-28&gameid=111&idbought=3" -H  "accept: application/json"

- Создание поля с информацией о покупке игры:
curl -X POST "http://localhost:3000/buyGame" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{  \"gameid\": \"228\",  \"databought\": \"2019-12-07\"}"

- Редактирование поля с информацией о покупке игры:
curl -X PUT "http://localhost:3000/buyGame/2" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{  \"gameid\": \"138\",  \"databought\": \"1999-06-28\"}"

- Удаление поля с информацией о покупке игры:
curl -X DELETE "http://localhost:3000/buyGame/5" -H  "accept: application/json"

## 7)Просмотр логов:

- Просмотр всех логов:
curl -X GET "http://localhost:3000/log" -H  "accept: application/json"

- Просмотр заданного количества логов в порядке убывания/возрастания
curl -X GET "http://localhost:3000/log?limit=5&sort=DESC" -H "accept: application/json"

## 8)Ошибки.
Представляют из себя объект с полями:
- `statusCode` - HTTP код ошибки
- `error` - соответствующий HTTP коду текст ошибки
- `message` - текст ошибки, отправленный сервисом

Например:
```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Could not find any entity of type \"BuyGame\" matching: \"123\""}
}
```
---
# Возможности `games` :

## 1)Получение списка игр и поиск конкретных игр

  - Метод [Get](http://localhost:3000/api/#/games/get_games)
  - Путь: [/games](http://localhost:3000/games/)
  - Тело запроса (JSON): пустое
  - URL параметры:

 `query` - поиск по любой части возраста, страны.
 
или
- releasedate - поиск по дате релиза игры
- gameprice - поиск по цене игры
- gamename - поиск по названию игры
- countrylist - поиск по списку стран, для которых была разработана игра
- recommendedage - поиск по рекомендованному возрасту для игры

Где, `query` - приоритетный параметр, а если он указан, то `releasedate`, `gameprice`, `gamename`, `countrylist`, `recommendedage` будут проигнорированы.
Поиск по полям `releasedate`/`gameprice`/`gamename`/`countrylist`/`recommendedage` можно комбинировать;

Формат ответа: JSON массив с игрой ИЛИ [ошибка](##Ошибки).
Если не указан ни один URL параметр, то будут возвращены все пользователи из базы данных `games`.

## 2)Получение игры по ID
- Метод: [GET](http://localhost:3000/api/#/games/get_games__gameid_)
- Путь: [/games/id](http://localhost:3000/games/1)
- Тело запроса (JSON): пустое
- URL параметры: отсутствуют
- Формат ответа: JSON объект (игра) ИЛИ [ошибка](##Ошибки)

## 3)Добавление игры
- Метод: [POST](http://localhost:3000/api/#/games/post_games)
- Путь: [/games](http://localhost:3000/games)
- Тело запроса (JSON): 
    - `releasedate` - дата релиза игры
    - `gameprice` - цена игры
    - `gamename` - название игры
    - `countrylist` - список стран, для которых была разработана игра
    - `recommendedage` - рекомендованный возраст для игры

- URL параметры: отсутствуют
- Формат ответа: JSON объект ИЛИ [ошибка](##Ошибки)

Пример: 
```json
{
  "countrylist": "Russia",
  "gamename": "Age of Empires ll",
  "releasedate": "1999-06-28",
  "recommendedage": "14",
  "gameprice": "69"
}
```

## 4)Редактирование игры
- Метод: [PUT](http://localhost:3000/api/#/games/put_games__gameid_)
- Путь: [/games/id](http://localhost:3000/games/1)
- Тело запроса (JSON): 
    - `country` - Страна пользователя
    - `age` - Возраст пользователя 
- URL параметры: отсутствуют
- Формат ответа: JSON объект (игра) ИЛИ [ошибка](##Ошибки)


## 5)Удаление игры
- Метод: [DELETE](http://localhost:3000/api/#/games/delete_games__gameid_)
- Путь: [/games/id](http://localhost:3000/games/1)
- Тело запроса (JSON): пустое
- URL параметры: отсутствуют
- Формат ответа: JSON объект с полями:
    - `affectedRows` - кол-во затронутых (удалённых) записей в базе данных
    - `ok` - успешно ли удаление (*true* или *false*)
  ИЛИ [ошибка](##Ошибки)

## 6)Тест-кейсы(cURL)
При использовании командной строки пользователь может отправить запрос и получить соответсувющий ответ.

- Поиск по ID:
curl -X GET "http://localhost:3000/games/1" -H  "accept: application/json"

- Поиск по нескольким критериям:
curl -X GET "http://localhost:3000/games?releasedate=1999-06-28&gameprice=69&gamename=Age%20of%20Empires%20ll&countrylist=Russia&recommendedage=14&gameid=1" -H  "accept: application/json"

- Создание поля с информацией о игре:
curl -X POST "http://localhost:3000/games" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{  \"countrylist\": \"Russia\",  \"gamename\": \"Age of Empires ll\",  \"releasedate\": \"1999-06-28\",  \"recommendedage\": \"14\",  \"gameprice\": \"69\"}"

- Редактирование поля с информацией о игре:
curl -X PUT "http://localhost:3000/games/1" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{  \"countrylist\": \"Russia\",  \"gamename\": \"Age of Empires lll\",  \"releasedate\": \"1999-06-28\",  \"recommendedage\": \"16\",  \"gameprice\": \"79\"}"

- Удаление поля с информацией о игре по ID:
curl -X DELETE "http://localhost:3000/games/1" -H  "accept: application/json"

## 7)Просмотр логов:

- Просмотр всех логов:
curl -X GET "http://localhost:3000/log" -H  "accept: application/json"

- Просмотр заданного количества логов в порядке убывания/возрастания
curl -X GET "http://localhost:3000/log?limit=5&sort=DESC" -H "accept: application/json"

## 8)Ошибки
Представляют из себя объект с полями:
- `statusCode` - HTTP код ошибки
- `error` - соответствующий HTTP коду текст ошибки
- `message` - текст ошибки, отправленный сервисом

Например:
```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Could not find any entity of type \"Games\" matching: \"123\""}
}
```
