import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useGlobalStore = defineStore('global', () => {
    const userPermissions = ref([])
    let currentTheme = ref('light')

    const formatNumber = (number) => {
        if(number === null || number === undefined) {
            return 0
        }
        const numberStr = number.toString();
        return numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return {userPermissions, currentTheme, formatNumber}
})
