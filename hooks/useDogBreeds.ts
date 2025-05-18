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
      const cached = await AsyncStorage.getItem(STORAGE_KEY);
      if (cached) {
        console.log('Loaded dog breeds from AsyncStorage');
        return JSON.parse(cached);
      }

      // 2. Fetch from Supabase
      const { data, error } = await supabase.from('dog_breeds').select('*');

      if (error) {
        console.error('Supabase fetch error', error);
        throw error;
      }

      // console.log("ASDSADS")
      // console.log('Supabase data:', data);
      // console.log('Supabase error:', error);

      // if (isError) {
      //   console.log("Supabase fetch error", error);
      //   return []
      // }
      console.log('Supabase data:', data);
      
      // 3. Cache the result
      if (data && data.length >0 ) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        console.log('Saved dog breeds to AsyncStorage');
      }

      return data ?? [];
    },
  });
};