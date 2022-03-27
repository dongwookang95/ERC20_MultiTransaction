# MULTI-TRANSACTION CONTRACT FOR ERC20 TOKEN 

개발목표 - 한번의 트렌젝션으로 여러 지갑 주소에 특정한 ERC20 토큰을 전송할 수 있는 컨트렉트.

## Main Libraries / Frameworks

Client
    - Typescript 
        * CSV파일 reader 및 변수 타입 설정에 사용
    - Ethers.js
        * 컨트랙트 ABI와 의사소통을 위해 사용

Contract 
    - Openzeppelin(ERC20)
        * ERC20 컨트렉트 및 Proxy 컨트렉트 스텐다드로서 활용
    - Solhint
        * linting tool과 스타일 가이드로서 사용
    - Typescript
        * 컨트렉트 배포용 스크립트 및 proxy pattern을 적용하기위해 사용
Node
    - Alchemy
        * Rinkeby network 블록 노드로 사용
Test
    - Chai
        * Test driven developement 환경으로서 사용
    - Typechain
        * Soldity파일을 artifact형태로 만들어주어 테스트에 사용


Show what the library does as concisely as possible, developers should be able to figure out **how** your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.


## Requirements

사용언어 : Javascript(선택사항 : Typescript)
컨트랙트 작성 언어 : Solidity (선택사항 : Upgradeable Contract)
자동 빌드 & 배포 스크립트
README

## Installation or Getting Started

프로젝트 코드 :

git clone https://github.com/dongwookang95/ERC20_MultiTransaction.git , 혹은 이메일 첨부

Show how to use the project or library.

Depencency 설치
```
npm install
```

필요에 따라 client 폴더 내부에 있는 example.csv파일 수정 .

코드 실행 
```
ts-node client/transaction.ts
```


컨트렉트 코드 수정시 
1. 현재 artifacts와 cache를 먼저 제거
```
npx hardhat clean
```
2. 변경이 반영된 ABI와 artifacts를 생성
```
npx hardhat compile
```
3. Deploy 스크립트 (향후 버전2 컨트렉트를 위한 ERC1967Proxy 컨트렉트 포함)
```
npx hardhat run scripts/deploy.ts --network rinkeby
```
4. .env에서 컨트렉트 주소 수정 후 코드 재실행

컨트렉트 업그레이드

1. multiTransV1ADDRESS 변수에 현재의 컨트렉트 주소가 입력되어있는지 확인

2. V1 deploy에서 이미 Proxy contract가 포인트하고있는 V1주소를 V2주소로 옮겨주는 스크립트. 
```
npx hardhat run scripts/upgradeDeploy.ts --network rinkeby
```
3. 향후 V3, V4.. 에서도 적용 가능.

## Reference

1. CPToken 컨트렉트 주소 : 0xe8D67e5914c14bACb7A419232A6c9baa2c65B515

2. MultiTransaction 컨트렉트 주소 : 0xAb486e28Fd1391851c9C8045Df148575e6deDbcC

3. CPToken verified 주소 : https://rinkeby.etherscan.io/address/0xe8D67e5914c14bACb7A419232A6c9baa2c65B515#code

4. MultiTransaction verified 주소 : https://rinkeby.etherscan.io/address/0xAb486e28Fd1391851c9C8045Df148575e6deDbcC#code

5. Successful MultiTransection Hash 주소 : https://rinkeby.etherscan.io/tx/0xdf52c1291fcb2be40068fd7be4d63f8866cfdc3b393cc7543225caae282ef5f9

