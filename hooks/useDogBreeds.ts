// hooks/useDogBreeds.ts
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

export interface DogBreed {
  id: string;
  name: string;
  origin: string;
}

export const useDogBreeds = () => {
  return useQuery<DogBreed[]>( {
    queryKey: ['dogBreeds'],
    queryFn: async () => {
      const { data, error } = await supabase.from('dog_breeds').select('*');
      if (error) {
        console.log('Supabase fetch error', error);
        return [];
      }
      return data;
    },
  });
};
