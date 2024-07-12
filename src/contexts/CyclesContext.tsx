/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';

interface ICycleContextProviderProps {
  children: React.ReactNode;
}

interface ICreateCycleData {
  task: string;
  minutesAmount: number;
}

interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface ICycleContextType {
  activeCycle: ICycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: ICreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as ICycleContextType);

export function CyclesContextProvider({
  children,
}: ICycleContextProviderProps) {
  const [cycles, setCycles] = useState<ICycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    setCycles((prevState) =>
      prevState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        }
        return cycle;
      }),
    );
  }

  function createNewCycle({ minutesAmount, task }: ICreateCycleData) {
    const newCycle: ICycle = {
      id: String(new Date().getTime()),
      task,
      minutesAmount,
      startDate: new Date(),
    };

    setCycles((prevState) => [...prevState, newCycle]);

    setActiveCycleId(newCycle.id);

    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    setCycles((prevState) =>
      prevState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        }
        return cycle;
      }),
    );

    setActiveCycleId(null);
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
