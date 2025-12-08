import { ProfileData } from '@/types/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = 'user_profile';

export const ProfileStorage = {
    // Save profile data
    saveProfile: async (profile: ProfileData): Promise<void> => {
        try {
            const jsonValue = JSON.stringify(profile);
            await AsyncStorage.setItem(PROFILE_KEY, jsonValue);
        } catch (e) {
            console.error('Failed to save profile', e);
        }
    },

    // Load profile data
    loadProfile: async (): Promise<ProfileData | null> => {
        try {
            const jsonValue = await AsyncStorage.getItem(PROFILE_KEY);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error('Failed to load profile', e);
            return null;
        }
    },

    // Clear profile (for debugging or reset)
    clearProfile: async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem(PROFILE_KEY);
        } catch (e) {
            console.error('Failed to clear profile', e);
        }
    }
};
