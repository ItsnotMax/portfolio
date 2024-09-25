import { ARTICLES_PER_PAGE } from '../config';
import { sendRequest } from '../server/api';
import { defineStore } from 'pinia';

interface Article {
    id: number;
    title: string;
    content: string;
}

interface ArticlesArrayStorage {
    articlesList: Article[];
    totalArticles: number;
}

export const articlesStore = defineStore('myStore', () => {
    const articlesArrayStorage = ref < ArticlesArrayStorage > ({
        articlesList: [],
        totalArticles: 0
    });

    const fetchArticles = async (): Promise<void> => {
        const response = await sendRequest() as Article[];
        setData(response);
    };

    const checkStoreIsEmpty = (): boolean => {
        return articlesArrayStorage.value.articlesList.length === 0;
    };

    if (checkStoreIsEmpty()) {
        fetchArticles();
    }

    const setData = (response: Article[]): void => {
        articlesArrayStorage.value.articlesList = response;
        articlesArrayStorage.value.totalArticles = response.length;
    };

    const getArticlesArrayPerPage = (currentPage: number): Article[] => {
        const start = ARTICLES_PER_PAGE * (currentPage - 1);
        const end = ARTICLES_PER_PAGE * currentPage;
        return articlesArrayStorage.value.articlesList.slice(start, end);
    };

    const getArticlesLength = (): number => {
        return articlesArrayStorage.value.totalArticles;
    };

    return {
        setData,
        getArticlesArrayPerPage,
        getArticlesLength,
        checkStoreIsEmpty
    };
});
