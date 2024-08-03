export interface Book {
    id: number,
    title: string,
    author: string,
    cover_image: string,
    description: string,
    genre: string[],
    publication_year: number
}

export interface Pagination {
    totalPage: number,
    currentPage: number,
    list: Book[][],
    coverBookList: string[][]
}