import {
  AminoConverters,
  defaultRegistryTypes,
  createDefaultAminoConverters,
  AminoTypes,
} from '@cosmjs/stargate'
import { wasmTypes, createWasmAminoConverters } from '@cosmjs/cosmwasm-stargate'
import { Registry } from '@cosmjs/proto-signing'
import { ibcAminoConverters, ibcRegistry } from './ibc'
import {
  initiaAminoConverters,
  initiaRegistry,
  generateMsgSubmitTxAminoConverter,
} from './initia'
import { minievmAminoConverters, minievmRegistry } from './minievm'
import { miniwasmAminoConverters, miniwasmRegistry } from './miniwasm'
import {
  opinitAminoConverters,
  opinitRegistry,
  generateMsgExecuteMessagesAminoConverter,
} from './opinit'
import { generateMsgSubmitProposalAminoConverter } from './cosmos'

export { generateMsgSubmitTxAminoConverter } from './initia'
export { generateMsgExecuteMessagesAminoConverter } from './opinit'
export { generateMsgSubmitProposalAminoConverter } from './cosmos'

export const protoRegistry = [
  ...defaultRegistryTypes,
  ...wasmTypes,
  ...ibcRegistry,
  ...initiaRegistry,
  ...minievmRegistry,
  ...miniwasmRegistry,
  ...opinitRegistry,
]

export const registry: Registry = new Registry(protoRegistry)

const tmpAminoConverters: AminoConverters = {
  ...createDefaultAminoConverters(),
  ...createWasmAminoConverters(),
  ...ibcAminoConverters,
  ...initiaAminoConverters,
  ...minievmAminoConverters,
  ...miniwasmAminoConverters,
  ...opinitAminoConverters,
}

const msgSubmitTxAminoConverter = generateMsgSubmitTxAminoConverter(
  protoRegistry,
  tmpAminoConverters
)

const msgExecuteMessagesAminoConverter =
  generateMsgExecuteMessagesAminoConverter(protoRegistry, tmpAminoConverters)

const msgSubmitProposalAminoConverter = generateMsgSubmitProposalAminoConverter(
  protoRegistry,
  tmpAminoConverters
)

export const aminoConverters: AminoConverters = {
  ...tmpAminoConverters,
  ...msgSubmitTxAminoConverter,
  ...msgExecuteMessagesAminoConverter,
  ...msgSubmitProposalAminoConverter,
}

export const aminoTypes: AminoTypes = new AminoTypes(aminoConverters)
