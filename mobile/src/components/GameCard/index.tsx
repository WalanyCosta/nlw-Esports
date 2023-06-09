import { 
  Text,
  TouchableOpacity, 
  TouchableOpacityProps, 
  ImageBackground, 
  ImageSourcePropType 
} from 'react-native';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from '../../theme';

export type GameCardProps = {
  id: string,
  nome: string,
  bannerUrl: string;
  _count: {
    ads: number
  };
}

interface Props extends TouchableOpacityProps{
  data: GameCardProps
}

export function GameCard({ data, ...rest }:Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        style={styles.cover}
        source={{uri: data.bannerUrl}}
      >

      <LinearGradient
        colors={THEME.COLORS.FOOTER}
        style={styles.footer}
      >
        <Text style={styles.name}>
           {data.nome}
        </Text>

        <Text style={styles.ads}>
            {data._count.ads} anúncios
        </Text>
      </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}