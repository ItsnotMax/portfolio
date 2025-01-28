import { defineStore } from "pinia";
import { ref } from "vue";

export const useDBStore = defineStore("db", () => {
	const db = ref(null);
	const objectStore = "books";

	const initDB = () => {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open("UserBooksDB", 1);

			request.onupgradeneeded = (event) => {
				const dbInstance = event.target.result;
				if (!dbInstance.objectStoreNames.contains(`${objectStore}`)) {
					dbInstance.createObjectStore(`${objectStore}`, {
						autoIncrement: true,
					});
				}
			};

			request.onsuccess = () => {
				db.value = request.result;
				resolve();
			};
			request.onerror = () => reject(request.error);
		});
	};
	async function addBook(formBook) {
		const book = Object.assign({}, formBook);
		return new Promise((resolve, reject) => {
			const transaction = db.value.transaction(
				`${objectStore}`,
				"readwrite",
			);
			const store = transaction.objectStore(`${objectStore}`);
			const request = store.add(book);

			request.onsuccess = () =>
				resolve(`Книга "${book.title}" добавлена!`);
			request.onerror = () => reject(request.error);
		});
	}
	async function getAllBooks() {
		return new Promise((resolve, reject) => {
			const transaction = db.value.transaction(
				`${objectStore}`,
				"readonly",
			);
			const store = transaction.objectStore(`${objectStore}`);
			const books = [];
			const request = store.openCursor();

			request.onsuccess = (event) => {
				const cursor = event.target.result;
				if (cursor) {
					cursor.value["key"] = cursor.key;
					books.push(cursor.value);
					cursor.continue();
				} else {
					resolve(books);
				}
			};

			request.onerror = () => reject(request.error);
		});
	}
	async function deleteBook(key) {
		return new Promise((resolve, reject) => {
			const transaction = db.value.transaction(
				`${objectStore}`,
				"readwrite",
			);
			const store = transaction.objectStore(`${objectStore}`);
			const request = store.delete(key);

			request.onsuccess = () => resolve(`Книга с ключом ${key} удалена!`);
			request.onerror = () => reject(request.error);
		});
	}
	async function updateBook(key, updatedBook) {
		return new Promise((resolve, reject) => {
			const transaction = db.value.transaction(
				`${objectStore}`,
				"readwrite",
			);
			const store = transaction.objectStore(`${objectStore}`);
			const request = store.get(key);

			request.onsuccess = () => {
				const book = request.result;
				if (book) {
					Object.assign(book, updatedBook);
					const updateRequest = store.put(book, key);
					updateRequest.onsuccess = () =>
						resolve(`Книга с ключом ${key} обновлена!`);
					updateRequest.onerror = () => reject(updateRequest.error);
				} else {
					reject(new Error(`Книга с ключом ${key} не найдена`));
				}
			};

			request.onerror = () => reject(request.error);
		});
	}

	return {
		initDB,
		getAllBooks,
		addBook,
		deleteBook,
		updateBook,
	};
});
