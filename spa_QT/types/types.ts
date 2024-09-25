export interface Article {
    id: string
    title: string;
    description: string
    preview: string;
    image: string
}

export interface UseAsyncDataResult<T> {
    data: Ref<T | null>;
    error: Ref<Error | null>;
    pending: Ref<boolean>;
}

export type GsapAnimationEvent = Event & { currentTarget: HTMLElement }

export interface RouteParams {
    id: string;
}

export interface ArticleStore {
    getArticlesArrayPerPage: (page: number) => Array<any>;
    getArticlesLength: () => number;
}

export type Language = 'en' | 'ru'

export interface ChoosenLanguage {
    current: Language;
    last: Language | null;
}
export type CloseModalWindowEvent = MouseEvent

export interface Props {
    totalArticles: number;
    currentPage: number;
}

export interface Config {
    totalArticles: number;
    pagesPerPagination: number;
    articlesPerPage: number;
    totalPages: number;
    paginationArray: number[];
    currentPage: number;
}
