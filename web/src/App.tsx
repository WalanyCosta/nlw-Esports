import axios from 'axios';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { CaretLeft, CaretRight } from 'phosphor-react';

import logoImg from './assets/logo-nlw.svg';
import {GameBanner, CreateAdBanner, CreateAdModel, Error} from './components';

export type Game = {
  id: string;
  nome: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  const properties = {
    prevArrow: <button className='p-2 cursor-pointer -translate-x-12 translate-y-11'><CaretLeft size={40} className='text-white'/></button>,
    nextArrow: <button className='p-2 self-center cursor-pointer translate-x-14 translate-y-11'><CaretRight size={40} className='text-white'/></button>
  }

  useEffect(()=>{
    axios("http://localhost:3333/games").then(response => setGames(response.data));
  }, [games]);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
       <img src={logoImg} alt=""/>

       <h1 className="text-6xl text-white font-black mt-20 ">
          Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
       </h1>

        {
          games.length !== 0 ? (
            <>
              <div>
                <Slide {...properties} cssClass='grid grid-cols-6 gap-8 mt-16 z-[-10] items-center' slidesToScroll={1} slidesToShow={6} indicators={false}>
                  {
                    games.map(game => {
                      return (
                        <GameBanner 
                          key={game.id} 
                          bannerUrl={game.bannerUrl} 
                          title={game.nome} 
                          adsAcount={game._count.ads}
                        />
                      )
                    })
                  }
                </Slide>
              </div>
        
              <Dialog.Root>
                <CreateAdBanner />
                <CreateAdModel data={games}/>
              </Dialog.Root> 
           </>
          ) : (
            <Error />
          ) 
        }
    </div>
  )
}

export default App
