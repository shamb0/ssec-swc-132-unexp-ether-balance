# ssec-swc-132-unexp-ether-balance | Solidity | Security | SWC-132 | Unexpected Ether balance

---

## Reference

* [HackPedia: 16 Solidity Hacks/Vulnerabilities, their Fixes and Real World Examples | by vasa | HackerNoon.com | Medium](https://medium.com/hackernoon/hackpedia-16-solidity-hacks-vulnerabilities-their-fixes-and-real-world-examples-f3210eba5148)

* [SWC-132 · Overview](https://swcregistry.io/docs/SWC-132)


* [Gridlock (a smart contract bug). Edgeware’s Lockdrop smart contract has… | by Neil M | Medium](https://medium.com/@nmcl/gridlock-a-smart-contract-bug-73b8310608a9)

---

## Example-1 :: TimeLock

**Howto Install & build**

```shell
git clone https://github.com/shamb0/ssec-swc-132-unexp-ether-balance.git
cd ssec-swc-101-int-ouflow
yarn install
yarn build
```

### TimeLock ( Vulnarable One )

```shell
master ●  env DEBUG="info*,error*,debug*" yarn run test ./test/TimeLock.spec.ts
yarn run v1.22.4
$ yarn run test:contracts ./test/TimeLock.spec.ts
$ cross-env SOLPP_FLAGS="FLAG_IS_TEST,FLAG_IS_DEBUG" buidler test --show-stack-traces ./test/TimeLock.spec.ts
$(process.argv.length)
All contracts have already been compiled, skipping compilation.


  TimeLock Attack Test
  info:TimeLock-Test Admin :: 0x17ec8597ff92C3F44523bDc65BF0f1bE632917ff +0ms
  info:TimeLock-Test Own1 :: 0x63FC2aD3d021a4D7e64323529a55a9442C444dA0 +0ms
  info:TimeLock-Test Own2 :: 0xD1D84F0e28D6fedF03c73151f98dF95139700aa7 +0ms
  debug:TimeLock-Test Network Gas price @ 8000000000 +0ms
  debug:TimeLock-Test TimeLock @ 0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA +53ms
  debug:TimeLock-Test S1-Ent wallet bal :: 9.9979632 +4ms
Info@TimeLock.sol::receive ContBal(2000000000000000000)
  debug:TimeLock-Test timelockinst balance :: 2.0 +22ms
  debug:TimeLock-Test S1-Ext wallet bal :: 7.997783024 +3ms
  debug:TimeLock-Test S2-Ent wallet bal :: 7.997783024 +4ms
Info@TimeLockAttack.sol::constructor ContBal(0)
Info@TimeLockAttack.sol::receive ContBal(2000000000000000000)
  debug:TimeLock-Test timelockattackinst balance :: 2.0 +74ms
  debug:TimeLock-Test Attack @ 0xaC8444e7d45c34110B34Ed269AD86248884E78C7 +0ms
  debug:TimeLock-Test S2-Ext wallet bal :: 5.993891928 +2ms
  debug:TimeLock-Test S3-Ent :: 5.993891928 +4ms
Info@TimeLockAttack.sol::pwnTimeLock Sender(0x17ec8597ff92c3f44523bdc65bf0f1be632917ff)
Info@TimeLockAttack.sol::pwnTimeLock Val(1000000000000000000)
Info@TimeLockAttack.sol::pwnTimeLock ContBal(3000000000000000000)
Info@TimeLockAttack.sol::pwnTimeLock ContBal(2000000000000000000)
Info@TimeLockAttack.sol::pwnTimeLock L1 timelock(1601704572)
Info@TimeLockAttack.sol::pwnTimeLock L2 timelock(0)
Info@TimeLockAttack.sol::receive ContBal(3000000000000000000)
Info@TimeLockAttack.sol::pwnTimeLock ContBal(3000000000000000000)
  debug:TimeLock-Test S3-Ext :: 5.993891928 +53ms
    ✓ tst-item-001 (56ms)
  debug:TimeLock-Test timelockinst balance :: 2.0 +3ms
  debug:TimeLock-Test attackinst balance :: 2.0 +2ms
  debug:TimeLock-Test S4-Ext wallet bal :: 5.993891928 +2ms
  debug:TimeLock-Test timelockinst balance :: 0.0 +103ms
  debug:TimeLock-Test attackinst balance :: 0.0 +2ms
  debug:TimeLock-Test S5-Ext wallet bal :: 9.99343276 +2ms


  1 passing (874ms)

Done in 14.92s.
```

#### eth flow in transaction

![](./docs/seq-eth-flow-timelock/seq-eth-flow-timelock.png)

### TimeLockFixed ( Fixed with OZ Safemath )

```shell
master ●  env DEBUG="info*,error*,debug*" yarn run test ./test/TimeLockFixed.spec.ts
yarn run v1.22.4
$ yarn run test:contracts ./test/TimeLockFixed.spec.ts
$ cross-env SOLPP_FLAGS="FLAG_IS_TEST,FLAG_IS_DEBUG" buidler test --show-stack-traces ./test/TimeLockFixed.spec.ts
$(process.argv.length)
All contracts have already been compiled, skipping compilation.


  TimeLock Attack Test
  info:TimeLock-Test Admin :: 0x17ec8597ff92C3F44523bDc65BF0f1bE632917ff +0ms
  info:TimeLock-Test Own1 :: 0x63FC2aD3d021a4D7e64323529a55a9442C444dA0 +0ms
  info:TimeLock-Test Own2 :: 0xD1D84F0e28D6fedF03c73151f98dF95139700aa7 +0ms
  debug:TimeLock-Test Network Gas price @ 8000000000 +0ms
  debug:TimeLock-Test TimeLock @ 0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA +47ms
  debug:TimeLock-Test Ent wallet bal :: 9.997716568 +3ms
Info@TimeLock.sol::receive ContBal(2000000000000000000)
  debug:TimeLock-Test timelockinst balance :: 2.0 +25ms
  debug:TimeLock-Test Ext wallet bal :: 7.997536392 +3ms
Info@TimeLockAttack.sol::constructor ContBal(0)
Info@TimeLockAttack.sol::receive ContBal(2000000000000000000)
  debug:TimeLock-Test timelockattackinst balance :: 2.0 +73ms
  debug:TimeLock-Test Attack @ 0xaC8444e7d45c34110B34Ed269AD86248884E78C7 +0ms
  debug:TimeLock-Test Enter :: 5.993645392 +3ms
Info@TimeLockAttack.sol::pwnTimeLock Sender(0x17ec8597ff92c3f44523bdc65bf0f1be632917ff)
Info@TimeLockAttack.sol::pwnTimeLock Val(1000000000000000000)
Info@TimeLockAttack.sol::pwnTimeLock ContBal(3000000000000000000)
Info@TimeLockAttack.sol::pwnTimeLock ContBal(2000000000000000000)
Info@TimeLockAttack.sol::pwnTimeLock L1 timelock(1601704625)
  error:TimeLock-Test Exception Err Error: VM Exception while processing transaction: revert SafeMath: addition overflow +0ms
  info:TimeLock-Test Time Stamp after error :: 0 +230ms
    ✓ tst-item-001 (58ms)
  debug:TimeLock-Test timelockinst balance :: 2.0 +58ms
  debug:TimeLock-Test attackinst balance :: 2.0 +2ms
  debug:TimeLock-Test wallet bal :: 5.993645392 +2ms
  debug:TimeLock-Test timelockinst balance :: 0.0 +101ms
  debug:TimeLock-Test attackinst balance :: 0.0 +2ms
  debug:TimeLock-Test wallet bal :: 9.993186224 +3ms


  1 passing (516ms)

Done in 7.99s.
```

---
