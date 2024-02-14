import getPeople from '@/services/api.service.js'
import { ref } from 'vue'
const peoples = ref([])

export default function useApi() {
    
    async function fetchPeople() {
        try {
            const response = await getPeople();
            peoples.value.push(response)
        } catch (error) {
            console.error('Erreur lors de la récupération des peoples:', error)
        }
    }
    return {
        fetchPeople,
        peoples
    }
}
