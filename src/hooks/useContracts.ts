import { useContractRead, useContractWrite } from 'wagmi'
import { CONTRACT_ADDRESSES } from '@/config/contracts'
import { XP_MANAGER_ABI, EVENT_REGISTRY_ABI } from '@/config/abis'

export function useXPManager() {
  const getUserXP = (profileId: string) => {
    return useContractRead({
      address: CONTRACT_ADDRESSES.XP_MANAGER as `0x${string}`,
      abi: XP_MANAGER_ABI,
      functionName: 'getUserXP',
      args: [profileId],
    })
  }

  const getUserLevel = (profileId: string) => {
    return useContractRead({
      address: CONTRACT_ADDRESSES.XP_MANAGER as `0x${string}`,
      abi: XP_MANAGER_ABI,
      functionName: 'getUserLevel',
      args: [profileId],
    })
  }

  const awardXP = (profileId: string, amount: number) => {
    return useContractWrite({
      address: CONTRACT_ADDRESSES.XP_MANAGER as `0x${string}`,
      abi: XP_MANAGER_ABI,
      functionName: 'awardXP',
      args: [profileId, amount],
    })
  }

  return {
    getUserXP,
    getUserLevel,
    awardXP,
  }
}

export function useEventRegistry() {
  const getEventDetails = (eventId: string) => {
    return useContractRead({
      address: CONTRACT_ADDRESSES.EVENT_REGISTRY as `0x${string}`,
      abi: EVENT_REGISTRY_ABI,
      functionName: 'getEventDetails',
      args: [eventId],
    })
  }

  const getUserEvents = (profileId: string) => {
    return useContractRead({
      address: CONTRACT_ADDRESSES.EVENT_REGISTRY as `0x${string}`,
      abi: EVENT_REGISTRY_ABI,
      functionName: 'getUserEvents',
      args: [profileId],
    })
  }

  const registerForEvent = (eventId: string, profileId: string) => {
    return useContractWrite({
      address: CONTRACT_ADDRESSES.EVENT_REGISTRY as `0x${string}`,
      abi: EVENT_REGISTRY_ABI,
      functionName: 'registerForEvent',
      args: [eventId, profileId],
    })
  }

  return {
    getEventDetails,
    getUserEvents,
    registerForEvent,
  }
} 