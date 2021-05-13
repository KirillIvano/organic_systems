const fetch = require('node-fetch');

const fetchWorkshopsPreviews = () =>
    fetch('http://80.78.246.194:8000/workshops', {method: 'GET'})
        .then(r => r.json())
        .then(r => r.data.workshops);

const fetchWorkshop = (workshopId) =>
    fetch(`http://80.78.246.194:8000/workshop/${workshopId}`, {method: 'GET'})
        .then(r => r.json())
        .then(r => r.data);

const clientifyImage = img =>
    `http://80.78.246.194/${img}`;

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

    return workshops.map(clientifyWorkshop);
};

module.exports = getWorkshops;
