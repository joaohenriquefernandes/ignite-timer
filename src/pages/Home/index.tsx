import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from 'phosphor-react';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';

import { CyclesContext } from '../../contexts/CyclesContext';

import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles';

const newCycleFormValidationSchema = zod.z.object({
  task: zod.z.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.z
    .number()
    .min(5, 'O ciclo precisa ser no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser no máximo 60 minutos.'),
});

type INewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);
  const newCycleForm = useForm<INewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: INewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch('task');

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={!task} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
