import dayjs from "dayjs"

import { Contract } from "types/Contract"

export const getCurrentContractFromAllContracts = (contracts: Contract[]) => {
    return contracts.find(contract => dayjs(contract.expirationDate).isAfter(dayjs()))
}