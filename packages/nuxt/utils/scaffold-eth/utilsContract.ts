import type { AbiFunction, AbiParameter } from 'viem'
import type { AbiParameterTuple } from './contract'

/**
 * Generates a key based on function metadata
 */
export function getFunctionInputKey(functionName: string, input: AbiParameter, inputIndex: number): string {
  const name = input?.name || `input_${inputIndex}_`
  return `${functionName}_${name}_${input.internalType}_${input.type}`
}

function isJsonString(str: string) {
  try {
    JSON.parse(str)
    return true
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (error) {
    return false
  }
}

function isBigInt(str: string) {
  if (str.trim().length === 0 || str.startsWith('0'))
    return false
  try {
    BigInt(str)
    return true
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (error) {
    return false
  }
}

// Recursive function to deeply parse JSON strings, correctly handling nested arrays and encoded JSON strings
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function deepParseValues(value: any): any {
  if (typeof value === 'string') {
    if (isBigInt(value)) {
      return BigInt(value)
    }
    if (isJsonString(value)) {
      const parsed = JSON.parse(value)
      return deepParseValues(parsed)
    }

    return value
  }
  // biome-ignore lint/style/noUselessElse: <explanation>
  else if (Array.isArray(value)) {
    return value.map(element => deepParseValues(element))
  }
  // biome-ignore lint/style/noUselessElse: <explanation>
  else if (typeof value === 'object' && value !== null) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return Object.entries(value).reduce((acc: any, [key, val]) => {
      acc[key] = deepParseValues(val)
      return acc
    }, {})
  }

  // Handle boolean values represented as strings
  if (value === 'true' || value === '1' || value === '0x1' || value === '0x01' || value === '0x0001') {
    return true
  }
  // biome-ignore lint/style/noUselessElse: <explanation>
  else if (value === 'false' || value === '0' || value === '0x0' || value === '0x00' || value === '0x0000') {
    return false
  }

  return value
}

/**
 * parses form input with array support
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function getParsedContractFunctionArgs(form: Record<string, any>) {
  return Object.keys(form).map((key) => {
    const valueOfArg = form[key]
    return deepParseValues(valueOfArg)
  })
}

export function getInitialFormState(abiFunction: AbiFunction) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const initialForm: Record<string, any> = {}
  if (!abiFunction.inputs)
    return initialForm
  abiFunction.inputs.forEach((input, index) => {
    const key = getFunctionInputKey(abiFunction.name, input, index)
    initialForm[key] = ''
  })
  return initialForm
}

export function getInitialTupleFormState(abiTupleParameter: AbiParameterTuple) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const initialForm: Record<string, any> = {}
  if (abiTupleParameter.components.length === 0) {
    return initialForm
  }
  abiTupleParameter.components.forEach((component, index) => {
    const key = getFunctionInputKey(abiTupleParameter.name || 'tuple', component, index)
    initialForm[key] = ''
  })
  return initialForm
}

export function adjustInput(input: AbiParameterTuple): AbiParameter {
  if (input.type.startsWith('tuple[')) {
    const depth = (input.type.match(/\[\]/g) || []).length
    return {
      ...input,
      components: transformComponents(input.components, depth, {
        internalType: input.internalType || 'struct',
        name: input.name,
      }),
    }
  }
  // biome-ignore lint/style/noUselessElse: <explanation>
  else if (input.components) {
    return {
      ...input,
      components: input.components.map(value => adjustInput(value as AbiParameterTuple)),
    }
  }
  return input
}

function transformComponents(
  components: readonly AbiParameter[],
  depth: number,
  parentComponentData: { internalType?: string, name?: string },
): AbiParameter[] {
  if (depth === 1 || !components) {
    return [...components]
  }

  // Recursive case: wrap components in an additional tuple layer
  const wrappedComponents: AbiParameter = {
    internalType: `${parentComponentData.internalType || 'struct'}`.replace(/\[\]/g, '') + '[]'.repeat(depth - 1),
    name: `${parentComponentData.name || 'tuple'}`,
    type: `tuple${'[]'.repeat(depth - 1)}`,
    components: transformComponents(components, depth - 1, parentComponentData),
  }

  return [wrappedComponents]
}

export function transformAbiFunction(abiFunction: AbiFunction): AbiFunction {
  return {
    ...abiFunction,
    inputs: abiFunction.inputs.map(value => adjustInput(value as AbiParameterTuple)),
  }
}
