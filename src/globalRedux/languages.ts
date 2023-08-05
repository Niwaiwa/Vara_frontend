const enText: { [key: string]: string } = {
    title: 'Title',
    description: 'Description',
    rating: 'Rating',
    ratingAll: 'All',
    ratingG: 'General',
    ratingE: 'Ecchi',
    themeMode: 'Theme',
    themeModeLight: 'Light',
    themeModeDark: 'Dark',
    locale: 'Locale',
    localeEn: 'English',
    localeJp: 'Japanese',
}

const jpText: { [key: string]: string } = {
    title: 'タイトル',
    description: '説明',
    rating: 'レーティング',
    ratingAll: '全て',
    ratingG: '一般',
    ratingE: 'エッチ',
    themeMode: 'テーマ',
    themeModeLight: 'ライト',
    themeModeDark: 'ダーク',
    locale: 'ロケール',
    localeEn: '英語',
    localeJp: '日本語',
}

export const getText = (locale: string, text: string): string => {
    if (locale === 'en-US') {
        return enText[text]
    } else if (locale === 'ja-JP') {
        return jpText[text]
    } else {
        return enText[text]
    }
}