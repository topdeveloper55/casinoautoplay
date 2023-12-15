"use strict";(self.webpackChunkmantis_material_react=self.webpackChunkmantis_material_react||[]).push([[857],{3857:(e,n,a)=>{a.r(n),a.d(n,{default:()=>r});var t=a(7313),s=a(1387),i=(a(8282),a(6417));let l=null;const r=()=>{const[e,n]=(0,t.useState)(""),[a,r]=(0,t.useState)(0),[o,d]=(0,t.useState)(0),[m,c]=(0,t.useState)(1),[u,p]=(0,t.useState)(""),[y,h]=(0,t.useState)([]),_=(0,t.useRef)(""),g=(0,t.useRef)(1),x=(0,t.useRef)(""),v=(0,t.useRef)(0),f=(0,t.useRef)(0);let b="",N=[],j=0,D="",w=1,G="";const T=()=>{var e,n,a;return e=0,n=24,a=25,function(e){for(let n=e.length-1;n>0;n--){const a=Math.floor(Math.random()*(n+1));[e[n],e[a]]=[e[a],e[n]]}return e}(Array.from({length:n-e+1},((n,a)=>a+e))).slice(0,a)};const S=e=>{l.send(JSON.stringify({id:"08ed3549-b044-438f-99c6-acd355d070f1",payload:{query:"mutation ($_id: ID!, $tilesToUncover: [Int!]!) {\n  minesUncoverTiles(_id: $_id, tilesToUncover: $tilesToUncover) {\n    __typename\n    ... on SinglePlayerGameBet {\n      id\n      isWin\n      multiplier\n      profit\n      amount\n      details {\n        ... on MinesGameDetails {\n          __typename\n          mines\n          uncovered\n          minesCount\n        }\n        ... on TowerGameDetails {\n          __typename\n        }\n        ... on DiceGameDetails {\n          __typename\n        }\n        ... on TargetGameDetails {\n          __typename\n        }\n        ... on HiloGameDetails {\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on SinglePlayerGameBetInProgress {\n      _id\n      amount\n      details {\n        ... on MinesGameDetails {\n          __typename\n          mines\n          uncovered\n          minesCount\n        }\n        ... on TowerGameDetails {\n          __typename\n        }\n        ... on DiceGameDetails {\n          __typename\n        }\n        ... on TargetGameDetails {\n          __typename\n        }\n        ... on HiloGameDetails {\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n  }\n}",variables:{tilesToUncover:[parseInt(e.random[j])],_id:e.playId}},type:"subscribe"}))},k=e=>{let n="";for(let a=0;a<e.length;a++)n=n+e[a]+",";return n};return(0,t.useEffect)((()=>(l=new WebSocket("wss://bch.games/api/graphql","graphql-transport-ws"),l.onopen=()=>{l.send(JSON.stringify({type:"connection_init"}))},l.onmessage=n=>{const a=JSON.parse(n.data);if("0d7d8090-9791-11ee-b9d1-0242ac120002"===a.id&&a.payload)D=a.payload.data.authenticate.username;else if("3f2c35f1-dad2-4651-aac8-89f2fe69cc45"===a.id&&a.payload){if(console.log("response----\x3e",a),a.payload.errors&&"INSUFFICIENT_FUNDS_ERROR"===a.payload.errors[0].message)(0,s.Am)("Not enough BCH",{hideProgressBar:!1,autoClose:2e3,type:"error"});else if(a.payload.data.playMines){b=a.payload.data.playMines._id;const e=T();N=e,S({random:e,playId:a.payload.data.playMines._id})}}else"08ed3549-b044-438f-99c6-acd355d070f1"===a.id&&a.payload&&(null===a.payload.data.minesUncoverTiles.details.mines?(j++,S({random:N,playId:b})):null!==a.payload.data.minesUncoverTiles.details.mines&&(h((e=>[...e,{username:D,data:a.payload.data.minesUncoverTiles}])),w<g.current&&(console.log("usertoken 1111->",u),console.log("----------\x3e useeffect",w),console.log("userId----\x3e",e),j=0,l.send(JSON.stringify({id:"0d7d8090-9791-11ee-b9d1-0242ac120002",payload:{query:'{\n  authenticate(\n    authToken: \n"'+_.current+'"\n  ) {\n    _id\n    username\n    authToken\n    email\n    twoFactorEnabled\n    role\n    countryBlock\n    __typename\n  }\n}',variables:{}},type:"subscribe"})),setTimeout((()=>{l.send(JSON.stringify({id:"3f2c35f1-dad2-4651-aac8-89f2fe69cc45",payload:{query:"mutation ($amount: Float!, $autoCashout: Boolean, $clientSeed: String!, $mines: Int!, $tilesToUncover: [Int!]) {\n  playMines(\n    amount: $amount\n    autoCashout: $autoCashout\n    clientSeed: $clientSeed\n    mines: $mines\n    tilesToUncover: $tilesToUncover\n  ) {\n    __typename\n    ... on SinglePlayerGameBet {\n      id\n      isWin\n      multiplier\n      profit\n      amount\n      details {\n        ... on MinesGameDetails {\n          __typename\n          mines\n          uncovered\n          minesCount\n        }\n        ... on TowerGameDetails {\n          __typename\n        }\n        ... on DiceGameDetails {\n          __typename\n        }\n        ... on TargetGameDetails {\n          __typename\n        }\n        ... on HiloGameDetails {\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on SinglePlayerGameBetInProgress {\n      _id\n      amount\n      details {\n        ... on MinesGameDetails {\n          __typename\n          mines\n          uncovered\n          minesCount\n        }\n        ... on TowerGameDetails {\n          __typename\n        }\n        ... on DiceGameDetails {\n          __typename\n        }\n        ... on TargetGameDetails {\n          __typename\n        }\n        ... on HiloGameDetails {\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n  }\n}",variables:{mines:parseInt(f.current),amount:parseInt(v.current),clientSeed:x.current}},type:"subscribe"}))}),1e3),w++)))},()=>{l&&l.close()})),[]),(0,t.useEffect)((()=>{_.current=u,g.current=m,x.current=e,v.current=a,f.current=o}),[u,m,o,a,e]),(0,i.jsxs)("div",{className:"w-screen",children:[(0,i.jsxs)("div",{className:"inline-flex mb-3",children:[(0,i.jsx)("div",{className:"flex items-center justify-center mr-[70px]",children:(0,i.jsx)("div",{className:"text-[20px]",children:"UserId"})}),(0,i.jsx)("input",{className:"items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100",onChange:function(e){n(e.target.value)}})]}),(0,i.jsxs)("div",{className:"inline-flex w-full mb-3",children:[(0,i.jsx)("div",{className:"flex items-center justify-center mr-[32px]",children:(0,i.jsx)("div",{className:"text-[20px]",children:"UserToken"})}),(0,i.jsx)("input",{className:"items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100",onChange:function(e){p(e.target.value)}})]}),(0,i.jsxs)("div",{className:"inline-flex w-full mb-5",children:[(0,i.jsx)("div",{className:"flex items-center mr-[58px]",children:(0,i.jsx)("div",{className:"text-[20px]",children:"Amount"})}),(0,i.jsx)("input",{className:"items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100",onChange:function(e){r(e.target.value)}})]}),(0,i.jsxs)("div",{className:"inline-flex w-full mb-5",children:[(0,i.jsx)("div",{className:"flex items-center mr-[11px]",children:(0,i.jsx)("div",{className:"text-[20px]",children:"Play Number"})}),(0,i.jsx)("input",{className:"items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100",onChange:function(e){c(parseInt(e.target.value))}})]}),(0,i.jsxs)("div",{className:"inline-flex w-full mb-5",children:[(0,i.jsx)("div",{className:"flex items-center mr-[20px]",children:(0,i.jsx)("div",{className:"text-[20px]",children:"Mines"})}),(0,i.jsx)("input",{className:"items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100",onChange:function(e){d(e.target.value)}}),(0,i.jsx)("button",{className:"rounded-full bg-gray-300 hover:bg-gray-500 ml-3",onClick:()=>{(async()=>{""===e?(0,s.Am)("Please input UserID",{hideProgressBar:!1,autoClose:2e3,type:"error"}):0===a?(0,s.Am)("Please input Amount",{hideProgressBar:!1,autoClose:2e3,type:"error"}):0===o?(0,s.Am)("Please input Dividing",{hideProgressBar:!1,autoClose:2e3,type:"error"}):""===u?(0,s.Am)("Please input userToken",{hideProgressBar:!1,autoClose:2e3,type:"error"}):(w=0,G=e,l&&(setTimeout((()=>{l.send(JSON.stringify({id:"0d7d8090-9791-11ee-b9d1-0242ac120002",payload:{query:'{\n  authenticate(\n    authToken: \n"'+u+'"\n  ) {\n    _id\n    username\n    authToken\n    email\n    twoFactorEnabled\n    role\n    countryBlock\n    __typename\n  }\n}',variables:{}},type:"subscribe"}))}),1e3),setTimeout((()=>{l.send(JSON.stringify({id:"3f2c35f1-dad2-4651-aac8-89f2fe69cc45",payload:{query:"mutation ($amount: Float!, $autoCashout: Boolean, $clientSeed: String!, $mines: Int!, $tilesToUncover: [Int!]) {\n  playMines(\n    amount: $amount\n    autoCashout: $autoCashout\n    clientSeed: $clientSeed\n    mines: $mines\n    tilesToUncover: $tilesToUncover\n  ) {\n    __typename\n    ... on SinglePlayerGameBet {\n      id\n      isWin\n      multiplier\n      profit\n      amount\n      details {\n        ... on MinesGameDetails {\n          __typename\n          mines\n          uncovered\n          minesCount\n        }\n        ... on TowerGameDetails {\n          __typename\n        }\n        ... on DiceGameDetails {\n          __typename\n        }\n        ... on TargetGameDetails {\n          __typename\n        }\n        ... on HiloGameDetails {\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on SinglePlayerGameBetInProgress {\n      _id\n      amount\n      details {\n        ... on MinesGameDetails {\n          __typename\n          mines\n          uncovered\n          minesCount\n        }\n        ... on TowerGameDetails {\n          __typename\n        }\n        ... on DiceGameDetails {\n          __typename\n        }\n        ... on TargetGameDetails {\n          __typename\n        }\n        ... on HiloGameDetails {\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n  }\n}",variables:{mines:parseInt(o),amount:parseInt(a),clientSeed:e}},type:"subscribe"}))}),2e3)))})()},children:(0,i.jsx)("div",{className:"mx-[20px]",children:"Play"})})]}),0!=y.length?(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:"table text-[15px] w-full",children:[(0,i.jsx)("div",{className:"table-header-group",children:(0,i.jsxs)("div",{className:"table-row",children:[(0,i.jsx)("div",{className:"table-cell text-left",children:"No"}),(0,i.jsx)("div",{className:"table-cell text-left",children:"User"}),(0,i.jsx)("div",{className:"table-cell text-left",children:"Profit"}),(0,i.jsx)("div",{className:"table-cell text-left",children:"Mines"}),(0,i.jsx)("div",{className:"table-cell text-left",children:"Uncovered"}),(0,i.jsx)("div",{className:"table-cell text-left",children:"Multiplier"}),(0,i.jsx)("div",{className:"table-cell text-left",children:"Id"})]})}),(0,i.jsx)("div",{className:"table-row-group",children:y.map(((e,n)=>(0,i.jsxs)("div",{className:"table-row",children:[(0,i.jsx)("div",{className:"table-cell",children:n+1}),(0,i.jsx)("div",{className:"table-cell",children:e.username}),(0,i.jsx)("div",{className:"table-cell",children:e.data.profit}),(0,i.jsx)("div",{className:"table-cell",children:(0,i.jsx)("div",{children:k(e.data.details.mines)})}),(0,i.jsx)("div",{className:"table-cell",children:(0,i.jsx)("div",{children:k(e.data.details.uncovered)})}),(0,i.jsx)("div",{className:"table-cell",children:e.data.multiplier}),(0,i.jsx)("div",{className:"table-cell",children:e.data.id})]},n)))})]})}):null,(0,i.jsx)(s.Ix,{})]})}}}]);