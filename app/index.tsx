import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();

    const [isLoginMode, setIsLoginMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = 'http://192.168.219.100:3000/login';

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                Alert.alert('로그인 성공', '환영합니다!!');
                router.push('/');
            } else {
                Alert.alert('로그인 실패', data.message);
            }
        } catch (error) {
            console.error('Login Error:', error);
            Alert.alert('로그인 실패', '로그인 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F0FDFC" />

            <View style={styles.content}>

                {/* [항상 표시] 타이틀: 간편 로그인 */}
                <Text style={styles.title}>간편 로그인</Text>

                {/* [항상 표시] 소셜 로그인 버튼들 */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.googleButton]}>
                        <Text style={styles.googleIcon}>G</Text>
                        <Text style={styles.googleButtonText}>Google로 계속하기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.naverButton]}>
                        <Text style={styles.buttonIcon}>N</Text>
                        <Text style={styles.whiteText}>네이버로 계속하기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.kakaoButton]}>
                        <Text style={styles.buttonIcon}>💬</Text>
                        <Text style={styles.kakaoText}>카카오로 계속하기</Text>
                    </TouchableOpacity>
                </View>

                {/* [항상 표시] 구분선 */}
                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>또는</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* [조건부 렌더링] 이메일 로그인 버튼 vs 입력 폼 */}
                {isLoginMode ? (
                    // 1. 로그인 폼 (확장됨)
                    <View style={styles.loginFormContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>이메일</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="example@email.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <Text style={styles.label}>비밀번호</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="비밀번호"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.loginButtonText}>로그인</Text>
                            )}
                        </TouchableOpacity>

                        {/* 다른 방법으로 로그인 (뒤로가기) */}
                        <TouchableOpacity onPress={() => setIsLoginMode(false)} style={styles.backButton}>
                            <Text style={styles.backButtonText}>← 다른 방법으로 로그인</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    // 2. 이메일 로그인 버튼 (기본)
                    <TouchableOpacity
                        style={styles.emailButton}
                        onPress={() => setIsLoginMode(true)}
                    >
                        <Text style={styles.emailIcon}>✉️</Text>
                        <Text style={styles.emailText}>이메일로 로그인</Text>
                    </TouchableOpacity>
                )}

                {/* [항상 표시] 회원가입 링크 */}
                <View style={styles.signupContainer}>
                    <Text style={styles.signupLabel}>아직 계정이 없으신가요? </Text>
                    <TouchableOpacity onPress={() => router.push('./signup')}>
                        <Text style={styles.signupLink}>회원가입</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

// 스타일 정의
const styles = StyleSheet.create({
    // 전체 화면 스타일
    container: {
        flex: 1,
        backgroundColor: '#F0FDFC', // 연한 민트/하늘색 배경
    },
    // 헤더 스타일 (아이콘 배치)
    header: {
        padding: 20,
        alignItems: 'flex-end', // 오른쪽 정렬
    },
    // 아이콘 텍스트 스타일
    iconText: {
        fontSize: 24,
        color: '#009688', // 청록색 계열
    },
    // 메인 콘텐츠 정렬
    content: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50, // 시각적 중심 보정
    },
    // 타이틀 텍스트 스타일
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 40,
    },
    // 버튼들을 감싸는 컨테이너
    buttonContainer: {
        width: '100%',
        gap: 12, // 버튼 사이 간격
    },
    // 공통 버튼 스타일
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
        width: '100%',
        position: 'relative',
    },
    // 구글 버튼 스타일 (흰색 + 그림자)
    googleButton: {
        backgroundColor: '#FFFFFF',
        // 그림자 효과 (iOS)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // 그림자 효과 (Android)
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
    // 네이버 버튼 스타일 (초록색)
    naverButton: {
        backgroundColor: '#03C75A',
    },
    // 카카오 버튼 스타일 (노란색)
    kakaoButton: {
        backgroundColor: '#FEE500',
    },
    // 흰색 텍스트 (네이버 버튼용)
    whiteText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    // 카카오 텍스트 (검정색)
    kakaoText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
    },
    // 버튼 내부 아이콘 위치
    buttonIcon: {
        fontSize: 16,
        color: '#fff', // 기본 흰색 (카카오는 덮어씌워짐)
        position: 'absolute',
        left: 20,
    },
    // 구분선 컨테이너
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 30,
    },
    // 구분선 라인
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E2E8F0',
        // backgroundColor: '#000', // 디버깅용
    },
    // 구분선 텍스트
    dividerText: {
        marginHorizontal: 10,
        color: '#94A3B8',
        fontSize: 14,
    },
    // 이메일 로그인 버튼 (투명 배경)
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
    // 회원가입 컨테이너
    signupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signupLabel: {
        color: '#64748B',
        fontSize: 14,
    },
    signupLink: {
        color: '#0F766E', // 짙은 청록색
        fontSize: 14,
        fontWeight: '600',
    },
    // 로그인 확장 시 추가된 폼
    loginFormContainer: {
        width: '100%',
        alignItems: 'center'
    },

    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
        padding: 5
    },

    backButtonText: {
        color: '#64748B',
        fontSize: 14
    },

    inputContainer: {
        width: '100%',
        marginBottom: 20
    },

    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        fontSize: 16
    },

    loginButton: {
        backgroundColor: '#009688',
        width: '100%',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center'
    },

    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    label: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 8,
        fontWeight: '500',
        alignSelf: 'flex-start'
    },
});
