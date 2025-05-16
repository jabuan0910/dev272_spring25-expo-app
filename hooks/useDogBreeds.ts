// hooks/useDogBreeds.ts
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

export type DogBreed = {
  id: string;
  name: string;
  origin?: string;
};

const STORAGE_KEY = 'cached_dog_breeds';

export const useDogBreeds = () => {
  return useQuery<DogBreed[], Error>({
    queryKey: ['dogBreeds'],
    queryFn: async () => {
      // 1. Try reading from AsyncStorage
      // const cached = await AsyncStorage.getItem(STORAGE_KEY);
      // if (cached) {
      //   try {
      //     return JSON.parse(cached) as DogBreed[];
      //   } catch {
      //     // fallback to Supabase if parsing fails
      //   }
      // }

      // 2. Otherwise, fetch from Supabase
      const { data, error } = await supabase
        .from('dog_breeds')
        .select('*');

      // console.log("ASDSADS")
      console.log('Supabase data:', data);
      console.log('Supabase error:', error);

      // if (isError) {
      //   console.log("Supabase fetch error", error);
      //   return []
      // }

      console.log('Supabase data:', data);
      // 3. Cache the result

      if (data && data.length >0 ) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }

      if (error) throw new Error(error.message);
      return data ?? [];
    },
  });
};