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