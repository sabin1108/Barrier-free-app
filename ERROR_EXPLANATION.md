# 오류 설명: "null value in column 'name' violates not-null constraint"

## 1. 오류 내용
서버 로그에 다음과 같은 에러가 발생했습니다:
> `error: null value in column "name" of relation "users" violates not-null constraint`

## 2. 무슨 뜻인가요?
- **"relation 'users'"**: 데이터베이스의 **회원(users) 테이블**에서 문제가 생겼습니다.
- **"column 'name'"**: 그 중에서도 **'이름(name)' 칸**이 문제입니다.
- **"violates not-null constraint"**: 이 칸은 **비어있으면 안 된다(Not Null)**는 규칙이 있는데, **빈 값(Null)**을 넣으려고 해서 에러가 났다는 뜻입니다.

## 3. 왜 발생했나요?
앱(프론트엔드)에서는 이름을 잘 보냈지만, **백엔드 서버(`server.js`)가 이름을 받아서 저장하는 코드가 빠져 있었기 때문**입니다.

- **앱(`signup.tsx`)**: `name`, `email`, `password`를 모두 보냄. (O)
- **서버(`server.js`)**: `email`, `password`만 받아서 저장함. `name`은 무시됨. (X)
- **데이터베이스**: "어? 이름이 없네? 규칙 위반!" -> **에러 발생**

## 4. 해결 방법
백엔드 서버 코드(`server.js`)를 수정하여 **이름(`name`)도 받아서 데이터베이스에 같이 저장**하도록 고쳐야 합니다.

제가 바로 수정해 드리겠습니다!
