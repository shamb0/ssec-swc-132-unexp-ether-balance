import { expect } from './setup'

/* External Imports */
import { ethers } from '@nomiclabs/buidler'
import { Contract, ContractFactory, Signer, BigNumber, utils, providers } from 'ethers'
import {
  getContractFactory, sleep, sendLT, getBalanceLT
} from './test-utils'

import { getLogger } from './test-utils'

import { GAS_LIMIT } from './test-helpers'

const log = getLogger('EtherGame-Test')

function getRandomNumberBetween( min:number , max:number ){

  return Math.floor( Math.random() * (max-min+1) + min );
}

describe('EtherGame Attack Test', () => {
  let wallet: Signer
  let usr1: Signer
  let usr2: Signer
  let usr3: Signer

  before(async () => {
    ;[wallet, usr1, usr2, usr3] = await ethers.getSigners()

    log.info(`Admin :: ${await wallet.getAddress()}`)
    log.info(`Usr1 :: ${await usr1.getAddress()}`)
    log.info(`Usr2 :: ${await usr2.getAddress()}`)
    log.info(`Usr3 :: ${await usr3.getAddress()}`)
  })

  let ethergamefact: ContractFactory
  let ethergameinst: Contract
  before(async () => {

    ethergamefact = getContractFactory( "EtherGame", wallet )

    log.debug( `Network Gas price @ ${await ethers.provider.getGasPrice()}`)

    // Deploy the implementation part of the logic
    ethergameinst = await ethergamefact.deploy();

    log.debug( `EtherGame @ ${ethergameinst.address}`)

    log.debug(`S1-Ent wallet bal :: ${ethers.utils.formatUnits(await wallet.getBalance(), "ether")}`)

    // const transamount = ethers.utils.parseUnits( "2", 18 );

    // const receipt = await wallet.sendTransaction({
    //                           to: ethergameinst.address,
    //                           value: transamount,
    //                           gasLimit: GAS_LIMIT,
    //                         })

    // await ethergameinst.provider.waitForTransaction( receipt.hash )

    const bal = await ethergameinst.provider.getBalance( ethergameinst.address );

    log.debug(`Ethergame balance :: ${ethers.utils.formatUnits( bal , "ether" )}`)

    log.debug(`S1-Ext wallet bal :: ${ethers.utils.formatUnits(await wallet.getBalance(), "ether")}`)

  })

  let attackfact: ContractFactory
  let attackinst: Contract
  before(async () => {

    try {

      log.debug(`S2-Ent wallet bal :: ${ethers.utils.formatUnits(await wallet.getBalance(), "ether")}`)

      attackfact = getContractFactory( "EtherGameAttack", wallet )

      // Deploy the implementation part of the logic
      attackinst = await attackfact.deploy( )

      const transamount = ethers.utils.parseUnits( "0.1", 18 );

      const receipt = await wallet.sendTransaction({
        to: attackinst.address,
        value: transamount,
        gasLimit: GAS_LIMIT,
      })

      await attackinst.provider.waitForTransaction( receipt.hash )

      const bal = await attackinst.provider.getBalance( attackinst.address );

      log.debug(`EtherGameAttack balance :: ${ethers.utils.formatUnits( bal , "ether" )}`)

      log.debug( `Attack @ ${attackinst.address}`)

      log.debug(`S2-Ext wallet bal :: ${ethers.utils.formatUnits(await wallet.getBalance(), "ether")}`)

    }
    catch( err ){

      log.error(`Exception Err ${err}`)

    }

  })

  it("tst-item-001-Usr-play", async () => {

      let usrAcc = [ wallet, usr1, usr2, usr3 ];

      for( let itrloop = 0; itrloop < 4; itrloop++ ){

        let signindx = getRandomNumberBetween( 1, 3 )
        // let signindx = 0

        log.debug(`play iter( ${itrloop} ) sindx( ${signindx} )`)

        try {

        log.debug(`S3-Ent :: ${ethers.utils.formatUnits( await wallet.getBalance(), "ether")}`)

        const transamount = ethers.utils.parseUnits( "0.5", 18 );

        // calldata to invoke the function pwnTimeLock
        const playCalldata = ethergameinst.interface.encodeFunctionData(
                                                          'play'
                                                          )
        await ethergameinst.provider.call({
          from: await usrAcc[signindx].getAddress(),
          to: ethergameinst.address,
          data: playCalldata,
          value: transamount,
          gasLimit: GAS_LIMIT
        })

        log.debug(`S3-Ext :: ${ethers.utils.formatUnits( await wallet.getBalance(), "ether")}`)
      }
      catch( err ){

        log.error(`Exception Err ${err}`)

      }
    }

  })


  afterEach("Test-Case End Contract Status", async () => {

    let bal = await ethergameinst.provider.getBalance( ethergameinst.address );

    log.debug(`EtherGame balance :: ${ethers.utils.formatUnits( bal , "ether" )}`)

    bal = await attackinst.provider.getBalance( attackinst.address );

    log.debug(`EtherGameAttack balance :: ${ethers.utils.formatUnits( bal , "ether" )}`)

    log.debug(`S4-Ext wallet bal :: ${ethers.utils.formatUnits(await wallet.getBalance(), "ether")}`)

  })

  afterEach("Test Done Cleanup", async () => {

    await ethergameinst.withdrawEth();
    await attackinst.withdrawEth();

    let bal = await ethergameinst.provider.getBalance( ethergameinst.address );

    log.debug(`EtherGame balance :: ${ethers.utils.formatUnits( bal , "ether" )}`)

    bal = await attackinst.provider.getBalance( attackinst.address );

    log.debug(`EtherGameAttack balance :: ${ethers.utils.formatUnits( bal , "ether" )}`)

    log.debug(`S5-Ext wallet bal :: ${ethers.utils.formatUnits(await wallet.getBalance(), "ether")}`)

  })

})
