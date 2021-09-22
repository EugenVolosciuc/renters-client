import dayjs from "dayjs"

import { Contract } from "types/Contract"

export const checkContractIsExpired = (contract: Contract) => {
    return !dayjs(contract.expirationDate).isAfter(dayjs(), 'day')
}

export const getCurrentContractFromAllContracts = (contracts: Contract[]) => {
    return contracts.find(contract => checkContractIsExpired(contract))
}