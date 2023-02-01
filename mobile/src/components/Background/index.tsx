import { ImageBackground } from 'react-native';
import { styles } from './styles';
import backgroundImg from '../../assets/background-galaxy.png';

type props = {
    children: React.ReactNode
}

export function Background({ children }: props) {
  return (
    <ImageBackground
        source={backgroundImg}
        defaultSource={backgroundImg}
        style={styles.container}
    >
        { children }
    </ImageBackground>
  );
}