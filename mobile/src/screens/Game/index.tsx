import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import { THEME } from '../../theme'; 
import { styles } from './styles';

import logoImg  from '../../assets/logo-nlw-esports.png';
import { Background, DuoCard, Heading } from '../../components';

import { GameParams } from '../../@types/navigation';
import { DuoCardProps } from './../../components/DuoCard/index';


export function Game() {

  const route = useRoute();
  const navegation = useNavigation();
  const game = route.params as GameParams;
  
  function handleGoBack(){
    navegation.goBack();
  }

  const [duos, SetDuos] = useState<DuoCardProps[]>([]);

    useEffect(()=>{
        fetch(`http://192.168.8.100:3333/games/${game.id}/ads`)
        .then(response=> response.json())
        .then(data => SetDuos(data));
    },[duos]);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
         <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image 
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right}/>
         </View>

         <Image 
            source={{ uri: game.bannerUrl }}
            style={styles.cover}
            resizeMode='cover'
         />

         <Heading 
            title={game.nome}
            subtitle="Conecte e comece a jogar"
         /> 
        
        <FlatList 
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard 
            data={item} 
            onConnect={() => [ ]}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={duos.length === 0 ? styles.emptyListContent : styles.contentList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={()=>(
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView> 
    </Background>
  );
}