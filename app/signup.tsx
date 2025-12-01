import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function SignupScreen() {
    const router = useRouter();
    const [isSignupMode, setIsSignupMode] = useState(false);
    const [loading, setLoading] = useState(false);

    // 입력 상태 관리
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // [중요] 백엔드 서버 주소 (회원가입 엔드포인트)
    const API_URL = 'http://192.168.219.100:3000/signup';

    const handleSignup = async () => {
        // 1. 입력값 검증
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('알림', '모든 필드를 입력해주세요.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('알림', '비밀번호가 일치하지 않습니다.');
            return;
        }

        setLoading(true);
        try {
            // 2. 서버로 데이터 전송
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            // 3. 응답 처리
            if (data.success) {
                Alert.alert('회원가입 성공', '로그인 페이지로 이동합니다.');

                // 폼 초기화
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setIsSignupMode(false);

                router.replace('/'); // 메인(로그인) 화면으로 이동
            } else {
                Alert.alert('회원가입 실패', data.message || '다시 시도해주세요.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('오류', '서버와 연결할 수 없습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F0FDFC" />

            {/* 헤더 (뒤로가기 버튼) */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButtonHeader}>
                    <Text style={styles.backButtonHeaderText}>← 뒤로</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}></Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* [항상 표시] 타이틀: 간편 가입 */}
                <Text style={styles.title}>간편 가입</Text>

                {/* [항상 표시] 소셜 로그인 버튼들 */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.googleButton]}>
                        <Image source={require('../assets/images/google.png')} style={styles.iconImage} resizeMode="contain" />
                        <Text style={styles.googleButtonText}>Google로 계속하기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.naverButton]}>
                        <Image source={require('../assets/images/naver-icon.png')} style={styles.iconImage} resizeMode="contain" />
                        <Text style={styles.whiteText}>네이버로 계속하기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.kakaoButton]}>
                        <Image source={require('../assets/images/kakaotalk.png')} style={styles.iconImage} resizeMode="contain" />
                        <Text style={styles.kakaoText}>카카오로 계속하기</Text>
                    </TouchableOpacity>
                </View>

                {/* [항상 표시] 구분선 */}
                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>또는</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* [조건부 렌더링] 이메일 가입 버튼 vs 입력 폼 */}
                {isSignupMode ? (
                    // 1. 회원가입 폼 (확장됨)
                    <View style={styles.formContainer}>

                        {/* 이름 입력 */}
                        <Text style={styles.label}>이름</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputIcon}>👤</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="홍길동"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        {/* 이메일 입력 */}
                        <Text style={styles.label}>이메일</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputIcon}>✉️</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="example@email.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* 비밀번호 입력 */}
                        <Text style={styles.label}>비밀번호</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputIcon}>🔒</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="8자 이상"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                            <Text style={styles.eyeIcon}>👁️</Text>
                        </View>

                        {/* 비밀번호 확인 입력 */}
                        <Text style={styles.label}>비밀번호 확인</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputIcon}>🔒</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="비밀번호 재입력"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />
                            <Text style={styles.eyeIcon}>👁️</Text>
                        </View>

                        {/* 가입하기 버튼 */}
                        <TouchableOpacity
                            style={styles.signupButton}
                            onPress={handleSignup}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.signupButtonText}>회원가입</Text>
                            )}
                        </TouchableOpacity>

                        {/* 다른 방법으로 가입 (뒤로가기) */}
                        <TouchableOpacity onPress={() => setIsSignupMode(false)} style={styles.backButton}>
                            <Text style={styles.backButtonText}>← 다른 방법으로 가입</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    // 2. 이메일 가입 버튼 (기본)
                    <TouchableOpacity
                        style={styles.emailButton}
                        onPress={() => setIsSignupMode(true)}
                    >
                        <Text style={styles.emailIcon}>✉️</Text>
                        <Text style={styles.emailText}>이메일로 가입</Text>
                    </TouchableOpacity>
                )}

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0FDFC',
    },
    header: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButtonHeader: {
        padding: 5,
    },
    backButtonHeaderText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#333',
    },
    content: {
        paddingHorizontal: 30,
        paddingBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80%', // 화면 중앙 정렬 느낌
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 30,
        marginTop: 20,
    },
    buttonContainer: {
        width: '100%',
        gap: 12,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
        width: '100%',
        position: 'relative',
    },
    googleButton: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    googleButtonText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    googleIcon: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4285F4',
        position: 'absolute',
        left: 20,
    },
    naverButton: {
        backgroundColor: '#00BF19',
    },
    kakaoButton: {
        backgroundColor: '#FEE500',
    },
    whiteText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    kakaoText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
    },
    buttonIcon: {
        fontSize: 16,
        color: '#fff',
        position: 'absolute',
        left: 20,
    },
    // 아이콘 이미지 스타일
    iconImage: {
        width: 24,
        height: 24,
        position: 'absolute',
        left: 20,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 30,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E2E8F0',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#94A3B8',
        fontSize: 14,
    },
    emailButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    emailIcon: {
        fontSize: 18,
        marginRight: 8,
        color: '#64748B',
    },
    emailText: {
        fontSize: 16,
        color: '#64748B',
        fontWeight: '500',
    },
    // 폼 스타일
    formContainer: {
        width: '100%',
        alignItems: 'center',
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 14,
        color: '#64748B',
        marginBottom: 8,
        fontWeight: '500',
        marginTop: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 5,
        width: '100%',
        height: 50,
    },
    inputIcon: {
        fontSize: 16,
        marginRight: 10,
        color: '#94A3B8',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    eyeIcon: {
        fontSize: 16,
        color: '#94A3B8',
    },
    signupButton: {
        backgroundColor: '#009688',
        width: '100%',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    signupButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        padding: 5,
    },
    backButtonText: {
        color: '#64748B',
        fontSize: 14,
    },
});
