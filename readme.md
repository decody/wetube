# Wetube with VanillaJS and NodeJS

### Node.js 프로젝트 설치
```bash
npm init
```

### git 설치
```bash
git init
```

검색
gitignore nodejs

https://github.com/github/gitignore/blob/master/Node.gitignore

### express 서버 설치
```bash
npm install express
```

서버 생성 -> route 생성 -> 전송에 대한 응답 처리

### Babel 패키치 설치
ES6를 ES5로 변환하거나 하위 버전에서 호환가능하게 하는 자바스립트 컴파일러

```bash
npm instal @babel/core
npm install @babel/node
npm install @babel/preset-env
```

`.babelrc` 파일 생성


### nodemon 설치
`npm start`로 서버 기동을 수동으로 하지 않고, 소스에서 수정하면 자동 재시작하게 지원하는 패키지
`live-server`나 `light-server`와 같은 역할
```bash
npm install nodemon
```

### express middleware
middleware는 양쪽을 연결하여 데이터를 주고 받을 수 있도록 중간에서 매개 역할릏 해줌.
Express에서 미들웨어 함수는 요청(req), 응답(res), 애플리케이션의 요청-응답 주기 중 그 다음 미들웨어 함수에 대한 엑세스 권한을 가지고, next라는 변수로 표시된다.
express 서버는 수많은 middleware를 가지고 있고, 

### morgan 미들웨어 설치
log를 기록
```bash
npm install morgan
```
### helmet 미들웨어 설치
보안
```bash
npm install helmet
```

### body-parser/cookie-parser 미들웨어 설치
body-parser: form으로 전송된 POST request 데이터를의 body로부터 정보를 추출함
cookie-parser: 요청된 쿠키를 추출함

```bash
npm install body-parser
npm install cookie-parser
```

### index.js 파일 init.js로 파일로 변경

### userRouter

### MVC
M: Data
V: how does the data look (데이터가 어떻게 생겼는지)
C: function that looks for the data (데이터를 보여주는 함수)


### route 경로 변수 처리

### controllers 폴더 생성
대개 각 모델마다 컨트롤러를 만듬
video, 비디오를 업로드할 users
어떤 일이 어떻게 발생하는지에 관한 

### Pug : View를 담당
- Pug: 템플릿 언어, express의 view engine
- controller에서 res.send로 Join을 전송을 대신함
```bash
npm install pug
```
`/views/layouts/main.png`에서 모든 페이지의 베이스 html을 만듬
`block content` 영역에 모든 컨텐츠들이 배치됨.
불러오는 페이지에서 `extends layouts/main` 선언

`partials`는 페이지의 일부분

### middlewares.js
locals 기능을 통해 global 변수로 사용

`res.render()`의 첫번째 인자는 템플릿, 두번째 인자는 템플릿에 추가할 정보 객체

### GET /POST
컨트롤더도 query에 접근하려면 method가 get이어야 함. method=get은 주소창에 문자열이 보임


### Pages

- [x] Home
- [x] Join
- [x] Login
- [x] Search
- [ ] User Detail
- [x] Edit Profile
- [x] Change Password
- [x] Upload
- [ ] Video Detail
- [x] Edit Video

### HTTP 상태코드 status code
https://developer.mozilla.org/ko/docs/Web/HTTP/Status
- 200: OK
- 204: No Content
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found

### MongoDB
Mongodb 설치: `https://javacpro.tistory.com/64` 참고

1. Windows 10 MongoDB Community Server (*.MSI) 버전 다운로드 설치. 설치시 compass는 언체크드
2. 시스템 환경변수 추가 `mongoDB설치경로\bin`
3. commond 모드에서 mongod 입력 확인 `c:\data\db\` 폴더 추가
4. `mongod --help`를 치면 `dbpath`를 설정할 수 있음
5. `mongod --dbpath arg` 입력. `arg`는 경로가 적힌 파라미터

mongoDB는 document를 줄여주며, document는 JSON 파일임

### mongoose
mongoose는 mongodb와 연결시켜주는 ORM
`npm install mongoose`

### dotenv
`npm install dotenv`
`.env` 파일 생성
`.gitignore`에도 파일 추가
배포된 url에 노출되지 말아야할 정보를 숨길 때 사용


### File Upload
`npm install multer`

### async / await

### eslint
`npm install eslint`
`eslint --init`
root에 `.eslintrc.js` 자동 생성됨.
Airbnb 같은 큰 회사들은 코딩 스타일 룰이 있고 formatter를 가지고 있음.
`npm install eslint-plugin-prettier`

### Regular Expression
search 기능 구현
https://regex101.com

### Webpack
모듈 번들러
설치 `npm install webpack webpack-cli`
번들링 `npm rum dev:assets`

SCSS를 위한 설치
`@next`는 최신버전
`npm install extract-text-webpack-plugin@next` 
SCSS 컴파일하기 위한 설치
POST CSS는 prefix를 처리하기 위한 패키지
`npm install css-loader postcss-loader sass-loader`
windows에서 `WEBPACK_ENV`를 설정하여 mode의 문자열에 'development'와 같이 맨 뒤 공백 제러를 해야 함
"dev:assets": "set WEBPACK_ENV=development&&webpack",
"build:assets": "set WEBPACK_ENV=production&&webpack"
`npm install autoprefixer` 설치
`npm install node-sass` 설치
`npm install babel-loader` 설치
`npm install @babel/polyfill` 설치

처음 불러오는 html 파일에 웹팩으로 컴파일된 static js파일 추가 


### Passport
사용자 인증을 구현하는 미들웨어
Passport가 사용자 인증 cookie를 가져와 인증완료된 User object를 controller에 넘겨줌.

User.js Model 생성
`npm install passport`
`npm install passport-local`
username과 password를 쓰는 사용자 인증 방식(strategy)
`npm install passport-local-mongoose`


passport.js 생성

### Session
`randomkeygen.com`
`npm install express-session`

Join 하고 나서 웹브라우저 id 저장을 누르면 개발자모드에서 Application 탭의 Storage의 Cookies 정보 connect.sid의 쿠키를 확인할 수 있음

### MongoStore
cookie를 저장
`npm install connect-mongo`


### onlyPublic / onlrPrivate 미들웨어에 추가
cookie에 저장된 user가 `/join` 같은 router를 통해서 가지 못하게 제어
onlyPublic과 onlyPrivate 미들웨어 접근 제어를 하고 나서 next()로 넘김

### Github 인증
`npm install passport-github`

Github > Settings > Developer settings > OAuth Apps 페이지에서 OAuth 추가
Authorization callback URL에 `http://localhost:4000/auth/github/callback` 기입
.env에 `GITHUB_ID`와 `GITHUB_SECRET` 환경설정 추가

github website (auth) -> github website (auth) -> /auth/github/callback
githubLoginCallback (profile)
    => cb(null, user)

    cookie = makeCookie(user)
    saveldCookie = saveCookie(cookie)
    sendCookie(savedCookie)

### Facebook 인증  
`https://developers.facebook.com/` > My Apps > Create a New App ID
Display Name: wetute, Contact Email 입력
Site URL: http://localhost:4000/

대시보드에서 앱 ID 복사
.env에서 FACEBOOK_ID, FACEBOOK_SECRET 생성
`npm install passport-facebook`설치

기본설정에서 Privacy Policy URL `http://www.passportjs.org/packages/passport-facebook/`

페이스북은 https로 설정해야 함
그래서 localtunnel 설치해야만 함
`npm install -g localtunnel`
`lt --port 4000`
`npm run tunnel`