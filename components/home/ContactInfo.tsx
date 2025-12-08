import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

interface ContactInfoProps {
    contacts: {
        email: string;
        phone: string;
        location: string;
    }
}

export function ContactInfo({ contacts }: ContactInfoProps) {
    return (
        <View style={styles.contactContainer}>
            {/* 이메일 항목 */}
            <View style={styles.contactItem}>
                <View style={styles.contactIconBox}>
                    <Feather name="mail" size={18} color="#009688" />
                </View>
                <Text style={styles.contactText}>{contacts.email}</Text>
            </View>

            {/* 전화번호 항목 */}
            <View style={styles.contactItem}>
                <View style={styles.contactIconBox}>
                    <Feather name="phone" size={18} color="#009688" />
                </View>
                <Text style={styles.contactText}>{contacts.phone}</Text>
            </View>

            {/* 위치 항목 */}
            <View style={styles.contactItem}>
                <View style={styles.contactIconBox}>
                    <Feather name="map-pin" size={18} color="#009688" />
                </View>
                <Text style={styles.contactText}>{contacts.location}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // 전체 테두리 박스
    contactContainer: {
        backgroundColor: '#F8FAFC',
        borderRadius: 20,
        padding: 20,
        gap: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    // 개별 연락처 항목 (가로 배치)
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    // 아이콘 배경 원
    contactIconBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E0F2F1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // 연락처 텍스트
    contactText: {
        fontSize: 15,
        color: '#334155',
        fontWeight: '500',
    },
});
