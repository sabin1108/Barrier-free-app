import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignupScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // [중요] 백엔드 서버 주소 (로그인 화면과 동일하게 설정)
    const API_URL = 'http://192.168.219.100:3000/signup';

    const handleSignup = async () => {
        if (!email || !password) {
            Alert.alert('알림', '이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                Alert.alert('성공', '회원가입이 완료되었습니다! 로그인해주세요.');
                router.back(); // 뒤로가기
            } else {
                Alert.alert('실패', data.message || '회원가입에 실패했습니다.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('오류', '서버와 연결할 수 없습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>회원가입</Text>
            </View>

            <View style={styles.content}>
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
                </View>

                <View style={styles.inputContainer}>
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
                    style={styles.signupButton}
                    onPress={handleSignup}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.signupButtonText}>가입하기</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    backButton: { padding: 10, marginRight: 10 },
    backButtonText: { fontSize: 24, color: '#333' },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    content: { padding: 24, paddingTop: 40 },
    inputContainer: { marginBottom: 24 },
    label: { fontSize: 14, color: '#64748B', marginBottom: 8, fontWeight: '500' },
    input: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 16, fontSize: 16, backgroundColor: '#F8FAFC' },
    signupButton: { backgroundColor: '#009688', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
    signupButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
