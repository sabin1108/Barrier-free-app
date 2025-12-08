import { Skill } from '@/types/Profile';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function SkillList({ skills }: { skills?: Skill[] }) {
    if (!skills || skills.length === 0) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>보유 기술</Text>
            <View style={styles.listContainer}>
                {skills.map((skill, index) => (
                    <View key={index} style={styles.chip}>
                        <Text style={styles.chipText}>{skill.name}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 12,
    },
    listContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        backgroundColor: '#E0F2F1', // Light Teal matching contact icons
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#B2DFDB',
    },
    chipText: {
        color: '#00695C', // Darker Teal for text
        fontSize: 14,
        fontWeight: '500',
    },
});
