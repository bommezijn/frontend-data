# MODULES

Exported in these modules are the functions or helper functions that have been used to sanitize the current dataset.

## Usage

import the required functions and use as required.
```JS
  import {numberToGender, createPath, roundNumber} from './modules/helpers.js'
```

## helpers.js
Module specified for helper functions to sanitize data. Specifically created for the dataset from [themoviedb](https://www.themoviedb.org/documentation/api).

## data.js

Functions created with the help of [helpers.js](./modules/../helpers.js) and [d3.js](https://d3js.org/). Creates a function `dataset` with in it the JSON data from the API themoviedb.

Function `sanitizeData()` retrieves data from function `dataset()` and sanitizes to my specification.

```JSON
//themoviedb returns the following JSON
{
    "page": 1,
    "results": [
        {
            "adult": false,
            "gender": 2,
            "id": 10859,
            "known_for": [
                {
                    "adult": false,
                    "backdrop_path": "/n28I7FNYIT934OoHhKZn4IIDsrQ.jpg",
                    "genre_ids": [
                        28,
                        12,
                        35
                    ],
                    "id": 293660,
                    "media_type": "movie",
                    "original_language": "en",
                    "original_title": "Deadpool",
                    "overview": "Deadpool tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.",
                    "poster_path": "/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg",
                    "release_date": "2016-02-09",
                    "title": "Deadpool",
                    "video": false,
                    "vote_average": 7.6,
                    "vote_count": 25767
                },
                {
                    "adult": false,
                    "backdrop_path": "/3P52oz9HPQWxcwHOwxtyrVV1LKi.jpg",
                    "genre_ids": [
                        28,
                        35,
                        12
                    ],
                    "id": 383498,
                    "media_type": "movie",
                    "original_language": "en",
                    "original_title": "Deadpool 2",
                    "overview": "Wisecracking mercenary Deadpool battles the evil and powerful Cable and other bad guys to save a boy's life.",
                    "poster_path": "/to0spRl1CMDvyUbOnbb4fTk3VAd.jpg",
                    "release_date": "2018-05-10",
                    "title": "Deadpool 2",
                    "video": false,
                    "vote_average": 7.5,
                    "vote_count": 13925
                },
                {
                    "adult": false,
                    "backdrop_path": "/nEcEy7iVOh04dzZWP2e6AcwpLvI.jpg",
                    "genre_ids": [
                        35,
                        14
                    ],
                    "id": 72105,
                    "media_type": "movie",
                    "original_language": "en",
                    "original_title": "Ted",
                    "overview": "John Bennett, a man whose childhood wish of bringing his teddy bear to life came true, now must decide between keeping the relationship with the bear or his girlfriend, Lori.",
                    "poster_path": "/2ZetTSYM8ATcrxh4Otge99GJRTz.jpg",
                    "release_date": "2012-06-29",
                    "title": "Ted",
                    "video": false,
                    "vote_average": 6.4,
                    "vote_count": 10165
                }
            ],
            "known_for_department": "Acting",
            "name": "Ryan Reynolds",
            "popularity": 75.994,
            "profile_path": "/4SYTH5FdB0dAORV98Nwg3llgVnY.jpg"
        },
        //....... many more
    ],
    "total_pages": 500,
    "total_results": 10000
}
```
```JSON
//sanitizeData() transform the monstrosity to the following
[
    {
        "name": "Ryan Reynolds",
        "rating": 76,
        "gender": "Male",
        "photo": "https://image.tmdb.org/t/p/w500//4SYTH5FdB0dAORV98Nwg3llgVnY.jpg"
    },
    //... and more
]
```