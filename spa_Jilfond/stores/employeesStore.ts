import { calculateMatchPercentage } from '~/composables/modules';
import { sendRequest } from '../server/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { EmployeeProfile } from '~/types/types';

export const employeesStore = defineStore('myStore', () => {
    const employeesStorage: Ref<EmployeeProfile[]> = ref([]);
    const searchList: Ref<string[]> = ref([]);

    const setData = (response: EmployeeProfile[]): void => {
        employeesStorage.value = response;
    };

    const fetchEmployeesList = async (): Promise<void> => {
        const response = await sendRequest();
        if (response) {
            setData(response);
        }
    };

    const getEmployeesStorage = async (): Promise<EmployeeProfile[]> => {
        return employeesStorage.value;
    };

    const searchEmployeeById = (id: number): EmployeeProfile[] => {
        return employeesStorage.value.filter(employee => employee.id === id);
    };

    const searchEmployeeByName = (name: string): EmployeeProfile[] => {
        return employeesStorage.value.filter(employee => calculateMatchPercentage(employee.name, name));
    };

    const searchEmployee = (searchString: string): EmployeeProfile[] | null => {
        searchList.value = searchString.split(",").map(item => item.trim());
        const employeesFound: EmployeeProfile[] = [];

        searchList.value.forEach((element) => {
            if (Number(element)) {
                employeesFound.push(...searchEmployeeById(Number(element)));
            } else {
                employeesFound.push(...searchEmployeeByName(element));
            }
        });

        const uniqueEmployees = Array.from(new Set(employeesFound.map(emp => emp.id)))
            .map(id => employeesFound.find(emp => emp.id === id) as EmployeeProfile);

        return uniqueEmployees.length > 0 ? uniqueEmployees : null;
    };

    return {
        getEmployeesStorage,
        fetchEmployeesList,
        setData,
        searchEmployee
    };
});
