import { Contract } from "types/Contract"
import { User } from "types/User"

export const getRenterContract = (renter: User, contracts: Contract[]) => {
    return contracts.find(contract => contract.renter?.id === renter.id)
}