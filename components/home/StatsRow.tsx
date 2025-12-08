import { StyleSheet, Text, View } from 'react-native';

interface Stats {
    projects: number;
    likes: number;
    experience: string;
}

export function StatsRow({ stats }: { stats: Stats }) {
    if (!stats) return null;

    return (
        <View style={styles.statsContainer}>
            {/* 통계 박스 1 */}
            <View style={styles.statBox}>
                <Text style={styles.statNumber}>{stats.projects}</Text>
                <Text style={styles.statLabel}>프로젝트</Text>
            </View>

            {/* 통계 박스 2 */}
            <View style={styles.statBox}>
                <Text style={styles.statNumber}>{stats.likes}</Text>
                <Text style={styles.statLabel}>좋아요</Text>
            </View>

            {/* 통계 박스 3 */}
            <View style={styles.statBox}>
                <Text style={styles.statNumber}>{stats.experience}</Text>
                <Text style={styles.statLabel}>경력</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // 가로 배치 컨테이너
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        gap: 12,
    },
    // 개별 통계 박스 (연한 민트 배경)
    statBox: {
        flex: 1, // 공간 등분
        backgroundColor: '#F0FDFC',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // 숫자 스타일
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 4,
    },
    // 라벨 텍스트 스타일
    statLabel: {
        fontSize: 13,
        color: '#64748B',
    },
});
