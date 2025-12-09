import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';

import { ContactInfo } from '@/components/home/ContactInfo';
import { EditProfileModal } from '@/components/home/EditProfileModal';
import { ProfileHeader } from '@/components/home/ProfileHeader';
import { SkillList } from '@/components/home/SkillList';
import { StatsRow } from '@/components/home/StatsRow';
import { ProfileStorage } from '@/services/ProfileStorage';
import { ProfileData } from '@/types/Profile';

const { width } = Dimensions.get('window');

// 빈 프로필 초기값 (Data.ts 삭제 대응)
const EMPTY_PROFILE: ProfileData = {
    name: "이름 없음",
    role: "직업 없음",
    description: "소개를 입력해주세요.",
    stats: { projects: 0, likes: 0, experience: "0년" },
    contacts: { email: "", phone: "", location: "" },
    skills: [],
    socials: []
};

export default function PortfolioScreen() {
    const router = useRouter();
    const [profile, setProfile] = React.useState<ProfileData>(EMPTY_PROFILE);
    const [isEditModalVisible, setIsEditModalVisible] = React.useState(false);

    // 앱 시작 시 로컬 데이터 로드
    React.useEffect(() => {
        // 초기값(빈 프로필)일 때는 저장 안 한도록 변경
        if (profile.name !== "이름 없음") {
            ProfileStorage.saveProfile(profile);
        }
    }, [profile]); // profile이 바뀔 때마다 실행 

    // 기존 코드에서 상태 업데이트만 사용하게 변경
    const handleSaveProfile = React.useCallback((newData: Partial<ProfileData>) => {
        setProfile(prev => ({
            ...prev,
            ...newData,
            contacts: { ...prev.contacts, ...newData.contacts }
        }));
    }, []);

    // 프로필 편집에서 필요없이 다시 그려지는 방식을 수정하기 위한 코드
    const handleOpenEditModal = React.useCallback(() => {
        setIsEditModalVisible(true);
    }, []);

    const handleNavigateToProfile = React.useCallback(() => {
        router.push('./profile');
    }, [router]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F0FDFC" />

            {/* Header (앱 상단 네비게이션) */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Feather name="briefcase" size={24} color="#008080" />
                    <Text style={styles.logoText}>Portfolio</Text>
                </View>
                <View style={styles.headerIcons}>
                    {/*버튼을 누를때 StatsRow, SkillList 등의 내용을 다시 그리지 않게 하기 위한 코드로 수정*/}
                    <TouchableOpacity style={styles.iconButton} onPress={handleOpenEditModal}>
                        <Feather name="edit-2" size={20} color="#475569" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={handleNavigateToProfile}>
                        <Feather name="user" size={20} color="#475569" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}><Feather name="share-2" size={20} color="#475569" /></TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}><Feather name="moon" size={20} color="#475569" /></TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => router.push('./login')}><Feather name="log-out" size={20} color="#475569" /></TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <LinearGradient
                        colors={['#009688', '#00695C']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.cardHeaderGradient}
                    />

                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatarPlaceholder} />
                        </View>
                    </View>

                    {/* Profile Content */}
                    <View style={styles.cardContent}>

                        {/* 1. 프로필 헤더 */}
                        <ProfileHeader
                            name={profile.name}
                            role={profile.role}
                            description={profile.description}
                        />

                        {/* 2. 통계 */}
                        <StatsRow stats={profile.stats} />

                        {/* 3. 스킬 리스트 */}
                        <SkillList skills={profile.skills} />

                        {/* 간격 띄우기 */}
                        <View style={{ height: 30 }} />

                        {/* 4. 연락처 정보 */}
                        <ContactInfo contacts={profile.contacts} />

                    </View>
                </View>
            </ScrollView>

            <EditProfileModal
                visible={isEditModalVisible}
                onClose={() => setIsEditModalVisible(false)}
                onSave={handleSaveProfile}
                initialData={profile}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0FDFC',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#F0FDFC',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 15,
    },
    iconButton: {
        padding: 4,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        alignItems: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'visible',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 5,
        marginTop: 20,
        position: 'relative',
    },
    cardHeaderGradient: {
        height: 120,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    avatarWrapper: {
        position: 'absolute',
        top: 60,
        left: 30,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatarPlaceholder: {
        flex: 1,
        backgroundColor: '#F1F5F9',
        borderRadius: 16,
    },
    cardContent: {
        marginTop: 50,
        paddingHorizontal: 30,
        paddingBottom: 40,
    },
});
