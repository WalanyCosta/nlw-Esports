import { useState, useEffect } from 'react';
import { Game } from "../../App";

import { CaretDown } from 'phosphor-react';
import * as SelectRadix from '@radix-ui/react-select';

interface Props{
    games: Game[]
}

function Select({ games }: Props) {

  return (
    <SelectRadix.Root name="game">
        <SelectRadix.Trigger 
            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none flex items-center justify-between"
        >
            <SelectRadix.Value placeholder="Selecione o game que deseja jogar"/>
            <SelectRadix.Icon>
                <CaretDown size={20} color="#fff"/>
            </SelectRadix.Icon>
        </SelectRadix.Trigger>

        <SelectRadix.Portal>
            <SelectRadix.Content 
                position="popper"
                className="bg-white py-3 px-4 w-[400px] rounded overflow-hidden"
            >
                <SelectRadix.Viewport>
                    {
                        games.map(game => {
                            return (
                                <SelectRadix.Item 
                                    key={game.id} 
                                    value={game.id}
                                    className="py-1 px-2 cursor-pointer rounded hover:bg-violet-500 hover:text-white"
                                >
                                   <SelectRadix.ItemText>{game.nome}</SelectRadix.ItemText> 
                                </SelectRadix.Item>
                            )
                        })
                    }
                </SelectRadix.Viewport>
            </SelectRadix.Content>
        </SelectRadix.Portal>

</SelectRadix.Root>
)
}

export default Select