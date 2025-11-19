import { Movie, MovieFilterOptions } from "@/types";

 export function searchApply(data:Movie[] , query:MovieFilterOptions) {
       let result = data

       if(query.q){
         const qFields = query.q.toLowerCase().replace(/\s+/g, '')
         result = result.filter(movie => {
           const titleSearch = movie.title.toLowerCase().replace(/\s+/g, '')
           const descSearch = movie.description.toLowerCase().replace(/\s+/g, '')

           return titleSearch.includes(qFields) || descSearch.includes(qFields)
         })
       }
       return result
 }