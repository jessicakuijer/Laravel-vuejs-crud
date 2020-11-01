<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="300"></a><p align="center"><a href="https://vuejs.org/" target="_blank"><img src="https://vuejs.org/images/logo.png" width="400"></a></p><p align="center">## CRUD</p>



## Quick START / Marche à suivre pour lancer le projet:
1. Clone repository and place files into virtual host like Xampp (htdocs folder) or Laragon (www folder) // Open project into your IDE (like Visual Studio Code or Sublime Text)
2. Install Dependencies
- composer install
3. Copy .env.example to .env
- cp .env.example .env
4. in .env change DB_DATABASE by a DB name of your choice
- create your empty database with that same DB name
5. Add virtual host
- start apache and MySQL
6. Get the encryption key first!
- php artisan key:generate
7. Run DB migrations
- php artisan migrate
8. Import datas
- php artisan db:seed
9. Install JS Dependencies (and VUE js :)
- npm install
10. Watch files (let this terminal open)
- npm run watch
11. Run the application (new terminal, let it open too)
- php artisan serve
12. Go to your localhost URL web in browser
- http://localhost:8000/
13. WATCH demo !! :) and enjoy!
-  LIVE DEMO : https://youtu.be/TeGqMs4zRpc




## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
VueJS is also licensed under [MIT license](https://opensource.org/licenses/MIT) (Copyright (c) 2013-present, Yuxi (Evan) You
