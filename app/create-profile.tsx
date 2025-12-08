import { ProfileStorage } from '@/services/ProfileStorage';
import { ProfileData } from '@/types/Profile';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';



export default function CreateProfileScreen() {
    const router = useRouter();

    // 상태 관리
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');

    // 프로필 생성 및 저장 핸들러
    const handleCreate = async () => {
        //유효성 검사 
        if (!name.trim() || !role.trim()) {
            Alert.alert('필수 입력', '이름과 직업/포지션은 필수입니다.');
            return;
        }

        // 저장할 데이터 객체 생성
        const newProfile: ProfileData = {
            name,
            role,
            description,
            stats: {
                projects: 0,
                likes: 0,
                experience: "신입"
            },
            contacts: {
                email: '',
                phone: '',
                location: ''
            },
            skills: [],
            socials: []
        };

        try {
            // 로컬 스토리지 저장
            await ProfileStorage.saveProfile(newProfile);
            // 메인화면 이동(뒤로가기 방지)
            router.replace('/');
            // 성공 알림
            Alert.alert('성공', '프로필이 성공적으로 저장되었습니다.');
        } catch (error) {
            console.error('프로필 저장 중 오류 발생:', error);
            Alert.alert('오류', '프로필 저장 중 오류가 발생했습니다.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F0FDFC" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* 헤더 */}
                    <View style={styles.header}>
                        <View style={styles.iconContainer}>
                            <LinearGradient
                                colors={['#E0F2F1', '#B2DFDB']}
                                style={styles.iconBackground}
                            >
                                <Feather name="user-plus" size={32} color="#009688" />
                            </LinearGradient>
                        </View>
                        <Text style={styles.title}>프로필 생성</Text>
                        <Text style={styles.subtitle}>
                            나만의 포트폴리오를 만들기 위한{'\n'}
                            첫 번째 단계입니다.
                        </Text>
                    </View>
                    {/* 입력 폼 */}
                    <View style={styles.container}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>이름</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="이름을 입력해주세요"
                                placeholderTextColor="#94A3B8"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>직업/포지션</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="직업/포지션을 입력해주세요"
                                placeholderTextColor="#94A3B8"
                                value={role}
                                onChangeText={setRole}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>한줄 소개</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="한줄 소개를 입력해주세요"
                                placeholderTextColor="#94A3B8"
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>
                    </View>
                    {/* 시작하기 버튼 */}
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleCreate}
                    >
                        <LinearGradient
                            colors={['#009688', '#00796B']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientButton}
                        >
                            <Text style={styles.submitButtonText}>생성하기</Text>
                            <Feather name="arrow-right" size={20} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0FDFC',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
        paddingTop: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    iconContainer: {
        marginBottom: 20,
        shadowColor: '#009688',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
    },
    iconBackground: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 24,
    },
    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 2,
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: '#334155',
        marginBottom: 8,
        marginLeft: 4,
    },
    required: {
        color: '#EF4444',
    },
    input: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 16,
        padding: 16,
        fontSize: 16,
        color: '#1E293B',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 16,
    },
    submitButton: {
        shadowColor: '#009688',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
    },
    gradientButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 20,
        gap: 8,
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});