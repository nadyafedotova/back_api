'use strict';

const countObjects = 25;
const likeValues = {
    MIN: 15,
    MAX: 200,
};
const avatarValues = {
    MIN: 1,
    MAX: 6,
};
const commentId = {
    MIN: 1,
    MAX: 100,
};
const countComments = {
    MIN: 0,
    MAX: 20,
};

const descriptions = [
    'Вогонь',
    'Гарне',
    'Чудово',
    'Ну таке',
    'Видали',
];

const message = [
    'Все відмінно!',
    'Загалом все непогано. Але не всі.',
    'Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.',
    'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.',
    'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.',
    'Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?',
];

const names = [
    'Богдан',
    'Олександра',
    'Тетяна',
    'Катерина',
    'Володимир',
];

const generateCommentId = createRandomGenerator(commentId.MIN, commentId.MAX);

function getRandomNumber (min, max) {
    let minValue = Math.ceil(min);
    let maxValue = Math.floor(max);
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

function getRandomElement (arr) {
    return arr[getRandomNumber(0, arr.length - 1)];
}

function getOffer (index) {
    const id = index + 1;
    return {
        id:id,
        url:`photos/${id}.jpg`,
        description:getRandomElement(descriptions),
        likes:getRandomNumber(likeValues.MIN, likeValues.MAX),
        comments:Array.from({ length:getRandomNumber(countComments.MIN, countComments.MAX) }, commentsContent),
    }
}

function commentsContent () {
    return {
        id:generateCommentId(),
        avatar:`img/avatar-${getRandomNumber(avatarValues.MIN, avatarValues.MAX)}.svg`,
        message:getRandomElement(message),
        name:getRandomElement(names),
    };
}

function createRandomGenerator (min, max) {
    const prevValues = [];

    return () => {
        let currentValue = getRandomNumber(min, max);
        if (prevValues.length >= (max - min + 1)) {
            return null;
        }
        while (prevValues.includes(currentValue)) {
            currentValue = getRandomNumber(min, max);
        }
        prevValues.push(currentValue);
        return currentValue;
    };
}

function createPhoto (index) {
    const id = index + 1;
    return {
        id:id,
        title:`Photo ${id}`,
        url:`photos/${id}.jpg`,
    }
}

const data = new Array(countObjects).fill(countObjects).map((e, index) => getOffer(index));
const photo = new Array(countObjects).fill(countObjects).map((_, index) => createPhoto(index));
const comments = new Array(commentId.MAX).fill(null).map((_, index) => commentsContent());
photo.forEach((e) => e.comments = Array.from({ length:getRandomNumber(countComments.MIN, countComments.MAX) }, commentsContent));

const dataJson = { photo, comments, data}

export { dataJson }