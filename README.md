# English Version Below!

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
* 컨트렉트 배포용 스크립트 및 proxy pattern(Transparent Proxy Pattern)을 적용하기위해 사용
Node
- Alchemy
* Rinkeby network RPC node로서 사용

Test
- Chai
* Test driven developement 환경으로서 사용
- Typechain
* Soldity파일을 ABI형태로 만들어주어 테스트에 사용




## Requirements

사용언어 : Javascript(선택사항 : Typescript)
컨트랙트 작성 언어 : Solidity (선택사항 : Upgradeable Contract)
자동 빌드 & 배포 스크립트
README

## Installation or Getting Started

프로젝트 코드 :

git clone https://github.com/dongwookang95/ERC20_MultiTransaction.git , 혹은 이메일 첨부

Show how to use the project or library.

1. Depencency 설치
```
npm install
```

2. 필요에 따라 client 폴더 내부에 있는 example.csv파일 수정 .

3. 코드 실행 
```
ts-node client/transaction.ts
```

4. 테스트 코드 실행 
```
npx hardhat test
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

# MULTI-TRANSACTION CONTRACT FOR ERC20 TOKEN 

Development Objective - A contract which can send a ERC20 token to multiple addresses with one transaction.

## Main Libraries / Frameworks

Client
- Typescript 
* CSV file reader / Setting variable's type
- Ethers.js
* Interact with contract ABI

Contract 
- Openzeppelin(ERC20)
* Secure ERC20 Contract and Proxy contract standards
- Solhint
* linting tool as a Solidity code formatter
- Typescript
* Deploy contract and applying proxy pattern(Transparent Proxy Pattern)

Node
- Alchemy
* RPC node for Rinkeby network 

Test
- Chai
* Test driven developement environment
- Typechain
* Generate ABI file from Solidity in order to facilitate the test for contracts



## Requirements

Languague : Javascript(Optional : Typescript)
Contract Language: Solidity (Optional : Upgradeable Contract)
README

## Installation or Getting Started

프로젝트 코드 :

git clone https://github.com/dongwookang95/ERC20_MultiTransaction.git 

Show how to use the project or library.

1. Install Depencency 
```
npm install
```

2. Update client/example.csv as it is required. 

3. Execute client script
```
ts-node client/transaction.ts
```

4. Execute test script
```
npx hardhat test
```

Contract re-deploy
1. Remove artifacts and cache
```
npx hardhat clean
```

2. Create ABI and artifacts according to the change 
```
npx hardhat compile
```

3. Deploy Script 
```
npx hardhat run scripts/deploy.ts --network rinkeby
```

4. Edit the contract addresses in .env file and run the script
```
ts-node client/transaction.ts
```

Contract upgrade

1. Check if multiTransV1ADDRESS has current V1 contract address

2. Run following script in order to point the proxy to V2
```
npx hardhat run scripts/upgradeDeploy.ts --network rinkeby
```
3. Possible to re-use for V3, V4 ...

## Reference

1. CPToken Contract Address : 0xe8D67e5914c14bACb7A419232A6c9baa2c65B515

2. MultiTransaction Contract Address : 0xAb486e28Fd1391851c9C8045Df148575e6deDbcC

3. CPToken verified Address : https://rinkeby.etherscan.io/address/0xe8D67e5914c14bACb7A419232A6c9baa2c65B515#code

4. MultiTransaction verified Address : https://rinkeby.etherscan.io/address/0xAb486e28Fd1391851c9C8045Df148575e6deDbcC#code

5. Successful MultiTransection Hash Address : https://rinkeby.etherscan.io/tx/0xdf52c1291fcb2be40068fd7be4d63f8866cfdc3b393cc7543225caae282ef5f9



## Update Note

04/Apr/2022 : 
Adding scripts/deploy_revise.ts, scripts/deployV2_revise.ts, contacts/multiTransactionV2.sol.
Edit MultiTransaction.sol

