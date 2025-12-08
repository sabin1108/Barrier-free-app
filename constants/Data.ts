import { ProfileData } from '@/types/Profile';

export const INITIAL_PROFILE: ProfileData = {
    name: "김민수",
    role: "UI/UX Designer",
    description: "사용자 중심의 디자인으로 혁신적인 경험을 만듭니다. 5년간 다양한 프로젝트를 통해 쌓은 경험으로 최고의 결과물을 제공합니다.",
    stats: {
        projects: 4,
        likes: 906,
        experience: "5년"
    },
    contacts: {
        email: "minsu@portfolio.com",
        phone: "010-1234-5678",
        location: "서울, 대한민국"
    },
    skills: [
        {
            name: "UI/UX Design",
            level: 5,
            icon: ""
        }
    ],
    socials: [
        { platform: "github", url: "https://github.com/sabin1108" }
    ]
};
