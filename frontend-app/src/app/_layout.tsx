import { Stack } from 'expo-router';

function RootLayoutApp() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="kardex" options={{ headerShown: false }} />
    </Stack>
  );
}

export default RootLayoutApp