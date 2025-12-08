import { ProfileData } from '@/types/Profile';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface EditProfileModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (data: Partial<ProfileData>) => void;
    initialData: ProfileData;
}

export function EditProfileModal({ visible, onClose, onSave, initialData }: EditProfileModalProps) {
    const [name, setName] = useState(initialData.name);
    const [role, setRole] = useState(initialData.role);
    const [description, setDescription] = useState(initialData.description);

    const [projectsCount, setProjectsCount] = useState(initialData.stats.projects.toString());
    const [likesCount, setLikesCount] = useState(initialData.stats.likes.toString());
    const [experience, setExperience] = useState(initialData.stats.experience);

    const [skills, setSkills] = useState(initialData.skills || []);
    const [newSkillText, setNewSkillText] = useState('');

    const addSkill = () => {
        if (newSkillText.trim() !== '') {
            setSkills([...skills, { name: newSkillText.trim() }]);
            setNewSkillText('');
        }
    };

    const removeSkill = (indexToRemove: number) => {
        setSkills(skills.filter((_, index) => index !== indexToRemove));
    };

    const [email, setEmail] = useState(initialData.contacts.email);
    const [phone, setPhone] = useState(initialData.contacts.phone);
    const [location, setLocation] = useState(initialData.contacts.location);

    // Update state when initialData changes
    useEffect(() => {
        setName(initialData.name);
        setRole(initialData.role);
        setDescription(initialData.description);
        setEmail(initialData.contacts.email);
        setPhone(initialData.contacts.phone);
        setLocation(initialData.contacts.location);
    }, [initialData, visible]);

    const handleSave = () => {
        onSave({
            name,
            role,
            description,
            contacts: {
                ...initialData.contacts,
                email,
                phone,
                location
            }
        });
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalOverlay}
            >
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>프로필 수정</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Feather name="x" size={24} color="#64748B" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Name Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>이름</Text>
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder="이름을 입력하세요"
                            />
                        </View>

                        {/* Role Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>직업</Text>
                            <TextInput
                                style={styles.input}
                                value={role}
                                onChangeText={setRole}
                                placeholder="직업을 입력하세요"
                            />
                        </View>

                        {/* Description Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>소개</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                value={description}
                                onChangeText={setDescription}
                                placeholder="자기소개를 입력하세요"
                                multiline
                                numberOfLines={3}
                            />
                        </View>

                        <View style={styles.divider} />
                        <Text style={styles.sectionTitle}>연락처 정보</Text>

                        {/* Email Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>이메일</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="이메일"
                                keyboardType="email-address"
                            />
                        </View>

                        {/* Phone Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>전화번호</Text>
                            <TextInput
                                style={styles.input}
                                value={phone}
                                onChangeText={setPhone}
                                placeholder="010-0000-0000"
                                keyboardType="phone-pad"
                            />
                        </View>

                        {/* Location Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>위치</Text>
                            <TextInput
                                style={styles.input}
                                value={location}
                                onChangeText={setLocation}
                                placeholder="서울, 대한민국"
                            />
                        </View>

                        <View style={styles.divider} />
                        <Text style={styles.sectionTitle}>통계 정보</Text>

                        <View style={styles.row}>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>프로젝트 수</Text>
                                <TextInput
                                    style={styles.input}
                                    value={projectsCount}
                                    onChangeText={setProjectsCount}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>좋아요 수</Text>
                                <TextInput
                                    style={styles.input}
                                    value={likesCount}
                                    onChangeText={setLikesCount}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>경력</Text>
                            <TextInput
                                style={styles.input}
                                value={experience}
                                onChangeText={setExperience}
                                placeholder="예: 3년차, 신입"
                            />
                        </View>


                        <View style={styles.addSkillRow}>
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                value={newSkillText}
                                onChangeText={setNewSkillText}
                                placeholder="기술 추가 (예: React Native)"
                            />
                            <TouchableOpacity style={styles.addButton} onPress={addSkill}>
                                <Text style={styles.addButtonText}>추가</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.skillChipsContainer}>
                            {skills.map((skill, index) => (
                                <TouchableOpacity key={index} style={styles.skillChip} onPress={() => removeSkill(index)}>
                                    <Text style={styles.skillText}>{skill.name}</Text>
                                    <Feather name="x" size={12} color="#00695C" />
                                </TouchableOpacity>
                            ))}
                        </View>


                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>저장</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        height: '85%', // Occupy 85% of screen height
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 16,
        marginTop: 8,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        color: '#1E293B',
        backgroundColor: '#F8FAFC',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 20,
    },
    footer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    cancelButton: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#64748B',
    },
    saveButton: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#009688',
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },

    row: {
        flexDirection: 'row',
        gap: 12
    },

    addSkillRow: {
        flexDirection: 'row',
        gap: 8, alignItems: 'center',
        marginBottom: 12
    },

    addButton: {
        backgroundColor: '#009688',
        padding: 12,
        borderRadius: 12, // slightly rounder to match input
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },

    skillChipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8
    },
    skillChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#E0F2F1',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#B2DFDB'
    },
    skillText: {
        color: '#00695C',
        fontSize: 13,
        fontWeight: '600'
    }
});
