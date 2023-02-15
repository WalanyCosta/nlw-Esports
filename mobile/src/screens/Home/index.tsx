import {useState, useEffect} from 'react';
import { styles } from './styles';
import { View, Image, FlatList } from 'react-native';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(()=>{
    fetch('http://192.168.8.100:3333/games')
    .then(response=> response.json())
    .then(data => {
     setGames(data)
    });
  },[games]);

  return (
    <View style={styles.container}>
      <Image
        source={logoImg}
        style={styles.logo}
      />
      <Heading
        title='Encontre seu duo!'
        subtitle='Selecione o game que deseja jogar...'
      />
      <FlatList 
        data={games}
        keyExtractor={item => item.id}
        renderItem={({item}) =>(
        <GameCard 
          data={item}
        />
        )}
        showsHorizontalScrollIndicator={false }
        horizontal
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}