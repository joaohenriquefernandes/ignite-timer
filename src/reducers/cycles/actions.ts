import { Cycle } from './reducer'

export enum ActionsTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPTED_CURRENT_CYCLE = 'INTERRUPTED_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionsTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interrupedCurrentCycleActions() {
  return {
    type: ActionsTypes.INTERRUPTED_CURRENT_CYCLE,
  }
}

export function markCurrentCycleAsFinishedActions() {
  return {
    type: ActionsTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}
