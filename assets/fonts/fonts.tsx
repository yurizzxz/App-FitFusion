import { useFonts } from 'expo-font';

export default function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    ArchivoBlack: require('./ArchivoBlack-Regular.ttf'),
    Anton: require('./Anton-Regular.ttf'),
  });

  return fontsLoaded;
}
