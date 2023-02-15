import {useState, useEffect} from 'react';
import { styles } from './styles';
import { Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Background, GameCard, GameCardProps, Heading } from '../../components';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({ id, nome, bannerUrl }: GameCardProps){
    navigation.navigate('game', { id, nome, bannerUrl });
  }

  useEffect(()=>{
    fetch('http://192.168.8.100:3333/games')
    .then(response=> response.json())
    .then(data => {
     setGames(data)
    });
  },[games]);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
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
            onPress={() => handleOpenGame(item)}
          />
          )}
          showsHorizontalScrollIndicator={false }
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}