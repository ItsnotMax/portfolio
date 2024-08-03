export function switchPlaceholder(contactType: string, type: number): string {
    const dataType_1 = {
        tel: '+71234567890',
        adttel: '+71234567890',
        email: '@mail.ru',
        vk: 'vk.com/id123456',
        facebook: 'facebook.com/id123456'
    };
    const dataType_2 = {
        tel: '+7',
        adttel: '+7',
        email: '@mail.ru',
        vk: 'vk.com/',
        facebook: 'facebook.com/'
    };
    if (contactType in dataType_1 || contactType in dataType_2) {
        if (type === 1) {
            return dataType_1[contactType as keyof typeof dataType_1]
        } else if (type === 2) {
            return dataType_2[contactType as keyof typeof dataType_2]
        }
    }
    return 'Что-то пошло не так'
}