import { StyleSheet, Text, View } from 'react-native';

interface ProfileHeaderProps {
    name: string;
    role: string;
    description: string;
}

export function ProfileHeader({ name, role, description }: ProfileHeaderProps) {
    return (
        <View style={styles.container}>
            {/* 이름 영역 */}
            <Text style={styles.name}>{name}</Text>

            {/* 직업 영역 */}
            <Text style={styles.role}>{role}</Text>

            {/* 소개글 영역 */}
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    // 이름 스타일 (진하게, 크게)
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 4,
    },
    // 직업 텍스트 스타일 (청록색)
    role: {
        fontSize: 16,
        color: '#009688',
        fontWeight: '600',
        marginBottom: 16,
    },
    // 설명 텍스트 스타일 (회색)
    description: {
        fontSize: 15,
        color: '#64748B',
        lineHeight: 24,
        marginBottom: 30, // 하단 여백이 여기에 포함되어 있음
    },
});
