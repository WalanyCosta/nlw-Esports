import { FormEvent, useState } from 'react';
import { Check, GameController } from 'phosphor-react';
import * as Checkbox  from '@radix-ui/react-checkbox';
import * as ToggleGroup  from '@radix-ui/react-toggle-group';
import * as Dialog from '@radix-ui/react-dialog';
import Input from './Form/input';
import { Game } from '../App';
import axios from 'axios';
import Select from './Form/select';
import * as z from 'zod';

type Prop = {
    data: Game[];
}

function CreateAdModel({ data }: Prop) {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  const validateSchema = z.object({
    name: z.string().min(1, {message: 'O campo name é obrigatorio.'}),
    yearsPlaying: z.string(),
    discord: z.string().min(1, {message: 'O campo discord é obrigatorio.'}),
    hourStart: z.string().min(1, {message: 'O campo hourStart é obrigatorio.'}),
    hourEnd: z.string().min(1, {message: 'O campo hourEnd é obrigatorio.'}),
    weekDays: z.number().array().min(1, {message: 'Marque o dia em que jogas!'})
  });

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData)
    const weekDaysConverting = weekDays.map(Number);

    try{

      if(!data.game){
          alert('Selecione o game da sua escolha');
          return ;
      }

      const validatedForm = await validateSchema.parse({...data, weekDays: weekDaysConverting});
      
        await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
            name: validatedForm.name,
            yearsPlaying: Number(validatedForm.yearsPlaying),
            discord: validatedForm.discord,
            weekDays: validatedForm.weekDays,
            hourStart: validatedForm.hourStart,
            hourEnd: validatedForm.hourEnd,
            useVoiceChannel: useVoiceChannel
        });

        alert('Anúncio criado com sucesso!');
    }catch(err){
        const objectConverting = JSON.parse(err)[0];
        const message = objectConverting !== undefined ? objectConverting.message : err;
        alert(message)
        return;
    }
    
  }

  return (
    <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-1 fixed"/>
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
            
            <Dialog.Description>
              <form action="" className="mt-8 flex flex-col gap-4" onSubmit={handleCreateAd}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">Qual o game? </label>
                  <Select games={data} />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <Input name="name" type="text" id="name" placeholder="Como te Chamam dentro do game?" className="" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga há Quantos anos?</label>
                    <Input name="yearsPlaying" type="number"  id="yearsPlaying" placeholder="Tudo bem ser ZERO" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual é seu Discord?</label>
                    <Input name="discord" type="text" id="discord" placeholder="usuario#0000"/>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                    
                    <ToggleGroup.Root
                        value={weekDays} 
                        onValueChange={setWeekDays}
                        type="multiple" 
                        className="grid grid-cols-4 gap-2"
                    >
                        <ToggleGroup.Item
                        className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        value="0"
                        title="Domingo"
                        >D</ToggleGroup.Item>
                        <ToggleGroup.Item 
                        className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        value="1"
                        title="Segunda"
                        >S</ToggleGroup.Item>
                        <ToggleGroup.Item 
                        className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        value="2"
                        title="Terça"
                        >T</ToggleGroup.Item>
                        <ToggleGroup.Item 
                        className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        value="3"
                        title="Quarta"
                        >Q</ToggleGroup.Item>
                        <ToggleGroup.Item 
                        className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        value="4"
                        title="Quinta"
                        >Q</ToggleGroup.Item>
                        <ToggleGroup.Item 
                        className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        value="5"
                        title="Sexta"
                        >S</ToggleGroup.Item>
                        <ToggleGroup.Item 
                        className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        value="6"
                        title="Sábado"
                        >S</ToggleGroup.Item>
                     </ToggleGroup.Root>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart">Qual horário do dia</label>
                    <div className="grid grid-cols-2 gap-1">
                      <Input name="hourStart"type="time" id="hourStart" placeholder="De"/>
                      <Input name="hourEnd" type="time" id="hourEnd" placeholder="Até"/>
                    </div>
                  </div>
                </div>  
                <label className="mt-2 flex gap-2 text-sm items-center">
                  <Checkbox.Root
                    checked={useVoiceChannel}
                    onCheckedChange={(checked) =>{
                        if(checked === true){
                            setUseVoiceChannel(true);
                        }else{
                            setUseVoiceChannel(false);
                        }
                    }} 
                    className="w-6 h-6 p-1 rounded bg-zinc-900"
                  >
                    <Checkbox.Indicator >
                        <Check className="w-4 h-4 text-emerald-400" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  Costumo me conectar ao chat de voz
                </label> 

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close
                    type="button" 
                    className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                  >Cancelar</Dialog.Close>
                  <button 
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                  >
                    <GameController className="w-6 h-6"/>
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
  )
}

export default CreateAdModel;