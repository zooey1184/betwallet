# score

## 文档地址
 https://iodocs.betradar.com/#/Static%20sport%20event%20information/tournamentSchedule

### Development
```bash
$ npm i
$ npm run dev
$ open http://localhost:7020/
```


## 查看赛事举办方的列表，如LCS/PSC等
```js
method: GET
url: /v2/query/competitionName
params: ''
req: http://47.242.226.50:7020/v2/query/competitionName
```

## 查看所有比赛
```js
  method: GET
  url: /v2/query/matches
  params: ''
  req: http://47.242.226.50:7020/v2/query/matches

  这里返回的id，是比赛id，oddsId才是盘口id，如果要在列表页直接下单，注意传给链上的盘口id，必须是oddsId
```

## 查询指定比赛的赔率
```js
  method: GET
  url: /v2/query/match/odds/:id      -- id 为/v2/query/matches返回的id值
  req: http://47.242.226.50:7020/v2/query/match/odds/:id

  这里返回的id，是盘口Id，传给链上的盘口id，是 id

```

## 保存钱包和奖池的关系
```js
  method: POST
  url: /v2/save/tenant
  params: 
    wallet: 钱包地址
    tenant: 租户id、即：邀请码
  req: http://47.242.226.50:7020/v2/save/tenant
```

## 创建奖池
```js
  method: POST
  url: /v2/create/tenant
  params: 
    wallet: 钱包地址
    tenant: 租户id、即：邀请码
  req: http://47.242.226.50:7020/v2/save/tenant
```

## 查询当前钱包地址关联的奖池，即邀请码，需要传递给链上
```js
  method: GET
  url: /v2/query/tenant
  params: 
    wallet: 钱包地址
  req: http://47.242.226.50:7020/v2/query/tenant
```

## 下单-预校验，是否允许本次下单
```js
  method: POST
  url: /v2/bet/order/preCheck
  params: 
    直接传递 - 链上数据
  req: http://47.242.226.50:7020/v2/bet/order/preCheck
```

## 取合约配置信息
```js
  method: GET
  url: /v1/contract/getConfig
  req: http://47.242.226.50:7020/v1/contract/getConfig
```

## 取质押信息
```js
  method: GET
  url: /v1/contract/getBonusInfo
  req: http://47.242.226.50:7020/v1/contract/getBonusInfo
```

## 取banner信息
```js
  method: GET
  url: /v1/system/getBannerList
  req: http://47.242.226.50:7020/v1/system/getBannerList
```


## 合约交互
## bet合约下注调用
```contract
  method: bet
  params:
  uint256 marketId   盘口id
  address betPool    奖池
  uint256 amount     下注数量
  uint8 betSide      下注队伍 0:Side 主队,1:Side 客队,2:Equal 平
  uint256 minOdds    最小接受的赔率 (当前赔率*(100-滑点))
```

## 创建奖池
```contract
  method: createFundPool
  params:
  uint256 amount     初始奖池金额
```

## 提取奖池金额
```contract
  method: claimFundPool
  params: 无
```