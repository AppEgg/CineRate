import { applyFilter } from './filtering';
import { Movie, MovieFilterOptions } from '@/types';
import fs from 'fs';
import { searchApply } from './search';

// JSON-u oxu
const rawData = fs.readFileSync('../../data/movies.json', 'utf-8');
const movies: Movie[] = JSON.parse(rawData);

const result1 = searchApply(movies, { q: "MovieB" });
console.log("Test 1 result:", result1);

// 2. Test 2: təsadüfi söz, tapılmamalıdır
const result2 = searchApply(movies, { q: "movie a" });
console.log("Test 2 result:", result2);

// 3. Test 3: kiçik hərflərlə axtarış (case insensitive)
const result3 = searchApply(movies, { q: "james cameron" });
console.log("Test 3 result:", result3);
