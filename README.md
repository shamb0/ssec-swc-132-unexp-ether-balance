# ssec-swc-132-unexp-ether-balance | Solidity | Security | SWC-132 | Unexpected Ether balance

---

## Reference

* [HackPedia: 16 Solidity Hacks/Vulnerabilities, their Fixes and Real World Examples | by vasa | HackerNoon.com | Medium](https://medium.com/hackernoon/hackpedia-16-solidity-hacks-vulnerabilities-their-fixes-and-real-world-examples-f3210eba5148)

* [SWC-132 · Overview](https://swcregistry.io/docs/SWC-132)

* [Gridlock (a smart contract bug). Edgeware’s Lockdrop smart contract has… | by Neil M | Medium](https://medium.com/@nmcl/gridlock-a-smart-contract-bug-73b8310608a9)

---

## Example-1 :: EtherGame

**Howto Install & build**

```shell
git clone https://github.com/shamb0/ssec-swc-132-unexp-ether-balance.git
cd ssec-swc-132-unexp-ether-balance
yarn install
yarn build
```

### EtherGame ( Vulnarable One )

```shell
master$ env DEBUG="info*,debug*,error*" yarn run test ./test/EtherGame.spec.ts
yarn run v1.22.4
$ yarn run test:contracts ./test/EtherGame.spec.ts
$ cross-env SOLPP_FLAGS="FLAG_IS_TEST,FLAG_IS_DEBUG" buidler test --show-stack-traces ./test/EtherGame.spec.ts
$(process.argv.length)
All contracts have already been compiled, skipping compilation.


  EtherGame Attack Test
  info:EtherGame-Test Admin :: 0x17ec8597ff92C3F44523bDc65BF0f1bE632917ff +0ms
  info:EtherGame-Test Usr1 :: 0x63FC2aD3d021a4D7e64323529a55a9442C444dA0 +0ms
  info:EtherGame-Test Usr2 :: 0xD1D84F0e28D6fedF03c73151f98dF95139700aa7 +1ms
  info:EtherGame-Test Usr3 :: 0xd59ca627Af68D29C547B91066297a7c469a7bF72 +0ms
  debug:EtherGame-Test Network Gas price @ 8000000000 +0ms
  debug:EtherGame-Test EtherGame @ 0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA +64ms
  debug:EtherGame-Test S1-Ent wallet bal :: 9.99603228 +4ms
  debug:EtherGame-Test Ethergame balance :: 0.0 +3ms
  debug:EtherGame-Test S1-Ext wallet bal :: 9.99603228 +4ms
  debug:EtherGame-Test S2-Ent wallet bal :: 9.99603228 +3ms
Info@EtherGameAttack.sol::receive ContBal(100000000000000000)
  debug:EtherGame-Test EtherGameAttack balance :: 0.1 +47ms
  debug:EtherGame-Test Attack @ 0xFDFEF9D10d929cB3905C71400ce6be1990EA0F34 +0ms
  debug:EtherGame-Test S2-Ext wallet bal :: 9.894488128 +2ms
  debug:EtherGame-Test play iter( 0 ) sindx( 2 ) +1ms
  debug:EtherGame-Test S3-Ent :: 9.894488128 +2ms
Info@EtherGame.sol::play sender(0xd1d84f0e28d6fedf03c73151f98df95139700aa7)
Info@EtherGame.sol::play value(500000000000000000)
Info@EtherGame.sol::play Cont Bal(500000000000000000)
Info@EtherGame.sol::play curr bal (1000000000000000000)
Info@EtherGame.sol::play user redeem value(0)
  debug:EtherGame-Test S3-Ext :: 9.894488128 +40ms
  debug:EtherGame-Test play iter( 1 ) sindx( 3 ) +0ms
  debug:EtherGame-Test S3-Ent :: 9.894488128 +2ms
Info@EtherGame.sol::play sender(0xd59ca627af68d29c547b91066297a7c469a7bf72)
Info@EtherGame.sol::play value(500000000000000000)
Info@EtherGame.sol::play Cont Bal(500000000000000000)
Info@EtherGame.sol::play curr bal (1000000000000000000)
Info@EtherGame.sol::play user redeem value(0)
  debug:EtherGame-Test S3-Ext :: 9.894488128 +29ms
  debug:EtherGame-Test play iter( 2 ) sindx( 2 ) +0ms
  debug:EtherGame-Test S3-Ent :: 9.894488128 +2ms
Info@EtherGame.sol::play sender(0xd1d84f0e28d6fedf03c73151f98df95139700aa7)
Info@EtherGame.sol::play value(500000000000000000)
Info@EtherGame.sol::play Cont Bal(500000000000000000)
Info@EtherGame.sol::play curr bal (1000000000000000000)
Info@EtherGame.sol::play user redeem value(0)
  debug:EtherGame-Test S3-Ext :: 9.894488128 +25ms
  debug:EtherGame-Test play iter( 3 ) sindx( 2 ) +0ms
  debug:EtherGame-Test S3-Ent :: 9.894488128 +2ms
Info@EtherGame.sol::play sender(0xd1d84f0e28d6fedf03c73151f98df95139700aa7)
Info@EtherGame.sol::play value(500000000000000000)
Info@EtherGame.sol::play Cont Bal(500000000000000000)
Info@EtherGame.sol::play curr bal (1000000000000000000)
Info@EtherGame.sol::play user redeem value(0)
  debug:EtherGame-Test S3-Ext :: 9.894488128 +20ms
    ✓ tst-item-001-Usr-play (122ms)
  debug:EtherGame-Test EtherGame balance :: 0.0 +3ms
  debug:EtherGame-Test EtherGameAttack balance :: 0.1 +2ms
  debug:EtherGame-Test S4-Ext wallet bal :: 9.894488128 +2ms
  debug:EtherGame-Test EtherGame balance :: 0.0 +65ms
  debug:EtherGame-Test EtherGameAttack balance :: 0.0 +2ms
  debug:EtherGame-Test S5-Ext wallet bal :: 9.994082032 +3ms


  1 passing (532ms)

Done in 8.01s.
```

### EtherGameFixed ( Fixed One )

```shell
master$ env DEBUG="info*,debug*,error*" yarn run test ./test/EtherGameFixed.spec.ts
yarn run v1.22.4
$ yarn run test:contracts ./test/EtherGameFixed.spec.ts
$ cross-env SOLPP_FLAGS="FLAG_IS_TEST,FLAG_IS_DEBUG" buidler test --show-stack-traces ./test/EtherGameFixed.spec.ts
$(process.argv.length)
All contracts have already been compiled, skipping compilation.


  EtherGameFixed Attack Test
  info:EtherGame-Test Admin :: 0x17ec8597ff92C3F44523bDc65BF0f1bE632917ff +0ms
  info:EtherGame-Test Usr1 :: 0x63FC2aD3d021a4D7e64323529a55a9442C444dA0 +0ms
  info:EtherGame-Test Usr2 :: 0xD1D84F0e28D6fedF03c73151f98dF95139700aa7 +0ms
  info:EtherGame-Test Usr3 :: 0xd59ca627Af68D29C547B91066297a7c469a7bF72 +0ms
  debug:EtherGame-Test Network Gas price @ 8000000000 +0ms
  debug:EtherGame-Test EtherGameFixed @ 0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA +63ms
  debug:EtherGame-Test S1-Ent wallet bal :: 9.995801008 +3ms
  debug:EtherGame-Test Ethergame balance :: 0.0 +7ms
  debug:EtherGame-Test S1-Ext wallet bal :: 9.995801008 +3ms
  debug:EtherGame-Test S2-Ent wallet bal :: 9.995801008 +3ms
Info@EtherGameAttack.sol::receive ContBal(100000000000000000)
  debug:EtherGame-Test EtherGameAttack balance :: 0.1 +44ms
  debug:EtherGame-Test Attack @ 0xFDFEF9D10d929cB3905C71400ce6be1990EA0F34 +0ms
  debug:EtherGame-Test S2-Ext wallet bal :: 9.894256856 +2ms
  debug:EtherGame-Test play iter( 0 ) sindx( 3 ) +1ms
  debug:EtherGame-Test S3-Ent :: 9.894256856 +2ms
Info@EtherGame.sol::play sender(0xd59ca627af68d29c547b91066297a7c469a7bf72)
Info@EtherGame.sol::play value(500000000000000000)
Info@EtherGame.sol::play Entry Curr Bal(0)
Info@EtherGame.sol::play curr bal (500000000000000000)
Info@EtherGame.sol::play user redeem value(0)
  debug:EtherGame-Test S3-Ext :: 9.894256856 +43ms
  debug:EtherGame-Test play iter( 1 ) sindx( 2 ) +0ms
  debug:EtherGame-Test S3-Ent :: 9.894256856 +1ms
Info@EtherGame.sol::play sender(0xd1d84f0e28d6fedf03c73151f98df95139700aa7)
Info@EtherGame.sol::play value(500000000000000000)
Info@EtherGame.sol::play Entry Curr Bal(0)
Info@EtherGame.sol::play curr bal (500000000000000000)
Info@EtherGame.sol::play user redeem value(0)
  debug:EtherGame-Test S3-Ext :: 9.894256856 +29ms
  debug:EtherGame-Test play iter( 2 ) sindx( 3 ) +0ms
  debug:EtherGame-Test S3-Ent :: 9.894256856 +2ms
Info@EtherGame.sol::play sender(0xd59ca627af68d29c547b91066297a7c469a7bf72)
Info@EtherGame.sol::play value(500000000000000000)
Info@EtherGame.sol::play Entry Curr Bal(0)
Info@EtherGame.sol::play curr bal (500000000000000000)
Info@EtherGame.sol::play user redeem value(0)
  debug:EtherGame-Test S3-Ext :: 9.894256856 +24ms
  debug:EtherGame-Test play iter( 3 ) sindx( 2 ) +0ms
  debug:EtherGame-Test S3-Ent :: 9.894256856 +3ms
Info@EtherGame.sol::play sender(0xd1d84f0e28d6fedf03c73151f98df95139700aa7)
Info@EtherGame.sol::play value(500000000000000000)
Info@EtherGame.sol::play Entry Curr Bal(0)
Info@EtherGame.sol::play curr bal (500000000000000000)
Info@EtherGame.sol::play user redeem value(0)
  debug:EtherGame-Test S3-Ext :: 9.894256856 +23ms
    ✓ tst-item-001-Usr-play (127ms)
  debug:EtherGame-Test EtherGame balance :: 0.0 +3ms
  debug:EtherGame-Test EtherGameAttack balance :: 0.1 +2ms
  debug:EtherGame-Test S4-Ext wallet bal :: 9.894256856 +3ms
  debug:EtherGame-Test EtherGame balance :: 0.0 +71ms
  debug:EtherGame-Test EtherGameAttack balance :: 0.0 +2ms
  debug:EtherGame-Test S5-Ext wallet bal :: 9.99385076 +2ms


  1 passing (533ms)

Done in 8.09s.
```

---
