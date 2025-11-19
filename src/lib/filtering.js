"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFilter = applyFilter;
function applyFilter(data, query) {
    // movies?genre=Action&year=2010&minRating=7
    var result = data;
    if (query.genres && query.genres.length > 0) {
        result = result.filter(function (movie) {
            return movie.genres.some(function (g) { var _a; return (_a = query.genres) === null || _a === void 0 ? void 0 : _a.map(function (gs) { return gs.toLowerCase(); }).includes(g.toLowerCase()); });
        });
    }
    if (typeof query.year === 'string') {
        var year_1 = Number(query.year);
        if (!isNaN(year_1)) {
            result = result.filter(function (movie) { return movie.year === year_1; });
        }
    }
    if (typeof query.director === 'string') {
        var directors_1 = query.director.toLowerCase();
        result = result.filter(function (movie) { return movie.director.toLowerCase().includes(directors_1); });
    }
    if (query.minRating !== 0) {
        var minRating_1 = Number(query.minRating);
        if (!isNaN(minRating_1)) {
            result = result.filter(function (movie) { return movie.rating >= minRating_1; });
        }
    }
    if (query.maxRating !== 0) {
        var maxRating_1 = Number(query.maxRating);
        if (!isNaN(maxRating_1)) {
            result = result.filter(function (movie) { return movie.rating <= maxRating_1; });
        }
    }
    return result;
}
