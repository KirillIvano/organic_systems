const fetch = require('node-fetch');

const fetchWorkshopsPreviews = () =>
    fetch('https://api.organiccolorsystems.ru/workshops', {method: 'GET'})
        .then(r => r.json())
        .then(r => r.data.workshops);

const fetchWorkshop = (workshopId) =>
    fetch(`https://api.organiccolorsystems.ru/workshop/${workshopId}`, {method: 'GET'})
        .then(r => r.json())
        .then(r => r.data);

const clientifyImage = img =>
    `https://organiccolorsystems.ru/${img}`;

const clientifyTutor = tutor => ({
    ...tutor,
    image: clientifyImage(tutor.image),
});

const clientifyWorkshop = workshop => ({
    ...workshop,
    bannerImage: clientifyImage(workshop.bannerImage),
    tutors: workshop.tutors.map(clientifyTutor),
});

const getWorkshops = async () => {
    const workshopsPreviews = await fetchWorkshopsPreviews();
    const workshops = await Promise.all(workshopsPreviews.map(({id}) => fetchWorkshop(id)));

    console.log(workshops);

    return workshops.map(clientifyWorkshop);
};

module.exports = getWorkshops;
